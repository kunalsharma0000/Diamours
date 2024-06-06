"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css"

function TrackMulti() {
  const params = useParams();
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(
          `https://diamour-backend-7mz7m.ondigitalocean.app/core/track/${params.id}`
        );
        console.log("e3c6592c884d4b989c8381761b7a961f");
        console.log(response.data);
        setTrackData(response.data);
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
    <main className={styles.main}>
      <header className={styles.custom_header}> {/* Add a custom class name */}
        <h1 className={styles.header_h1}>Track your order</h1>
        <hr className={styles.header_hr} />
      </header>
      <section className={styles.custom_section}> {/* Add a custom class name */}
        {trackData?.products?.map((product) => {
          return (
            <Link href={`/track/${params.id}/${product.id}`} key={product.id}> {/* Add a key prop */}
              <div className={styles.custom_product}> {/* Add a custom class name */}
                <img width={200} src={product.main_image} alt="" />
                <div>
                  <h2 className={styles.custom_title}>{product.title}</h2> {/* Add a custom class name */}
                  <button className={`rounded ${styles.custom_button}`}>On the way</button> {/* Add a custom class name */}
                  <span>
                    <h5>Estimated Delivery</h5>
                    <h4 className={styles.custom_delivery}>
                      {trackData?.order?.estimated_delivery_date
                        ? new Date(trackData?.order?.estimated_delivery_date)
                            .toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                            })
                            .replace(/(\d+).+?(\w+).+?(\d+)/, "$3 $2 $1")
                        : "To be updated soon"}
                    </h4>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
export default TrackMulti;
