"use client";
import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ProductSlider.module.css";
import ProductData from "../../utils/ProductData";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { useSelector } from "react-redux";

const ProductSlider = ({ productData, category }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  const currencyRate = useSelector((state) => state.currencyRate.rate);
  const currency = useSelector((state) => state.currencyRate.currency);
  return (
    <div style={{ zIndex: 0 }}>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          550: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiperRef(swiper)}
        style={{zIndex: 0}}
        className={styles.productSlider}
      >
        {/* <div className={styles.productSliderWrapper}> */}
        {productData
          ? productData.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  href={`/products/${
                    product.prodSlug ? product.prodSlug : product.slug
                  }`}
                  className={styles.productText}
                >
                  <div className={styles.productSliderCard}>
                    <div className={styles.productBag}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                      </svg>
                      {/* <img src="/assets/img/cart.png" alt="" /> */}
                    </div>
                    <div className={styles.pscImg}>
                      <img
                        src={
                          product.prodImg
                            ? `/assets/product_images/${product.prodImage}`
                            : product.main_image
                        }
                        alt=""
                      />
                    </div>
                    <div className="pscText">
                      <div className={styles.psctName}>
                        {product.prodName ? product.prodName : product.title}
                      </div>
                      <div className={styles.psctPrice}>
                        {currency}
                        {product.prodPrice
                          ? product.prodPrice * currencyRate
                          : product.price * currencyRate}
                        /-
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          : ProductData.slice(0, 10).map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  href={`/products/${product.prodSlug}`}
                  className={styles.productText}
                >
                  <div className={styles.productSliderCard}>
                    <div className={styles.productBag}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                      </svg>
                    </div>
                    <div className={styles.pscImg}>
                      <img
                        src={`/assets/product_images/${product.prodImage}`}
                        alt=""
                      />
                    </div>
                    <div className="pscText">
                      <div className={styles.psctName}>{product.prodName}</div>
                      <div className={styles.psctPrice}>
                        {currency}{" "}
                        {(product.prodPrice * currencyRate).toFixed(2)}/-
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        {/* {
                    ProductData.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Link href={`/products/${product.prodSlug}`} className={styles.productText}>
                                <div className={styles.productSliderCard}>
                                    <div className={styles.productBag}>
                                        <img src="/assets/img/cart.png" alt="" />
                                    </div>
                                    <div className={styles.pscImg}>
                                        <img src={`/assets/img/${product.prodImage}`} alt="" />
                                    </div>
                                    <div className="pscText">
                                        <div className={styles.psctName}>{product.prodName}</div>
                                        <div className={styles.psctPrice}>₹ {product.prodPrice}/-</div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                } */}
        {/* </div> */}
        <div className={styles.sliderExtras}>
          <button onClick={prevHandler}>
          <Link href={`/category/${category}`} className={styles.sliderShowBtn}>
            Show More
          </Link>
          </button>
          
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

export default ProductSlider;
