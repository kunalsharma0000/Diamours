from django.apps import AppConfig
from django.db.models.signals import post_save
from django.dispatch import receiver


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        from .models import Order
        from .sequel import create_shipment_and_send_email

        # Connect the post_save signal for Order model to the create_shipment_and_send_email receiver
        # post_save.connect(create_shipment_and_send_email, sender=Order)
