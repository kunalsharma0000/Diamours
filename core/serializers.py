from rest_framework import serializers
from .models import (
    Product,
    ProductImage,
    Order,
    OrderItem,
    Category,
    ProductVariant,
    Customer,
    ProductVideo,
    Collection,
    Coupon,
)
from django.contrib.auth.models import User
from django.db.models import Prefetch


class ProductListSerializer(serializers.ModelSerializer):
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "title", "price", "main_image", "slug")

    def get_main_image(self, obj):
        if obj.main_image and hasattr(obj.main_image, "url"):
            return obj.main_image.url
        return None


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(method_name="get_variant_images")

    def get_variant_images(self, obj):
        # Retrieve and serialize the images for the current variant
        return [image.image.url for image in obj.images.all()]

    class Meta:
        model = ProductVariant
        fields = "__all__"


class ProductVideoSerializer(serializers.ModelSerializer):
    color = serializers.SerializerMethodField(method_name="get_color")

    def get_color(self, obj):
        return obj.product_variant.color

    class Meta:
        model = ProductVideo
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    image_list = serializers.SerializerMethodField(method_name="get_image_list")
    category = CategorySerializer()
    videos = serializers.SerializerMethodField(method_name="get_videos")
    collection = CollectionSerializer()

    # Use CategorySerializer directly here
    def get_videos(self, obj):
        return ProductVideoSerializer(obj.videos.all(), many=True).data

    def get_image_list(self, obj):
        return ProductImageSerializer(obj.prod_images.all(), many=True).data

    def get_variants(self, obj):
        # Filter and retrieve product variants for the current product
        return ProductVariantSerializer(obj.variants.all(), many=True).data

    class Meta:
        model = Product
        fields = "__all__"

    # Include the 'variants' field using the 'get_variants' method
    variants = serializers.SerializerMethodField(method_name="get_variants")


class ProductIndividualSerializer(serializers.ModelSerializer):
    # Directly use nested serializers with 'many=True'
    image_list = ProductImageSerializer(source="prod_images", many=True, read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product.id")

    class Meta:
        model = OrderItem
        fields = ("product_id", "quantity")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    # customer_id = serializers.IntegerField(source="customer_id")

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        total_value = 0
        for item in validated_data["items"]:
            product = Product.objects.get(id=item["product"]["id"])
            total_value += product.price * item["quantity"]

        # Create order with the calculated total value
        order_instance = Order.objects.create(
            order_status=validated_data["order_status"],
            payment_method=validated_data["payment_method"],
            customer=validated_data["customer"],
            order_value=total_value,
        )

        # Create order items
        for item in validated_data["items"]:
            product = Product.objects.get(id=item["product"]["id"])
            OrderItem.objects.create(
                order=order_instance,
                product=product,
                quantity=item["quantity"],
            )
        return order_instance
