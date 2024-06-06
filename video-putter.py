import os
from PIL import Image

for filename in os.listdir("public/assets/product_images"):
    if (
        filename.endswith(".jpg")
        or filename.endswith(".jpeg")
        or filename.endswith(".png")
    ):
        with Image.open(f"public/assets/product_images/{filename}") as im:
            print(f"Compressing {filename}...")
            im.save(
                f"public/assets/product_images/{filename}", optimize=True, quality=80
            )
            old_size = os.path.getsize(f"public/assets/product_images/{filename}")
            new_size = os.path.getsize(f"public/assets/product_images/{filename}")
            reduction = (old_size - new_size) / old_size * 100
            print(f"{filename} compressed. File size reduced by {reduction:.2f}%.")
