from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.serializers import (
    ProductSerializer,
    OrderSerializer,
    CustomerSerializer,
    CouponSerializer,
    ProductImage,
    ProductVideo,
    ProductVariantSerializer,
)
from django.db.models import Prefetch
from core.models import Product, Order, OrderItem
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.contrib.auth.models import User
from .models import Product, Coupon, Customer, ProductVariant
from phonepe.sdk.pg.payments.v1.payment_client import PhonePePaymentClient
from phonepe.sdk.pg.payments.v1.models.request.pg_pay_request import PgPayRequest
from phonepe.sdk.pg.payments.v1.payment_client import PhonePePaymentClient
import uuid
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage

# The following import statements are required for the PhonePe Standard PG Checkout
from phonepe.sdk.pg.env import Env
from django.conf import settings
from rest_framework.views import APIView

import os
from django.conf import settings
from django.core.mail import EmailMessage, get_connection, EmailMultiAlternatives
import requests
from django.db.models import Prefetch


def convertCurrency(amount, currency):
    rapidapi_key = "e3b36588e0msh1ab78a2e4e968e9p16f796jsn5163a02d8de8"
    url = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert"
    headers = {
        "X-RapidAPI-Key": rapidapi_key,
        "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
    }
    params = {"from": "INR", "to": currency, "amount": str(amount)}

    try:
        response = requests.get(url, headers=headers, params=params)
        data = response.json()
        return data["result"]
    except requests.exceptions.RequestException as e:
        print(e)
        # Handle error
        return None


@api_view(["GET"])
def ProductList(request):
    # Fetch all products and order them by 'order_inpage' field
    products = Product.objects.all()
    # Serialize the products
    serializer = ProductSerializer(products, many=True)
    # Return the serialized products
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def ProductListOptimised(request):
    # Fetch all products and order them by 'order_inpage' field
    products = Product.objects.all().values(
        "id", "title", "price", "main_image", "slug"
    )
    products_list = [
        {
            **product,
            "main_image": "https://diamour.blr1.digitaloceanspaces.com/media/"
            + product["main_image"]
            if product["main_image"]
            else None,
        }
        for product in products
    ]
    return Response(products_list, status=status.HTTP_200_OK)


@api_view(["GET"])
def OrderList(request):
    # Get the JWT token from the request headers
    user_jwt_token = request.headers.get("Authorization")
    # Decode the JWT token to get the user ID
    user_id = (jwt.decode(user_jwt_token, "secret", algorithms=["HS256"]))["id"]
    # Fetch the user using the user ID
    user = User.objects.get(id=user_id)
    # Fetch the orders for the user
    orders = Order.objects.filter(customer=user)
    # Serialize the orders
    serializer = OrderSerializer(orders, many=True)
    # Return the serialized orders
    return Response(serializer.data, status=status.HTTP_200_OK)


def get_user_from_jwt(request):
    # Get the JWT token from the request headers
    token = request.headers.get("Authorization")
    # Decode the JWT token to get the payload
    payload = jwt.decode(token, "secret", algorithms=["HS256"])
    # Fetch the user using the user ID from the payload
    user = User.objects.get(id=payload["id"])
    # Return the user
    return user


@api_view(["GET"])
def ProductDetail(request, slug):
    try:
        product = Product.objects.get(slug=slug)
        serialized_product = ProductSerializer(product).data
        return Response(serialized_product, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def ProductDetailOptimised(request, slug):
    try:
        # Prefetch related objects to reduce the number of queries
        product = Product.objects.prefetch_related(
            Prefetch("prod_images", queryset=ProductImage.objects.all()),
            Prefetch("videos", queryset=ProductVideo.objects.all()),
            Prefetch("variants", queryset=ProductVariant.objects.all()),
        ).get(slug=slug)
        serialized_product = ProductSerializer(product).data
        return Response(serialized_product, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


"""
Headers: Authorization: jwt_token

{
  "items": [
    {
      "product_id": 1,
      "quantity": 3
    }
  ]
}
"""


@api_view(["POST"])
def CreateOrder(request):
    # Fetch the user from the JWT token
    user = get_user_from_jwt(request)
    # Add the user ID to the request data
    request.data["customer"] = user.id
    # Set the order status to "Placed"
    request.data["order_status"] = "Placed"
    # Set the payment method to "Online"
    request.data["payment_method"] = "Online"
    # Serialize the request data
    serializer = OrderSerializer(data=request.data)
    # If the serialized data is valid
    if serializer.is_valid():
        # Save the order
        order = serializer.save()
        # Return the serialized order
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    # If the serialized data is not valid, return the errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PhonePePaymentView(APIView):
    def post(self, request):
        # Get the payment details from the request
        payment_details = request.data

        customer_data = request.data.get("customer")
        try:
            customer = Customer.objects.get(email=customer_data["email"])
        except Customer.DoesNotExist:
            serializer = CustomerSerializer(data=customer_data)
            if serializer.is_valid():
                customer = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # If the serialized data is not valid, return the errors
        # Setup PhonePe client
        merchant_id = settings.PHONEPE_MERCHANT_ID
        salt_key = settings.PHONEPE_SALT_KEY
        salt_index = int(settings.PHONEPE_SALT_INDEX)

        print(merchant_id, salt_key, salt_index)
        env = Env.PROD  # Change to Env.PROD when you go live

        phonepe_client = PhonePePaymentClient(
            merchant_id=merchant_id, salt_key=salt_key, salt_index=salt_index, env=env
        )

        # Calculate the total amount from the product_ids
        # The product_ids are used to retrieve the products and add up the price.
        product_ids = payment_details.get("product_ids", [])
        total_amount = sum(
            Product.objects.filter(id__in=product_ids).values_list("price", flat=True)
        )
        if payment_details.get("coupon_code"):
            coupon = Coupon.objects.get(code=payment_details.get("coupon_code"))
            if coupon.discount_type == "percent":
                total_amount -= total_amount * (coupon.discount / 100)
            else:
                total_amount -= coupon.discount
        mtid = "".join(e for e in str(uuid.uuid4()) if e.isalnum())[:36]
        # Create a new pay page request
        pay_page_request = PgPayRequest.pay_page_pay_request_builder(
            merchant_transaction_id=mtid,
            amount=total_amount * 100,
            merchant_user_id=customer.id,
            callback_url=settings.PHONEPE_S2S_CALLBACK_URL,
            redirect_url=settings.PHONEPE_UI_REDIRECT_URL + mtid,
        )
        print(f"mtid:{mtid} | customer_id : {customer.id}")
        # Create a new order
        order_data = {
            "order_status": "Payment Left",
            "payment_method": "Online",
            "customer": customer.id,
            # "customer_id": customer.id,
            "items": payment_details.get("items", []),
            "order_value": int(total_amount),
            "payment_id": None,
        }
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order = order_serializer.save(customer=customer)
        else:
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create a new payment
        payment = phonepe_client.pay(pay_page_request)

        # Update the order with the payment ID
        print(payment.data)
        order.payment_id = payment.data.merchant_transaction_id
        order.save()

        # Return the payment details
        # The payment details include the payment URL, which can be used to redirect the customer to the PhonePe payment page.
        return Response(
            {
                "payment_id": payment.data.merchant_transaction_id,
                "payment_url": payment.data.instrument_response.redirect_info.url,
            },
            status=201,
        )


class VerifyPaymentView(APIView):
    def post(self, request):
        """
        This view handles the verification of a payment using the PhonePe SDK.

        Sample Request:
        {
            "payment_id": "1234567890"
        }

        Sample Response:
        {
            "status": "placed"
        }
        """
        # Setup PhonePe client
        merchant_id = settings.PHONEPE_MERCHANT_ID
        salt_key = settings.PHONEPE_SALT_KEY
        print("helloooo")
        salt_index = int(settings.PHONEPE_SALT_INDEX)
        env = Env.PROD  # Change to Env.PROD when you go live
        payment_id = request.data.get("payment_id")
        print(payment_id, merchant_id, salt_index, salt_key)
        phonepe_client = PhonePePaymentClient(
            merchant_id=merchant_id, salt_key=salt_key, salt_index=salt_index, env=env
        )

        # Get the payment_id from the request

        try:
            # Verify the payment
            # The verify_payment method of the PhonePeClient takes the payment_id and verifies the payment.
            # It returns a dictionary with the payment details, including the payment status.
            print(f"Payment ID: {payment_id}")
            payment_verify = phonepe_client.check_status(
                merchant_transaction_id=payment_id
            ).code
            print(f"Payment Verify: {payment_verify}")
            if payment_verify == "SUCCESS" or payment_verify == "PAYMENT_SUCCESS":
                order = Order.objects.filter(payment_id=payment_id).first()
                order.status = "Placed"
                order.tracking_id = "".join(
                    e for e in str(uuid.uuid4()) if e.isalnum()
                )[:10]
                order.save()

                # Prepare email content
                subject = "Order Confirmed! Your Sparkle is on its Way !"
                recipient_list = [order.customer.email, "diamourweb@gmail.com"]
                from_email = "orders@mails.thediamour.com"
                # Prepare HTML table for products
                products_table = "<table style='width:100%; border: 1px solid black;'><tr><th>Product</th><th>Quantity</th><th>Price</th></tr>"
                for item in order.items.all():
                    products_table += f"<tr><td>{item.product.title}</td><td>{item.quantity}</td><td>{item.product.price}</td></tr>"
                products_table += "</table>"

                message = f"""
                <html>
                <body>
                    <p><strong>Dear {order.customer.name},</strong></p>
                    <p>Congratulations! 🎉</p>
                    <p>Your dazzling taste has been officially confirmed, and your order with The Diamour is now in motion! We can't wait for you to unwrap the magic.</p>
                    <p>Your order has been placed successfully.</p>
                    <p>Order ID: {order.id}</p>
                    <p>Tracking code: {order.payment_id}</p>
                    <p> Shipping Address: {order.customer.address}</p>
                    <p>Products:</p>
                    {products_table}
                    <p>Thank you for shopping with us.</p>
                    <p>Your order is handled with the utmost care and is adorned with love. Should you have any inquiries or need assistance, our enchanting Customer Care team is here for you at customercare@thediamour.com</p>
                    <p><strong>Stay Connected:</strong> <br>
                        Follow our social media pages https://www.instagram.com/the_diamour for a sneak peek into the world of glamour and exclusive offers! </p>
                    <p>
                    Your order is not just a purchase; it's a celebration of style and sophistication. <br> Thank you for choosing The Diamour to be a part of your exquisite journey. <br>
                    Best Regards, ✨
                    The Diamour
                    https://thediamour.com/
                    </p>
                </body>
                </html>
                """

                # Send email
                with get_connection(
                    host=settings.RESEND_SMTP_HOST,
                    port=settings.RESEND_SMTP_PORT,
                    username=settings.RESEND_SMTP_USERNAME,
                    password=os.environ["RESEND_API_KEY"],
                    use_tls=True,
                ) as connection:
                    email = EmailMessage(
                        subject=subject,
                        body=message,
                        to=recipient_list,
                        from_email=from_email,
                        connection=connection,
                    )
                    email.content_subtype = "html"
                    email.send()

                return Response({"status": "placed"}, status=200)
            return Response({"error": "Payment not successful"}, status=400)
        except Exception as e:
            # Handle any exceptions that occur during the payment verification process.
            return Response({"error": str(e)}, status=500)


class ProductView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = ProductSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrackingView(APIView):
    """
    To make a request, use the endpoint /track/<tracking_id> with a GET request.
    """

    def get(self, request, tracking_id):
        try:
            order = Order.objects.get(tracking_id=tracking_id)
            order_items = OrderItem.objects.filter(order=order)
            products = []
            for order_item in order_items:
                product = Product.objects.get(id=order_item.product.id)
                products.append(ProductSerializer(product).data)
            customer = Customer.objects.get(id=order.customer.id)
            serializer = OrderSerializer(order)
            customer_serializer = CustomerSerializer(customer)
            return Response(
                {
                    "order": serializer.data,
                    "products": products,
                    "customer": customer_serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND
            )


class CouponView(APIView):
    def get(self, request, coupon_code):
        try:
            coupon = Coupon.objects.get(code=coupon_code)
            return Response(CouponSerializer(coupon).data, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            return Response(
                {"error": "Invalid coupon"}, status=status.HTTP_400_BAD_REQUEST
            )
