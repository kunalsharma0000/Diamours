"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
// import PopupModal from "@/components/Popup/PopupModal";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { autoPlay } from "swiper";
import BannerSlider from "@/components/BannerSliderHome/BannerSlider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);
  const [isModalOpen, setModalOpen] = useState(true);


  const BannerData = [
    
    {
      id: 2,
      caption: "",
      heading: "",
      para: "",
      link: "category",
      btnText: "see all",
      img: "hero2.jpg",
    },
    {
      id: 3,
      caption: "",
      heading: "",
      para: "",
      link: "",
      img: "hero.jpg",
    },
    {
      id: 4,
      caption: "",
      heading: "",
      para: "",
      link: "",
      img: "hero-2.jpg",
    },
    
  ];

  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play();
    }
    if (videoRef2.current) {
      videoRef2.current.play();
    }
    if (videoRef3.current) {
      videoRef3.current.play();
    }
    if (videoRef4.current) {
      videoRef4.current.play();
    }
    if (videoRef5.current) {
      videoRef5.current.play();
    }

    // Close the modal after a certain delay (e.g., 3 seconds)
    const delay = setTimeout(() => {
      setModalOpen(false);
    }, 300000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className={styles.home}>
      {/*<div className={styles.homeHero}>
        <div className={styles.homeHeroHeading}>
          <div className={styles.homeHeroTopText}>WELCOME TO</div>
          <div className={styles.homeHeroMiddleText}>
            Exquisite Diamond Jewels
          </div>
          <div className={styles.homeHeroBottomText}> <img src="/assets/img/logo golden.png" alt="" width="100%" /> </div>
        </div>

        <div className={styles.homeHeroAbs}>
          <div className={styles.heroOuterCircle}></div>

          <div className={styles.hhaLeft}>
            <div className={styles.hhaType1}>Floral Collection</div>
            <div className={styles.hhaType2}>EXPLORE</div>
            <div className={styles.hhaType2}>HERE</div>
            <Link href="/products" className={styles.hhaButton}>
              see collections <img src="/assets/img/heroarrow.png" alt="" />
            </Link>
          </div>
        </div>
      </div>  */}

      <div>
        {/* <Carousel showThumbs={false} autoPlay showStatus={false}>
          <div className="carousel-slide">
            <div className="text-container"></div>
            <img src="/hero2.jpg" alt="Image 1" />
            
          </div>
          <div className="carousel-slide">
            <div className="text-container"></div>
            <img src="/hero.jpg" alt="Image 2" />
          </div>
          <div className="carousel-slide">
            <div className="text-container"></div>
            <img src="/hero-2.jpg" alt="Image 3" />
          </div>
        </Carousel> */}
      </div>
      <BannerSlider BannerData={BannerData} />
      <div className={styles.homeSection1}>
        <div className={styles.homeSection1Left}>
          <div className={styles.hs1lText}>
            <div className={styles.hs1Type1}>OUR VISION</div>
            <div className={styles.hs1Type2}>THE BEAUTY IS IN</div>
            <div className={styles.hs1Type3}>EVERYDAY</div>
            <div className={styles.hs1Type4}>
              The true beauty of your jewellery shines when it’s on you.
              Everyday.
            </div>
          </div>
          <Link href="/about" className={styles.hs1lButton}>
            read more
          </Link>
        </div>

        <div className={styles.homeSection1Right}>
          <div className={styles.hs1rImg1}>
            <img src="/assets/img/homes1 1.jpg" alt="" />
            <div className={styles.hs1riImgBox1}>
              <video ref={videoRef4} muted loop>
                <source src="gold.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className={styles.hs1rImg2}>
            <img src="/assets/img/homes2.jpg" alt="" />
            <div className={styles.hs1riImgBox2}>
              <video ref={videoRef5} muted loop>
                <source src="rose.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.videogrid}>
          <div className={styles.videohome}>
            <video ref={videoRef1} muted playsInline autoPlay loop>
              <source src="1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.videohome}>
            <video ref={videoRef2} muted playsInline autoPlay loop>
              <source src="2.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.videohome}>
            <video ref={videoRef3} muted playsInline autoPlay loop>
              <source src="3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className={styles.homeSection2}>
        <div className={styles.hs2SubHeading}>Featured Products</div>
        <div className={styles.hs2Heading}>AVEC AMOUR</div>

        <ProductSlider />
      </div>

      <div className={styles.homeSection3}>
        <div className={styles.hs3Left}>
          <div className={styles.hs1lText}>
            <div className={styles.hs1Type1}>COLLECTIONS</div>
            <div className={styles.hs1Type2}>EXCLUSIVELY DESIGNED</div>
            <div className={styles.hs1Type3}>FOR BEAUTY</div>
            <div className={styles.hs1Type4}>
              Jewels that match, suits you like they are made just for you.{" "}
            </div>
          </div>
          <Link href="/products" className={styles.hs1lButton}>
            see all
          </Link>
        </div>
        <div className={styles.hs3Right}>
          <div className={styles.hs3Img}>
            <Link href="/collections/water">
              <img src="/assets/img/card01.png" alt="" />
            </Link>
            <div>Water</div>
          </div>
          <div className={styles.hs3Img}>
            <Link href="/collections/floral">
              <img src="/assets/img/card02.png" alt="" />
            </Link>
            <div>Floral</div>
          </div>
          {/* <div className={styles.hs3Img}>
            <img src="/assets/img/card03.png" alt="" />
            <div>Earth</div>
          </div> */}
          <div className={styles.hs3Img}>
            <Link href="/category/mens">
              <img src="/mens.jpg" alt="" />
            </Link>
            <div>Men</div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.iconGrid}>
          <Swiper
            loop={true}
            loopfillgroupwithblank="true"
            autoPlay={{ delay: 1000, disableOnInteraction: false }}
            // ... other properties
            slidesPerView={3} // Adjust based on your design
            breakpoints={{
              // when window width is >= 320px
              250: {
                slidesPerView: 1,
              },
              // when window width is >= 480px
              400: {
                slidesPerView: 2,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              968: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <img
                className={styles.iconItem}
                src="/assets/icons/01.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.iconItem}
                src="/assets/icons/02.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.iconItem}
                src="/assets/icons/03.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.iconItem}
                src="/assets/icons/04.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.iconItem}
                src="/assets/icons/05.png"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Render the popup modal */}
      {/* {isModalOpen && (
        <div>
          <PopupModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      )} */}
    </div>
  );
}
