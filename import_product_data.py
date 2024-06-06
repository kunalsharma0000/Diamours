import django

django.setup()

import json
from django.core.files.base import ContentFile
from django.core.files import File
from core.models import Product, ProductVariant, ProductImage, ProductVideo, Category
from django.db import models

# Load the product data from the JSON file
with open("product_data.json", "r") as f:
    product_data = json.load(f)

# Iterate over the product data and create a new Product object for each product
for product in product_data:
    print(f"Creating new Product object for {product['prodName']}")
    # Create a new Product object
    product_obj = Product()

    # Set the product fields
    product_obj.title = product["prodName"]
    product_obj.subtitle = product["prodSubName"]
    product_obj.slug = product["prodSlug"]
    product_obj.description = product["prodDesc"]
    product_obj.price = product["prodPrice"]
    product_obj.size = product["size"]
    category_name = product["prodCat"]
    category_obj, created = Category.objects.get_or_create(category_name=category_name)
    product_obj.category_id = category_obj.id

    # Save the Product object to the database
    product_obj.save()
    print(f"Product object for {product['prodName']} saved to the database")

    # Create a new ProductVariant object for each product variant
    for variant_color, variant_images in product["prodImages"].items():
        print(
            f"Creating new ProductVariant object for {product['prodName']} in {variant_color}"
        )
        product_variant_obj = ProductVariant()

        # Set the ProductVariant fields
        product_variant_obj.product = product_obj
        product_variant_obj.color = variant_color

        # Save the ProductVariant object to the database
        product_variant_obj.save()
        print(
            f"ProductVariant object for {product['prodName']} in {variant_color} saved to the database"
        )

        # Create a new ProductImage object for each product image
        for image_path in variant_images:
            if image_path.endswith(".mp4"):
                # Create a new Video object
                video_obj = ProductVideo()

                # Set the Video fields
                video_obj.product = product_obj
                video_obj.video = ContentFile(
                    open(f"https://thediamour.com/assets/videos/{image_path}", "rb"),
                    name=image_path,
                )
                product_image_obj.product_variant = product_variant_obj

                # Save the Video object to the database
                video_obj.save()
                print(
                    f"Video object for {product['prodName']} in {variant_color} with video {image_path} saved to the database"
                )
            else:
                image_url = "https://thediamour.com/assets/product_images/" + image_path

                image_file = File(open(image_url, "rb"))

                product_image_obj = ProductImage()

                # Set the ProductImage fields
                product_image_obj.product = product_obj
                product_image_obj.product_variant = product_variant_obj
                product_image_obj.image = ContentFile(
                    image_file.read(), name=image_path
                )

                # Save the ProductImage object to the database
                product_image_obj.save()
                print(
                    f"ProductImage object for {product['prodName']} in {variant_color} with image {image_path} saved to the database"
                )

    # Save the Product object to the database
    product_obj.save()
