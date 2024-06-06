from django.db import models
from django.contrib.auth.models import User


class Carousel(models.Model):
    heading = models.CharField(max_length=100)
    content = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    image = models.ImageField(upload_to="carousel_images")

    def __str__(self):
        return self.heading


class Team(models.Model):
    image = models.ImageField(upload_to="team_images")
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    category_name = models.CharField(max_length=255)
    # description = models.TextField(max_length=500)
    # image = models.ImageField(
    #     upload_to="category_images"
    # )  # Added image field for category

    class Meta:
        verbose_name = "Category"

    def __str__(self):
        return self.category_name


class Collection(models.Model):
    collection_name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Collection"

    def __str__(self):
        return self.collection_name


class Product(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=600)
    slug = models.SlugField(unique=True, null=True, max_length=255)
    description = models.TextField(max_length=2000)
    net_weight = models.FloatField(blank=True, null=True)
    diamond_color_stone_weight = models.FloatField(blank=True, null=True)
    total_weight = models.FloatField(blank=True, null=True)
    gold_purity = models.CharField(max_length=100, blank=True, null=True)
    diamond_clarity = models.CharField(max_length=100, blank=True, null=True)
    diamond_color = models.CharField(max_length=100, blank=True, null=True)
    main_image = models.ImageField(upload_to="uploads/product_images", blank=True)
    price = models.FloatField()
    size = models.CharField(max_length=100)

    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    collection = models.ForeignKey(
        Collection, on_delete=models.PROTECT, blank=True, null=True
    )
    stock_left = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order_inpage = models.IntegerField(default=0)

    def __str__(self):
        return self.title[:50] + "... INR " + str(self.price)


class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
    )
    color = models.CharField(max_length=50)

    def __str__(self):
        return self.product.title + "-" + self.color


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="prod_images"
    )
    product_variant = models.ForeignKey(
        ProductVariant, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="uploads/product_images")


class ProductVideo(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="videos"
    )
    video = models.FileField(upload_to="videos/")
    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="videos",
        null=True,
        blank=True,
    )


ORDER_STATUS_CHOICES = (
    ("Payment Left", "Payment Left"),
    ("Order Place", "Order Place"),
    ("Order recieved", "Order recieved"),
    ("Making", "Making"),
    ("Pickup", "Pickup"),
    ("Dispatched", "Dispatched"),
    ("Out for Delivery", "Out for Delivery"),
    ("Delivered", "Delivered"),
)
PAYMENT_METHOD_CHOICES = (("Online", "Online"), ("COD", "COD"))


class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.FloatField()
    discount_type = models.CharField(
        max_length=50,
        choices=(("percent", "Percent"), ("amount", "Amount")),
        default="percent",
    )
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code


class Customer(models.Model):
    name = models.CharField(max_length=200, default="abcd")
    email = models.EmailField(max_length=200, unique=True, default="abcd@efg.com")
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=500)

    def __str__(self):
        return self.name + "-" + self.email


class Order(models.Model):
    order_status = models.CharField(max_length=200, choices=ORDER_STATUS_CHOICES)
    payment_method = models.CharField(max_length=200, choices=PAYMENT_METHOD_CHOICES)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    order_value = models.IntegerField(default=0)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    payment_id = models.CharField(
        max_length=200, blank=True, null=True
    )  # Added payment_id field for PhonePe integration
    estimated_delivery_date = models.DateTimeField(null=True, blank=True)
    tracking_id = models.CharField(max_length=200, blank=True, null=True)

    @property
    def total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_product_price()
        if self.coupon:
            if self.coupon.discount_type == "percent":
                total = total * (1 - self.coupon.discount / 100)
            elif self.coupon.discount_type == "amount":
                total = total - self.coupon.discount
        return total

    def __str__(self):
        customer_email = self.customer.email if self.customer else "Unknown"
        return (
            customer_email
            + " | Rs. "
            + str(self.order_value)
            + " | "
            + str(self.created_at.strftime("%d %B %Y"))
        )


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def get_total_product_price(self):
        return self.quantity * self.product.price
