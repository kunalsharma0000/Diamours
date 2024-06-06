
// "use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SingleProductSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useWishlistContext } from "@/context/WishlistContext";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const SingleProductSlider = ({ images, video, detail }) => {
  console.log(images);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newImages, setNewImages] = useState(images);
  const [newVideo, setNewVideo] = useState(video)
  const videoRef = useRef(null);
  const { addToWishlist } = useWishlistContext();

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  // console.log(images)

  function sourceType(source) {
    const fileExtension = source.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return "image";
      // return <img src={source} alt="Product Media" />;
    } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
      return "video";
      // return
      // <video controls>
      //     <source src={source} type={`video/${fileExtension}`} />
      //     Your browser does not support the video tag.
      // </video>;
    } else {
      return <p>Unsupported media type</p>;
    }
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    console.log(video)
    setNewImages(images);
    setIsPlaying(false);
    setNewVideo(video);
  }, [images, video]);

  return (
    <div className={styles.spsSlider}>
      <button
        onClick={() => {
          addToWishlist(detail);
          alert("Item Added to Wishlist!");
        }}
        className={styles.productBag}
      >
        <BiHeart />
      </button>
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.spsSliderTop}
        navigation={true}
      >
        {newImages?.map((image, i) => (
          <>
            {/* {sourceType(image) === 'image' && (
              <SwiperSlide key={i} className={styles.thumbImage}>
                <img src={`/assets/product_images/${image}`} alt="" />
              </SwiperSlide>
            )}
            {sourceType(image) === 'video' && (
              <SwiperSlide key={i} className={styles.thumbImage}>
                <div className={styles.videoOverlay}></div>
                <video ref={videoRef}>
                  <source src={`/assets/product_images/${image}`} alt="" />
                </video>
                <div className={styles.playButton} onClick={togglePlayPause}>
                  {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>
              </SwiperSlide>
            )} */}

            {/* <SwiperSlide key={i}>
              {i < newImages.length - 1 ? (
                <div className={styles.thumbImage}>
                  <img src={image} alt="" />
                </div>
              ) : (
                <div className={styles.thumbImage}>
                  <div className={styles.videoOverlay}></div>
                  <video ref={videoRef}>
                    <source src={image} type="video/mp4" />
                  </video>
                  <div className={styles.playButton} onClick={togglePlayPause}>
                    {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                  </div>
                </div>
              )}
            </SwiperSlide> */}

            <SwiperSlide key={i}>
              <div className={styles.thumbImage}>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          </>

        ))}
        {newVideo && (
          
          <SwiperSlide key={newVideo}>
            <div className={styles.thumbImage}>
              <div className={styles.videoOverlay}></div>
              <video ref={videoRef}>
              
                <source src={newVideo} type="video/mp4" />
              </video>
              <div className={styles.playButton} onClick={togglePlayPause}>
                
                {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={2}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.spsSliderBottom}
      >
        {newImages?.map((image, i) => (
          <>
            {/* {sourceType(image) === 'image' && (
              <SwiperSlide key={i} className={styles.thumbImage}>
                <img src={`/assets/product_images/${image}`} alt="" />
              </SwiperSlide>
            )}
            {sourceType(image) === 'video' && (
              <SwiperSlide key={i} className={styles.thumbImage}>
                <div className={styles.videoOverlay}></div>
                <video ref={videoRef}>
                  <source src={`/assets/product_images/${image}`} alt="" />
                </video>
                <div className={styles.playButton} onClick={togglePlayPause}>
                  {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>
              </SwiperSlide>
            )} */}

            <SwiperSlide key={i}>
              <div className={styles.restImage}>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          </>
        ))}
        {newVideo && (
          <SwiperSlide key={newVideo}>
            <div className={styles.restImage}>
              <video>
                <source src={newVideo} type="video/mp4" />
              </video>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default SingleProductSlider;
