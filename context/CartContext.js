// CartContext.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CART_STORAGE_KEY = "cartItems";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(50);
  // Load cart data from local storage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    setCartItems(savedCart);
  }, []);

  // Save cart data to local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity, selectedColor, selectedSize) => {
    const existingItem = cartItems.find(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingItem) {
      // if item already in cart, give a popup
      alert("Item already in cart!");
    } else {
      // Product is not in the cart, add it
      setCartItems([
        ...cartItems,
        { product, quantity, selectedColor, selectedSize },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId, selectedColor, selectedSize) => {
    const updatedCartItems = cartItems.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        )
    );
    setCartItems(updatedCartItems);
  };

  // increase product quantity
  const increaseQuantity = (productId, selectedColor, selectedSize) => {
    const updatedCartItems = cartItems.map((item) => {
      if (
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize == selectedSize
      ) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  // decrease product quantity
  const decreaseQuantity = (productId, selectedColor, selectedSize) => {
    const updatedCartItems = cartItems.map((item) => {
      if (
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      ) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const applyCoupon = async (code) => {
    console.log(code);
    try {
      const response = await fetch(
        `https://diamour-backend-7mz7m.ondigitalocean.app/core/coupon/${code}`
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        alert("Invalid coupon code!");
        setCouponCode("");
        return 0; // No discount if the coupon code is not valid.
      }
    } catch (error) {
      console.log("Error fetching coupon:", error);
      alert("An error occurred while applying the coupon.");
      return 0; // No discount if an error occurs while fetching the coupon.
    }
  };

  const calculateTotalCost = async () => {
    const coupon = await applyCoupon(couponCode);
    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    let discountAmount = 0;
    if (coupon.discount_type === "amount") {
      discountAmount = coupon.discount;
    } else {
      discountAmount = (subtotal * coupon.discount) / 100;
    }

    setDiscount(discountAmount);

    const finalTotal = subtotal - discountAmount;

    if (finalTotal > 100000) {
      setShippingCharge(0);
      return finalTotal - 50;
    }
    return finalTotal;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotalCost,
        shippingCharge,
        discount,
        couponCode,
        setCouponCode,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
