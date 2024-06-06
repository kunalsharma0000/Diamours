import React from 'react'
import styles from './DeliveryDetails.module.css'
import OrderSummaryBox from '../OrderSummaryBox/OrderSummaryBox'
import { useCheckoutContext } from '@/context/CheckoutContext'

const DeliveryDetails = () => {
    const { checkoutData, setCheckoutData } = useCheckoutContext()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCheckoutData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className={styles.deliveryDetails}>
            {/* <div className={styles.backButton}></div> */}
            <div className={styles.deliveryHeading}>
                <div className={styles.dhLeft}>Enter Your Delivery Address</div>
                <div className={styles.dhRight}>
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
            </div>
            <div className={styles.deliveryDWrap}>
                <div className={styles.deliverDLeft}>
                    <div className={styles.form}>
                        <div className={styles.inputField}>
                            <div className={styles.label}>Enter Your Name</div>
                            <input type='text' placeholder='Name' name="name"
                                value={checkoutData.name}
                                onChange={handleInputChange} />
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.label}>Phone Number</div>
                            <input type='text' placeholder='Phone' name="phone"
                                value={checkoutData.phone}
                                onChange={handleInputChange} />
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.label}>Email Address</div>
                            <input type='text' placeholder='Email' name="email"
                                value={checkoutData.email}
                                onChange={handleInputChange} />
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.label}>Street Address</div>
                            <input type='text' placeholder='Street' name="address"
                                value={checkoutData.address}
                                onChange={handleInputChange} />
                        </div>
                        <div className={styles.dualField}>
                            <div className={styles.inputField}>
                                <div className={styles.label}>PIN Code</div>
                                <input type='text' placeholder='PIN' name="pincode"
                                    value={checkoutData.pincode}
                                    onChange={handleInputChange} />
                            </div>
                            <div className={styles.inputField}>
                                <div className={styles.label}>City</div>
                                <input type='text' placeholder='City' name="city"
                                    value={checkoutData.city}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.label}>State</div>
                            <input type='text' placeholder='State' name="state"
                                value={checkoutData.state}
                                onChange={handleInputChange} />
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.label}>Country</div>
                            <input type='text' placeholder='Country' name="country"
                                value={checkoutData.country}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className={styles.deliverDRight}>
                    <OrderSummaryBox text='Continue to payment' />
                </div>
            </div>
        </div>
    )
}

export default DeliveryDetails