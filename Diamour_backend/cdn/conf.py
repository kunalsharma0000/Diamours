import os

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_S3_ENDPOINT_URL = "https://blr1.digitaloceanspaces.com"
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": "max-age=86400",
}
AWS_LOCATION = f"https://{AWS_STORAGE_BUCKET_NAME}.blr1.digitaloceanspaces.com"

DEFAULT_FILE_STORAGE = "Diamour_backend.cdn.backends.MediaRootS3Boto3Storage"
STATICFILES_STORAGE = "Diamour_backend.cdn.backends.StaticRootS3Boto3Storage"
AWS_DEFAULT_ACL = "public-read"
AWS_S3_REGION_NAME = "blr1"
# Assuming you have already set up other AWS settings as shown previously
AWS_S3_CUSTOM_DOMAIN = "%s.%s.digitaloceanspaces.com" % (
    AWS_STORAGE_BUCKET_NAME,
    AWS_S3_REGION_NAME,
)

# This is the base URL that will be used for your media files
MEDIA_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
