"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./MoreProductSlider.module.css";
import ProductData from "../../utils/ProductData";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProductAPI from "@/apis/ProductAPI";
import axios from "axios";

const MoreProductSlider = ({ prodCat }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const { data, status } = await axios.get(
          "https://diamour-backend-7mz7m.ondigitalocean.app/core/productsUnOp"
        );
        console.log(data);
        if (status === 200) {
          const filtered = data.filter(
            (product) => product.category.category_name === prodCat
          );
          console.log(filtered);
          setProducts(filtered.slice(0, 8));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          550: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiperRef(swiper)}
        style={{
          "--swiper-pagination-color": "#000",
          "--swiper-pagination-bullet-inactive-color": "#808080",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "14px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        className={styles.productSlider}
      >
        <div className={styles.productSliderWrapper}>
          {products?.map((product) => (
            <SwiperSlide key={product?.id}>
              <Link
                href={`/products/${product?.slug}`}
                className={styles.productLink}
              >
                <div className={styles.productSliderCard}>
                  <div className={styles.productBag}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>

                  </div>
                  <div className={styles.pscImg}>
                    <img src={product?.main_image} alt="" />
                  </div>
                  <div className={styles.pscText}>
                    <div className={styles.psctName}>{product?.title}</div>
                    <div className={styles.psctPrice}>₹ {product?.price}/-</div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
        <div className={styles.sliderExtras}>
          <div className={styles.sliderNavButton}>
            <button onClick={prevHandler}>
              <FiArrowLeft />
            </button>
            <button onClick={nextHandler}>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default MoreProductSlider;
