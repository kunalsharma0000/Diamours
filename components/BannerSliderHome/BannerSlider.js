'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './BannerSlider.module.css'
import Link from 'next/link';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const BannerSlider = ({BannerData}) => {
    const [swiperRef, setSwiperRef] = useState(null);

    const prevHandler = () => {
        swiperRef.slidePrev();
    };

    const nextHandler = () => {
        swiperRef.slideNext();
    };
    return (
        <div className={styles.bannerSlider}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={(swiper) => setSwiperRef(swiper)}
            ><div className={styles.bannerSliderWrapper}>
                    {
                        BannerData.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <div className={styles.banner}>
                                    <div className={styles.bannerLeft}>
                                        {/* <div className={styles.blCaption}>{banner.caption}</div>
                                        <div className={styles.blHeading}>{banner.heading}</div>
                                        <div className={styles.blPara}>{banner.para}</div> */}
                                        {banner.link === "" ? "" : <Link href={banner.link} className={styles.blBtn}>{banner.btnText}</Link>}
                                    </div>
                                    <div className={styles.bannerRight}>
                                        <img src={`/assets/img/${banner.img}`} alt="" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </div>
                <div className={styles.bannerNavigation}>
                    <BiChevronLeft className={`${styles.barrow} ${styles.barrowLeft}`} onClick={prevHandler} />
                    <BiChevronRight className={`${styles.barrow} ${styles.barrowRight}`} onClick={nextHandler} />
                </div>
            </Swiper>
        </div>

        // <div className={styles.bannerSlider}>
        //     <Swiper
        //         slidesPerView={1}
        //         modules={[Pagination]}
        //         pagination={{ clickable: true }}
        //         onSwiper={(swiper) => setSwiperRef(swiper)}
        //         style={{
        //             "--swiper-pagination-color": "var(--skin)",
        //             "--swiper-pagination-bullet-inactive-color": "var(--white)",
        //             "--swiper-pagination-bullet-inactive-opacity": "1",
        //             "--swiper-pagination-bullet-size": "14px",
        //             "--swiper-pagination-bullet-horizontal-gap": "6px"
        //         }}
        //     >
        //         <div className={styles.bannerSliderWrapper}>
        //             {
        //                 BannerData.map((banner) => (
        //                     <SwiperSlide>
        //                         <div className={styles.banner}>
        //                             <div className={styles.bannerLeft}>
        //                                 <div className={styles.blCaption}>{banner.caption}</div>
        //                                 <div className={styles.blHeading}>{banner.heading}</div>
        //                                 <div className={styles.blPara}>{banner.para}</div>
        //                                 <Link href={banner.link} className={styles.blBtn}>see all</Link>
        //                             </div>
        //                             <div className={styles.bannerRight}>
        //                                 <img src={`/assets/img/${banner.img}`} alt="" />
        //                             </div>
        //                         </div>
        //                     </SwiperSlide>
        //                 ))
        //             }
        //         </div>
        //         <div className={styles.bannerNavigation}>
        //             <FiChevronLeft className={`${styles.barrow} ${styles.barrowLeft}`} onClick={prevHandler} />
        //             <FiChevronRight className={`${styles.barrow} ${styles.barrowRight}`} onClick={nextHandler} />
        //         </div>
        //     </Swiper>
        // </div>

    )
}

export default BannerSlider