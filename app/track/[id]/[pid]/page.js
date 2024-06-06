"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css"
import { FiCheck } from "react-icons/fi";
import { GoDotFill } from 'react-icons/go'
function TrackSingle() {
  const params = useParams();
  const [trackData, setTrackData] = useState(null);
  const [product, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(
          `https://diamour-backend-7mz7m.ondigitalocean.app/core/track/${params.id}`
        );
        console.log(response.data);
        setTrackData(response.data);
        const selectedProduct = response.data?.products?.find(
          (item) => item.id === parseInt(params.pid)
        );
        console.log(selectedProduct);
        setProductData(selectedProduct);
      } catch (error) {
        console.error("Error fetching track data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackData();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <header className={styles.header}>
        <Link href={`/track/${params.id}`} className={`${styles.rounded} rounded`}>
          Back
        </Link>
        <h1 className={styles.header_title}>Track your order</h1>
        <hr className={styles.header_hr} />
      </header>
      <main className={styles.main}>
        <img className={styles.main_img} width={600} src={product?.main_image} />
        <section className={styles.section}>
          <h1 className={styles.section_title}>{product?.title}</h1>
          <button className={`rounded ${styles.section_button}`}>On the way</button>
          <h2 className={styles.section_subtitle}>Shipment Info:</h2>
          <div className={styles.section_div}>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Estimated Delivery Time: </h3>
              <p className={styles.section_span_text}>
                {trackData?.order?.estimated_delivery_date
                  ? new Date(trackData?.order?.estimated_delivery_date)
                    .toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })
                    .replace(/(\d+).+?(\w+).+?(\d+)/, "$3 $2 $1")
                  : "To be updated soon"}
              </p>
            </span>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Tracking Code: </h3>
              <p className={styles.section_span_text}>{params.id}</p>
            </span>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Reciever's Name: </h3>
              <p className={styles.section_span_text}>{trackData?.customer?.name}</p>
            </span>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Reciever's Address: </h3>
              <p className={styles.section_span_text}>{trackData?.customer?.address}</p>
            </span>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Reciever's Phone: </h3>
              <p className={styles.section_span_text}>{trackData?.customer?.phone_number}</p>
            </span>
            <span className={styles.section_span}>
              <h3 className={styles.section_span_title}>Reciever's Email: </h3>
              <p className={styles.section_span_text}>{trackData?.customer?.email}</p>
            </span>
          </div>
        </section>

       
      </main>
      <div className={styles.delivery}>
          {/* <p className={styles.section_subtitle}>Delivery Tracking: </p> */}
          <div className={styles.stepper}>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{trackData?.order?.order_status === "Order Placed" || trackData?.order?.order_status === "Order received" || trackData?.order?.order_status === "Making" || trackData?.order?.order_status === "Pickup" || trackData?.order?.order_status === "Dispatched" || trackData?.order?.order_status === "Out for Delivery" || trackData?.order?.order_status === "Delivered" ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Order Placed</div>
              {/* <div className={styles.stepText}>4th Nov, 2023</div> */}
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{(trackData?.order?.order_status === "Order received" && trackData?.order?.order_status !== "Order Placed") || (trackData?.order?.order_status === "Making" && trackData?.order?.order_status !== "Order received") || (trackData?.order?.order_status === "Pickup" && trackData?.order?.order_status !== "Making") || (trackData?.order?.order_status === "Dispatched" && trackData?.order?.order_status !== "Pickup") || (trackData?.order?.order_status === "Out for Delivery" && trackData?.order?.order_status !== "Dispatched") || (trackData?.order?.order_status === "Delivered" && trackData?.order?.order_status !== "Out for Delivery") ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Order received</div>
              {/* <div className={styles.stepText}>4th Nov, 2023</div> */}
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{(trackData?.order?.order_status === "Making" && trackData?.order?.order_status !== "Order received") || (trackData?.order?.order_status === "Pickup" && trackData?.order?.order_status !== "Making") || (trackData?.order?.order_status === "Dispatched" && trackData?.order?.order_status !== "Pickup") || (trackData?.order?.order_status === "Out for Delivery" && trackData?.order?.order_status !== "Dispatched") || (trackData?.order?.order_status === "Delivered" && trackData?.order?.order_status !== "Out for Delivery") ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Making</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{(trackData?.order?.order_status === "Pickup" && trackData?.order?.order_status !== "Making") || (trackData?.order?.order_status === "Dispatched" && trackData?.order?.order_status !== "Pickup") || (trackData?.order?.order_status === "Out for Delivery" && trackData?.order?.order_status !== "Dispatched") || (trackData?.order?.order_status === "Delivered" && trackData?.order?.order_status !== "Out for Delivery") ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Pickup</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{(trackData?.order?.order_status === "Dispatched" && trackData?.order?.order_status !== "Pickup") || (trackData?.order?.order_status === "Out for Delivery" && trackData?.order?.order_status !== "Dispatched") || (trackData?.order?.order_status === "Delivered" && trackData?.order?.order_status !== "Out for Delivery") ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Dispatched</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{(trackData?.order?.order_status === "Out for Delivery" && trackData?.order?.order_status !== "Dispatched") || (trackData?.order?.order_status === "Delivered" && trackData?.order?.order_status !== "Out for Delivery") ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Out for Delivery</div>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>{trackData?.order?.order_status === "Delivered" ? <FiCheck /> : <GoDotFill />}</div>
              <div className={styles.stepHead}>Delivered</div>
            </div>
          </div>
        </div>
    </>
  );
}

export default TrackSingle;