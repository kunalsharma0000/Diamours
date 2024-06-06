from django.urls import path
from core.views import OrderList, CreateOrder, ProductDetail
from core.views import (
    ProductList,
    PhonePePaymentView,
    VerifyPaymentView,
    TrackingView,
    CouponView,
    ProductListOptimised,
    ProductDetailOptimised,
)

urlpatterns = [
    path("productsUnOp", ProductList, name="ProductList"),
    path("products", ProductListOptimised, name="ProductList"),
    path("productUnOp/<slug:slug>", ProductDetail, name="ProductDetail"),
    path("product/<slug:slug>", ProductDetailOptimised, name="ProductDetail"),
    path("orders", OrderList, name="OrderList"),
    path("order/create", CreateOrder, name="OrderCreate"),
    path("track/<str:tracking_id>", TrackingView.as_view(), name="TrackingView"),
    path("payment/phonepe", PhonePePaymentView.as_view(), name="PhonePePaymentView"),
    path("payment/verify", VerifyPaymentView.as_view(), name="VerifyPaymentView"),
    path("coupon/<str:coupon_code>", CouponView.as_view(), name="CouponView"),
]
