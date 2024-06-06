"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import CartCard from "@/components/CartCard/CartCard";
import OrderSummaryBox from "@/components/OrderSummaryBox/OrderSummaryBox";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";

const page = () => {
  const {
    calculateTotalCost,
    shippingCharge,
    cartItems,
    discount,
    couponCode,
    setCouponCode,
    applyCoupon,
  } = useCartContext();

  const [tempCode, setTempCode] = useState(couponCode);
  const [totalCost, setTotalCost] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const fetchTotalCost = async () => {
      const cost = await calculateTotalCost();
      setTotalCost(cost);
    };

    const fetchCouponDiscount = async () => {
      const discount = await applyCoupon(tempCode);
      setCouponDiscount(discount);
    };

    if (tempCode) {
      fetchTotalCost();
      fetchCouponDiscount();
    } else {
      const total = cartItems.reduce((total, item) => {
        total + item.price * item.quantity;
      }, 0);
      setTotalCost(total);
    }
  }, [couponCode]);
  useEffect(() => {
    if (cartItems[0]) {
      const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
      setTotalCost(totalPrice);
    }
  }, [cartItems]);

  const handleCoupon = () => {
    setCouponCode(tempCode);
  };

  const router = useRouter();

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeading}>
        <div className={styles.chLeft}>Your Bag</div>
        <div className={styles.chRight}>
          <span>{cartItems.length}</span> Products
        </div>
      </div>
      <div className={styles.cartWrap}>
        <div className={styles.cwLeft}>
          {cartItems?.map((item, i) => (
            <CartCard key={i} item={item} />
          ))}
        </div>
        <div className={styles.cwRight}>
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
                name="couponCode"
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
            <div
              className={styles.cwrBtn}
              onClick={() => router.push("/checkout")}
            >
              Continue Checkout Proceed
            </div>
            <div className={styles.cwrLine}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
