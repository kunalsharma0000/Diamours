from django.contrib import admin
from .models import (
    Carousel,
    Team,
    Product,
    ProductImage,
    Order,
    OrderItem,
    Category,
    Collection,
    ProductVariant,
    Customer,
    ProductVideo,
    Coupon,
)


class ProductVariantInline(
    admin.TabularInline
):  # Use TabularInline or StackedInline as per your preference
    model = ProductVariant
    extra = 3  # Number of blank forms to display for adding variants


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3


class ProductVideoInline(admin.TabularInline):
    model = ProductVideo
    extra = 3


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductVariantInline,
        ProductImageInline,
        ProductVideoInline,
    ]  # Include the ProductVariantInline and ProductImageInline here


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 3


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


admin.site.register(Carousel)
admin.site.register(Team)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Coupon)
admin.site.register(Collection)
