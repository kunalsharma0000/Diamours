"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css";
import { BiSolidCheckCircle, BiBlock } from "react-icons/bi";

function Pincode() {
  const [Result, setResult] = useState("empty");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      // console.log("hellooooo2o")
      navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("helloooooo")
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=e73594855d9845e9af8321e677c0e50f`)
          .then(response => {
            // console.log(response.data.features[0].properties.postcode)
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
    <main>
      <header className="header">
        <div className="veal"></div>
        <div className="z">
          <h1 className="title">Check Pincode availability</h1>
          <form
            className="input-container"
            onSubmit={(e) => {
              e.preventDefault();
              verifyPincode(e.target[0].value);
            }}
          >
            <input
              className="input"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button type="submit" className="input-btn">
              Check
            </button>
          </form>
        </div>
      </header>
      <section className="result-container">
        {Result === "empty" && <h2>Search for something</h2>}
        {Result === "yes" && (
          <div className="result">
            <BiSolidCheckCircle size={200} className="result-icon" />
            <h2 className="result-text">We can deliver to your Pincode</h2>
          </div>
        )}
        {Result === "no" && (
          <div className="result">
            <BiBlock size={200} className="result-icon wrong" />
            <h2 className="result-text">We can't deliver to your Pincode</h2>
          </div>
        )}
      </section>
    </main>
  );
}

export default Pincode;
