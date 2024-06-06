"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { BiMenuAltRight, BiHeart, BiBlock, BiSolidCheckCircle,  BiSolidEditAlt } from "react-icons/bi";
import { FaDollarSign, FaEuroSign, FaPoundSign, FaRupeeSign } from "react-icons/fa";
import { useCurrencyContext } from "@/context/Currency";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";

import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { cartItems } = useCartContext();
  const [showMobile, setShowMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);
  const { currency, changeCurrency } = useCurrencyContext();

  const [Result, setResult] = useState("empty");
  const [pincode, setPincode] = useState("");

  const dispatch = useDispatch();
  const [newRate, setNewRate] = useState(1);



  const handleChangeRate = (n) => {
    console.log(n);
    console.log("newRate :", newRate)
    dispatch({
      type: n,
    });
    setNewRate(n); // Clear the input field after updating the rate
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // console.log("hellooooo2o")
      navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("helloooooo")
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=e73594855d9845e9af8321e677c0e50f`)
          .then(response => {
            console.log(response.data.features[0].properties.postcode)
            setPincode(response.data.features[0].properties.postcode)
          })
          .catch(error => {
            console.log(error);
          });
      }, err => {console.log(err)}, {enableHighAccuracy:false,maximumAge:Infinity, timeout:60000});
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const verifyPincode = (pincode) => {
    const pincodePattern = /^[1-9][0-9]{5}$/;
    if (pincode === "") {
      setResult("empty");
    } else if (pincodePattern.test(pincode)) {
      setResult("yes");
    } else {
      setResult("no");
    }
  };
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <div className={styles.navLogo}>
          <img src="/assets/img/logo.png" alt="" />
        </div>
      </Link>
      <div className={styles.navLinks}>
        {/* <Link href='/' className={`${styles.navLink} ${styles.mRemove}`}>contact us</Link> */}
        <Link
          href="/products"
          className={`${styles.navLink} ${styles.mRemove}`}
        >
          Products
        </Link>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link
            href="/category"
            className={`${styles.navLink} ${styles.mRemove}`}
          >
            Categories
          </Link>
          {showDropdown && (
            <div className={styles.dropdown}>
              <Link href="/category/rings">Rings</Link>
              <Link href="/category/earrings">Earrings</Link>
              <Link href="/category/pendants">Pendants</Link>
              <Link href="/category/bracelets">Bracelets</Link>
              <Link href="/category/mens">Mens</Link>
            </div>
          )}
        </div>
        <Link href="/about" className={`${styles.navLink} ${styles.mRemove}`}>
          About Us
        </Link>
        <Link href="/track" className={`${styles.navLink} ${styles.mRemove}`}>
          Track your order
        </Link> 
        <div className={`${styles.pin} ${styles.navLink} ${styles.mRemove}`} onMouseEnter={() => setShowPincodeDropdown(true)}
            onMouseLeave={() => setShowPincodeDropdown(false)}>
          <div   href="/pincode" className={`${styles.checkpin} ${styles.mRemove}`}>
            <span>
              <p>Delivery</p>
              <p className={styles.pincheck}> {pincode ? `${pincode}` : "Enter Pincode"} <BiSolidEditAlt  size={15}/></p>
            </span>
          </div>
          {showPincodeDropdown && (
              <div className={styles.pindropdown}>
                <FaMapLocationDot color={"#123840"} size={140}/>
                <h1 className={styles.pintitle}>Check Pincode Availability</h1>
                <form onSubmit={(e) => {
              e.preventDefault();
              verifyPincode(e.target[0].value);
            }} className={styles.inputContainer} action="">
                  <input value={pincode}
              onChange={(e) => setPincode(e.target.value)} className={styles.input} type="text" placeholder="Enter Pincode" />
                  <button type="submit"  className={styles.inputBtn}>Check</button>
                </form>
                <section>
        {Result === "empty" && <h2 className={styles.pintitle}>Search for something</h2>}
        {Result === "yes" && (
          <div className={styles.resultCont}>
            <BiSolidCheckCircle size={70} className="result-icon" />
            <h2 className={styles.pintitle}>We can deliver to your Pincode</h2>
          </div>
        )}
        {Result === "no" && (
          <div className={styles.resultCont}>
            <BiBlock size={70} className="result-icon wrong" />
            <h2 className={styles.pintitle}>We can't deliver to your Pincode</h2>
          </div>
        )}
      </section>
              </div>
            )}
        </div>

        <Link
          href="/cart"
          className={`${styles.navLink} ${styles.mRemove} ${styles.cart}`}
        >

          <img src="/assets/img/shopping-bag.svg" alt="" />
          <span>{cartItems.length}</span>
        </Link>
        <Link
          href="/wishlist"
          className={`${styles.navLink} ${styles.mRemove} ${styles.cart}`}
        >
          <BiHeart />
        </Link>
        <button
         onClick={() => {console.log("abcd");setShowCurrencyDropdown(!showCurrencyDropdown)}}
     
          className={`${styles.navLink} ${styles.mRemove} ${styles.cart} ${styles.curr}`}
        >
          <img src="/currency.png" alt="" />
        </button>
        {/* {showCurrencyDropdown && (
          <div className={styles.currencyDropdown}>
             <button className={`${styles.currencyButton} ${currency === "INR" ? styles.currActive : "hello"}`} onClick={() => {changeCurrency("INR"); setShowCurrencyDropdown(!showCurrencyDropdown)}}>
              <FaRupeeSign /> INR
            </button>
            <button className={`${styles.currencyButton} ${currency === "USD" ? styles.currActive : "hello"}`} onClick={() => {changeCurrency("USD"); setShowCurrencyDropdown(!showCurrencyDropdown)}}>
              <FaDollarSign /> USD
            </button>
            <button className={`${styles.currencyButton} ${currency === "EUR" ? styles.currActive : ""}`} onClick={() => {changeCurrency("EUR"); setShowCurrencyDropdown(!showCurrencyDropdown)}}>
              <FaEuroSign /> EUR
            </button>
            <button className={`${styles.currencyButton} ${currency}`} onClick={() => {changeCurrency("GBP"); setShowCurrencyDropdown(!showCurrencyDropdown)}}>
              <FaPoundSign /> GBP
            </button>
          </div>)} */}

      </div>
      <Link
        href="/cart"
        className={`${styles.navLink} ${styles.dRemove} ${styles.cart}`}
      >
        <img src="/assets/img/shopping-bag.svg" alt="" />
        <span>{cartItems.length}</span>
      </Link>
      <Link
        href="/wishlist"
        className={`${styles.navLink} ${styles.dRemove} ${styles.cart}`}
      >
        <BiHeart />
      </Link>
      <button
         onClick={() => {console.log("abcd");setShowCurrencyDropdown(!showCurrencyDropdown)}}
     
          className={`${styles.navLink} ${styles.dRemove} ${styles.cart} ${styles.curr}`}
        >
          <img src="/currency.png" alt="" />
        </button>
        {showCurrencyDropdown && (
          <div className={styles.currencyDropdown}>
               <button className={`${styles.currencyButton} ${currency === "INR" ? styles.currActive : "hello"}`} onClick={() => {changeCurrency("INR"); setShowCurrencyDropdown(!showCurrencyDropdown); handleChangeRate("INR");}}>
              <FaRupeeSign /> INR
            </button>
            <button className={`${styles.currencyButton} ${currency === "USD" ? styles.currActive : ""}`} onClick={() => {changeCurrency("USD"); setShowCurrencyDropdown(!showCurrencyDropdown); handleChangeRate("USD");}}>
              <FaDollarSign /> USD
            </button>
            <button className={`${styles.currencyButton} ${currency === "EUR" ? styles.currActive : ""}`} onClick={() => {changeCurrency("EUR"); setShowCurrencyDropdown(!showCurrencyDropdown); handleChangeRate("EUR");}}>
              <FaEuroSign /> EUR
            </button>
            <button className={`${styles.currencyButton} ${currency === "GBP" ? styles.currActive : ""}`} onClick={() => {changeCurrency("GBP"); setShowCurrencyDropdown(!showCurrencyDropdown); handleChangeRate("GBP");}}>
              <FaPoundSign /> GBP
            </button>
          </div>)}

      <div className={styles.navHam} onClick={() => setShowMobile(!showMobile)}>
        <BiMenuAltRight />
      </div>

      {showMobile && (
        <div className={styles.mobileNavLinks}>
          <Link
            onClick={() => setShowMobile(!showMobile)}
            href="/products"
            className={styles.mobileNavLink}
          >
            Products
          </Link>
          <Link
            onClick={() => setShowMobile(!showMobile)}
            href="/category"
            className={styles.mobileNavLink}
          >
            Categories
          </Link>
          <Link
            onClick={() => setShowMobile(!showMobile)}
            href="/about"
            className={styles.mobileNavLink}
          >
            About Us
          </Link>
          <Link
            onClick={() => setShowMobile(!showMobile)}
            href="/pincode"
            className={styles.mobileNavLink}
          >
            Check Pincode
          </Link>
          <Link
            onClick={() => setShowMobile(!showMobile)}
            href="/track"
            className={styles.mobileNavLink}
          >
            Track your orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
