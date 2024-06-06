import React from 'react'
import styles from './PaymentDetails.module.css'
import OrderSummaryBox from '../OrderSummaryBox/OrderSummaryBox'
import { FiCheck } from 'react-icons/fi'
import { useCheckoutContext } from '@/context/CheckoutContext'

const PaymentDetails = () => {
    const { checkoutData, setCheckoutData } = useCheckoutContext()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCheckoutData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className={styles.paymentDetails}>
            {/* <div className={styles.backButton}></div> */}
            <div className={styles.paymentHeading}>
                <div className={styles.phLeft}>Enter Your Payment Method</div>
                <div className={styles.phRight}>
                    <div className={styles.stepper}>
                        <div className={styles.step}>
                            <div className={styles.stepCircle}><FiCheck /></div>
                            <div className={styles.stepText}>Delivery</div>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={styles.step}>
                            <div className={`${styles.stepCircle} ${styles.activeStepCircle}`}>2</div>
                            <div className={`${styles.stepText} ${styles.activeStepText}`}>Payment</div>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={styles.step}>
                            <div className={styles.stepCircle}>3</div>
                            <div className={styles.stepText}>Order</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.paymentDWrap}>
                <div className={styles.paymentDLeft}>
                    <div className={styles.paymentDHeading}>Pay With</div>
                    <div className={styles.paymentDOptions}>
                        {/* <div className={styles.paymentDOBox}>
                            <div className={styles.paymentDOBLeft}>
                                <div className={styles.paymentDOBLCheck}>
                                    <div className={styles.paymentDOBLCInput}>
                                        <input type="radio" name='paymentMethod' value="paypal"
                                            checked={checkoutData.paymentMethod === 'paypal'}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.paymentDOBLCText}>Paypal</div>
                                </div>
                                <div className={styles.paymentDOBLText}>You will be redirected to the PayPal website after submitting your order</div>
                            </div>
                            <div className={styles.paymentDOBRight}>
                                <img src="/assets/img/paypal.png" alt="" />
                            </div>
                        </div> */}
                        <div className={styles.paymentDOBox}>
                            <div className={styles.paymentDOBLeft}>
                                <div className={styles.paymentDOBLCheck}>
                                    <div className={styles.paymentDOBLCInput}>
                                        <input type="radio" name='paymentMethod' value="online"
                                            checked={checkoutData.paymentMethod === 'online'}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.paymentDOBLCText}>Online Payment</div>
                                </div>
                                <div className={styles.paymentDOBLText}>Your data will be send to the integartion so please wait after Clicking on order now button</div>
                            </div>
                          
                        </div>
                        {/* <div className={styles.paymentDOBoxCC}>
                            <div className={styles.paymentDOBCCTop}>
                                <div className={styles.paymentDOBLeft}>
                                    <div className={styles.paymentDOBLCheck}>
                                        <div className={styles.paymentDOBLCInput}>
                                            <input type="radio" name='paymentMethod' value="credit"
                                                checked={checkoutData.paymentMethod === 'credit'}
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className={styles.paymentDOBLCText}>Pay with Credit Card</div>
                                    </div>
                                </div>
                                <div className={styles.paymentDOBRight}>
                                    <img src="/assets/img/mastercard.png" alt="" />
                                    <img src="/assets/img/mastercard.png" alt="" />
                                    <img src="/assets/img/mastercard.png" alt="" />
                                </div>
                            </div>
                            <div className={styles.paymentDOBCCBottom}>
                                <div className={styles.dualField}>
                                    <div className={styles.inputField}>
                                        <div className={styles.label}>Card Number</div>
                                        <input type='text' placeholder='Card Number' />
                                    </div>
                                    <div className={styles.inputField}>
                                        <div className={styles.label}>Expiry Date</div>
                                        <input type='text' placeholder='Expire Date' />
                                    </div>
                                </div>
                                <div className={styles.inputField}>
                                    <div className={styles.label}>Enter CVV</div>
                                    <input type='text' placeholder='CVV' />
                                </div>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
                <div className={styles.paymentDRight}>
                    <OrderSummaryBox />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetails