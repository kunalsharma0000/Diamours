import React from "react";
import styles from "./SuccessOredr.module.css";
import { FiCheck } from "react-icons/fi";
import { BiSolidErrorCircle } from "react-icons/bi";

const SuccessOrder = ({ id }) => {
  /*
  make a state variable : paymentSuccess true or false
  make a request to the API endpoint https://diamour-backend-7mz7m.ondigitalocean.app/core/payment/verify with the payload : { payment_id: id}
  id from props.
  If the response is: {"error": "Payment not succesful"} then set the state to false if the response is {"status": "placed"} then set to true.
  request to api endpoint on page load.
  By default the state is true.
  Next JS 13 React Component
   */
  const [paymentSuccess, setPaymentSuccess] = React.useState(true);

  React.useEffect(() => {
    fetch(
      "https://diamour-backend-7mz7m.ondigitalocean.app/core/payment/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_id: id }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error === "Payment not successful") {
          setPaymentSuccess(false);
        } else if (data.status === "placed") {
          setPaymentSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className={styles.successOrder}>
      {/* <div className={styles.backButton}></div> */}
      <div className={styles.successHeading}>
        {paymentSuccess ? (
          <div className={styles.shLeft}>Payment Successful</div>
        ) : (
          <div className={styles.shLeft}>Payment not Successful</div>
        )}

        <div className={styles.shRight}>
          <div className={styles.stepper}>
            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <FiCheck />
              </div>
              <div className={styles.stepText}>Delivery</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <FiCheck />
              </div>
              <div className={styles.stepText}>Payment</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <FiCheck />
              </div>
              <div className={styles.stepText}>Order</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.successOWrap}>
        <div className={styles.successOWUnder}>
          {paymentSuccess ? (
            <img src="/assets/img/success.png" alt="" />
          ) : (
            <BiSolidErrorCircle size={400} style={{ color: "red" }} />
          )}

          <div className={styles.successOWUHeader}>
            {paymentSuccess ? (
              <div className={styles.successOWUHHeading}>
                Payment Successful
              </div>
            ) : (
              <div className={styles.successOWUHHeading}>
                Payment not Successful
              </div>
            )}
            {paymentSuccess ? (
              <div className={styles.successOWUHPara}>
                Your payment has been successfully done. <br /> Payment ID:-{" "}
                {id}
              </div>
            ) : (
              <div className={styles.successOWUHPara}>
                Your payment was not successful. <br /> Payment ID:- {id}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
