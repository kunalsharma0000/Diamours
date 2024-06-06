import requests
import json

from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Order, OrderItem


@receiver(post_save, sender=Order)
def create_shipment_and_send_email(sender, instance, **kwargs):
    if instance.order_status == "placed":
        url = "https://sequel247api.com/api/shipment/create"
        headers = {"Content-Type": "application/json", "token": "YOUR_TOKEN_HERE"}
        shipment_data = {
            "location": "domestic",
            "shipmentType": "D&J",
            "serviceType": "valuable",
            "fromStoreCode": "YOUR_STORE_CODE_HERE",
            "toAddress": {
                "consignee_name": instance.customer.name,
                "address_line1": instance.customer.address,
                "pinCode": instance.customer.pincode,
                "auth_receiver_name": instance.customer.name,
                "auth_receiver_phone": instance.customer.phone,
            },
            "net_weight": 200,
            "net_value": instance.order_value,
            "no_of_packages": 1,
        }
        response = requests.post(url, headers=headers, data=json.dumps(shipment_data))
        if response.status_code == 200:
            tracking_no = response.json().get("tracking_no")
            email_content = f"""
            <h2>Your Order has been placed</h2>
            <p>Dear {instance.user.name},</p>
            <p>Your order with id {instance.id} has been successfully placed. Your tracking number is {tracking_no}.</p>
            <p>Order Summary:</p>
            <ul>
            """
            order_items = OrderItem.objects.filter(order=instance)
            products = [
                {
                    "name": item.product.name,
                    "quantity": item.quantity,
                    "price": item.product.price,
                }
                for item in order_items
            ]
            for product in products:
                email_content += f"<li>{product['name']} (Quantity: {product['quantity']}, Price: {product['price']})</li>"
            email_content += """
            </ul>
            <p>Thank you for shopping with us.</p>
            """
            email = EmailMessage(
                "Your order has been placed", email_content, to=[instance.user.email]
            )
            email.send()
