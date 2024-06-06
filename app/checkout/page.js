'use client'
import DeliveryDetails from '@/components/DeliveryDetails/DeliveryDetails'
import React, { useState } from 'react'
import styles from './page.module.css'
import PaymentDetails from '@/components/PaymentDetails/PaymentDetails'
import SuccessOrder from '@/components/SuccessOrder/SuccessOrder'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'
import { useCheckoutContext } from '@/context/CheckoutContext'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const { step, prevStep } = useCheckoutContext()
    return (
        <div className={styles.checkout}>

            {step === 1 && (
                <button className={styles.backButton} onClick={() => router.push('/')}>
                    <BiArrowBack />back to home
                </button>)
            }
            {step === 2 && (
                <button className={styles.backButton} onClick={prevStep}>
                    <BiArrowBack />back to Delivery details
                </button>)
            }
            {step === 3 && (
                <button className={styles.backButton} onClick={() => router.push('/')}>
                    <BiArrowBack />back to home
                </button>)
            }


            {/* <div className={styles.checkoutHeading}>
                <div className={styles.chLeft}>Checkout</div>
                <div className={styles.chRight}>
                    <div className={styles.stepper}>
                        <div className={styles.step}>
                            <div className={`${styles.stepCircle} ${styles.activeStepCircle}`}>1</div>
                            <div className={`${styles.stepText} ${styles.activeStepText}`}>Delivery</div>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={styles.step}>
                            <div className={styles.stepCircle}>2</div>
                            <div className={styles.stepText}>Payment</div>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={styles.step}>
                            <div className={styles.stepCircle}>3</div>
                            <div className={styles.stepText}>Order</div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className={styles.checkoutWrap}>
                {step === 1 && (<DeliveryDetails />)}
                {step === 2 && (<PaymentDetails />)}
                {step === 3 && (<SuccessOrder />)}
            </div>

        </div>
    )
}

export default page