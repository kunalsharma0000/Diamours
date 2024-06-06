import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './BannerSlider.module.css';
import Link from 'next/link';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const BannerSlider = ({ BannerData }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [screenS, setscreenS] = useState();

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  useEffect(() => {
    setscreenS(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  }, []);

  return (
    <div className={styles.bannerSlider}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiperRef(swiper)}
      >
        <div className={styles.bannerSliderWrapper}>
          {BannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className={styles.banner}>
                <div className={styles.bannerLeft}>
                  <div className={styles.blCaption}>{banner.caption}</div>
                  <div className={styles.blHeading}>{banner.heading}</div>
                  <div className={styles.blPara}>{banner.para}</div>
                  <Link href={banner.link} className={styles.blBtn}>
                    see all
                  </Link>
                </div>
                <div className={styles.bannerRight}>
                  {screenS > 500 ? (
                    <img src={`/assets/img/${banner.img}`} alt="" />
                  ) : (
                    <img src={`/assets/img/${banner.imgm}`} alt="" />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className={styles.bannerNavigation}>
          <BiChevronLeft
            className={`${styles.barrow} ${styles.barrowLeft}`}
            onClick={prevHandler}
          />
          <BiChevronRight
            className={`${styles.barrow} ${styles.barrowRight}`}
            onClick={nextHandler}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
