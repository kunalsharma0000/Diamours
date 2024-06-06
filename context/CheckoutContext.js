// CheckoutContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};

export const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
        paymentMethod: '',
    });

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submitForm = () => {
        // Submit the formData to a backend or perform desired actions
        console.log('Form submitted:', checkoutData);
    };

    const contextValue = {
        checkoutData,
        setCheckoutData,
        step,
        nextStep,
        prevStep,
        submitForm,
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
