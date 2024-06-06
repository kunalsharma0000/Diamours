"use client";
import React, { useState, useEffect } from "react";
import styles from "./OrderSummaryBox.module.css";
import { useRouter } from "next/navigation";
import { useCheckoutContext } from "@/context/CheckoutContext";
import { useCartContext } from "@/context/CartContext";
import axios from "axios";

const OrderSummaryBox = () => {
  const router = useRouter();
  const { step, nextStep, checkoutData, submitForm } = useCheckoutContext();
  const {
    calculateTotalCost,
    shippingCharge,
    cartItems,
    discount,
    couponCode,
    setCouponCode,
    applyCoupon,
  } = useCartContext();

  const [totalCost, setTotalCost] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const fetchTotalCost = async () => {
      const cost = await calculateTotalCost();
      setTotalCost(cost);
    };

    const fetchCouponDiscount = async () => {
      const discount = await applyCoupon(couponCode);
      setCouponDiscount(discount);
    };
    if (couponCode) {
      fetchTotalCost();
      fetchCouponDiscount();
    } else {
      const total = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setTotalCost(total);
    }
  }, [couponCode]);

  const checkForAllFields = () => {
    for (const key in checkoutData) {
      if (key !== "paymentMethod" && checkoutData[key].trim() === "") {
        alert("Please fill all the fields!");
        return;
      }
    }

    nextStep();
  };

  const phonepayFunction = async () => {
    const productIds = cartItems.map((item) => item.product.id);

    // Create the 'items' array based on the 'cartItems'
    const items = cartItems.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));

    // customer data
    const customerData = { ...checkoutData };
    delete customerData.paymentMethod;
    customerData.phone_number = customerData.phone;
    delete customerData.phone;

    const requestData = {
      product_ids: productIds,
      items,
      customer: customerData,
    };

    if (couponCode) {
      requestData.coupon_code = couponCode;
    }

    try {
      const response = await axios.post(
        "https://diamour-backend-7mz7m.ondigitalocean.app/core/payment/phonepe",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        console.log("PhonePe payment successful:", response.data);
        window.location.href = response.data.payment_url;
        // nextStep()
      }
    } catch (error) {
      console.error("PhonePe payment error:", error);
    }
  };

  const checkForPaymentMethod = () => {
    for (const key in checkoutData) {
      if (key === "paymentMethod" && checkoutData[key].trim() === "") {
        alert("Please Select a payment method!");
        return;
      }
    }

    phonepayFunction();
  };

  const [tempCode, setTempCode] = useState(couponCode);
  const handleCoupon = () => {
    setCouponCode(tempCode);
  };

  return (
    <div className={styles.orderSummaryBox}>
      <div className={styles.cwrPrice}>
        <div className={styles.cwrpWrap}>
          <div className={styles.cwrpwLeft}>Subtotal</div>
          <div className={styles.cwrpwRight}>₹ {totalCost}.00</div>
        </div>
        <div className={styles.cwrpWrap}>
          <div className={styles.cwrpwLeft}>Discount</div>
          <div className={styles.cwrpwRight}>
            ₹ {couponDiscount.discount}.00
          </div>
        </div>
      </div>
      <div className={styles.cwrCoupon}>
        <input
          type="text"
          placeholder="Coupon Code"
          value={tempCode}
          onChange={(e) => setTempCode(e.target.value)}
        />
        <div className={styles.cwrcBtn} onClick={handleCoupon}>
          Apply Coupon
        </div>
      </div>
      <div className={styles.cwrLine}></div>
      <div className={styles.cwrOffer}>
        <div className={styles.cwroStatus}>
          <div className={styles.cwroStatusWrap}></div>
        </div>

        <div className={styles.cwroText}>
          <div className={styles.cwrotTop}>
            Get Free{" "}
            <span style={{ color: "#1A1E26", fontWeight: "900" }}>
              Shipping
            </span>{" "}
            for orders over{" "}
            <span style={{ color: "#EB2606", fontWeight: "900" }}>
              ₹1,00,000.00
            </span>
          </div>
          <div className={styles.cwrotBottom}>Continue Shopping</div>
        </div>
      </div>
      {step === 1 && (
        <div className={styles.cwrBtn} onClick={() => checkForAllFields()}>
          Continue to Payment
        </div>
      )}
      {step === 2 && (
        <div className={styles.cwrBtn} onClick={() => checkForPaymentMethod()}>
          Buy Now!
        </div>
      )}
      <div className={styles.cwrLine}></div>
    </div>
  );
};

export default OrderSummaryBox;
