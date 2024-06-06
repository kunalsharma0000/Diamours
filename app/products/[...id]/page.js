"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import SingleProductSlider from "@/components/SingleProductSlider/SingleProductSlider";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import MoreProductSlider from "@/components/MoreProductSlider/MoreProductSlider";
import { FiArrowDown } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import { useCartContext } from "@/context/CartContext";
import ProductData from "@/utils/ProductData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useWishlistContext } from "@/context/WishlistContext";
import { useCurrencyContext } from "@/context/Currency";
import { useSelector } from 'react-redux';
import {
  FaDollarSign,
  FaPoundSign,
  FaEuroSign,
  FaRupeeSign,
} from "react-icons/fa";
const page = (props) => {
  const { addToCart } = useCartContext();
  const router = useRouter();
  const server = "https://diamour-backend-7mz7m.ondigitalocean.app";
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState("silver");
  const [selectedSize, setSelectedSize] = useState("15");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [showFullText, setShowFullText] = useState(false);
  const { addToWishlist } = useWishlistContext();
  const { currency } = useCurrencyContext();
  const currencyRate = useSelector(state => state.currencyRate.rate);

  const handleChangeColor = (color) => {
    setSelectedColor(color);
    // Pass the images array associated with the selected color to SingleProductSlider
    // const selectedColorImages = productDetail?.prodImages[color];
    // setImages(selectedColorImages);
    // setImages(productDetail?.prodImages[color]);
  };

  useEffect(() => {
    if (selectedColor === "silver") {
      // console.log("silver selected");
      // console.log(productDetail?.variants[0].images);
      setImages(productDetail?.variants[2].images);

      const matchingVideo = productDetail?.videos?.find((video) => {
        return video.color === "silver" || video.color === "Silver";
      });
      console.log("matchingVideo", matchingVideo);
      if (matchingVideo) {
        setVideo(matchingVideo.video);
      } else {
        setVideo(null);
      }
      // const updatedImages = [...images, productDetail?.videos[2].video];
      // setImages(updatedImages);
    }
  });

 

  useEffect(() => {
    // setVideo(null)
    if (selectedColor === "silver") {
      // console.log("silver selected");
      // console.log(productDetail?.variants[0].images);
      setImages(productDetail?.variants[2].images);

      const matchingVideo = productDetail?.videos?.find((video) => {
        return video.color === "silver" || video.color === "Silver";
      });
      console.log("matchingVideo", matchingVideo);
      if (matchingVideo) {
        setVideo(matchingVideo.video);
      } else {
        setVideo(null);
      }
      // const updatedImages = [...images, productDetail?.videos[2].video];
      // setImages(updatedImages);
    }
    if (selectedColor === "gold") {
      // console.log(productDetail?.variants[0].images);
      setImages(productDetail?.variants[0].images);
      console.log("gold selected  " , video );

      const matchingVideo = productDetail?.videos?.find((video) => {
        return video.color === "Gold" || video.color === "gold";
      });
      if (matchingVideo) {
        setVideo(matchingVideo.video);
      } else {
        setVideo(null);
      }
      // const updatedImages = [...images, productDetail?.videos[0].video];
      // setImages(updatedImages);
    }
    if (selectedColor === "rose") {
      // console.log("rose selected");
      // console.log(productDetail?.variants[1].images);
      setImages(productDetail?.variants[1].images);

      const matchingVideo = productDetail?.videos?.find((video) => {
        return video.color === "Rose" || video.color === "Copper" ||video.color === "rose" || video.color === "copper";
      });
      if (matchingVideo) {
        setVideo(matchingVideo.video);
      } else {
        setVideo(null);
      }
      // const updatedImages = [...images, productDetail?.videos[1].video];
      // setImages(updatedImages);
    }
  }, [selectedColor]);

  useEffect(() => {
    const slug = props.params.id;

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        // console.log("entered");
        const { data, status } = await axios.get(
          `${server}/core/product/${slug}`
        );
        // console.log(data);

        if (status === 200) {
          setProductDetail(data);
          setImages(data?.variants[2]?.images);
          const matchingVideo = data?.videos?.find(
            (video) => video.color === "silver"
          );
          if (matchingVideo) {
            setVideo(matchingVideo.video);
          } else {
            setVideo(null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetail();
  }, []);

  const openWhatsApp = () => {
    window.open(`https://wa.me/919082803080?text=Hey I'm interested to buy jewellery from Diamour`, '_blank');
  };

  if (loading) {
    console.log("video >>>> 1234", video);
    
    return <Loader />;}
  else{
    return (
      <div className={styles.productDetail}>
        <div className={styles.productDetailTop}>
          <div className={styles.pdtLeft}>
            
            <SingleProductSlider images={images} video={video} detail={productDetail}/>
          </div>
          <div className={styles.pdtRight}>
            <div className={styles.pdtrHeading}>
              <div className={styles.pdtrhHead}>{productDetail?.title}</div>
              
                <div
                    onClick={() => {
                      addToWishlist(productDetail);
                      alert("Item Added to Wishlist!");
                    }}
                    className={`${styles.pdtrbSec2} rounded`}
                  >
                    {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg> */}
                  </div>
              
              <div className={styles.pdtrhSubHead}>
                {productDetail?.category?.category_name}
              </div>
            </div>
            <div className={styles.pdtrColorMobile}>
              <div className={styles.pdtrcHeading}>Silver Finish </div>
              
              <div className={styles.pdtrcSelect}>
                <div
                  className={`${styles.pdtrcssilver} ${
                    selectedColor === "silver" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => {
                    setSelectedColor("silver");
                  }}
                ></div>
                <div
                  className={`${styles.pdtrcsgold} ${
                    selectedColor === "gold" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => setSelectedColor("gold")}
                ></div>
                <div
                  className={`${styles.pdtrcsrose} ${
                    selectedColor === "rose" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => setSelectedColor("rose")}
                ></div>
              </div>
            </div>
            <div className={styles.pdtrPara}>
              {showFullText ? (
                <>{productDetail?.description}</>
              ) : (
                <>{productDetail?.description.slice(0, 200)}...</>
              )}
              <div
                className={styles.readButton}
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Read Less" : "Read More"}
              </div>
            </div>
  
            <div className={styles.pdtrMoreDetails}>
              <div className={styles.pdtrPrice}>
                {currency === "USD" ? (
                  <FaDollarSign />
                ) : currency === "GBP" ? (
                  <FaPoundSign />
                ) : currency === "EUR" ? (
                  <FaEuroSign />
                ) : currency === "INR" ? (
                  <FaRupeeSign />
                ) : (
                  ""
                )}
                {(productDetail?.price*currencyRate).toFixed(2)}{" "}
                (Excl. taxes)
              </div>
              <div className={styles.pdtrMore}>
                <div className={styles.pdtrmDiv}>
                  <div className={styles.pdtrmdHead}>Diamond weight</div>
                  <div className={styles.pdtrmdText}>
                    {productDetail?.diamond_color_stone_weight}
                  </div>
                </div>
                <div className={styles.pdtrmDiv}>
                  <div className={styles.pdtrmdHead}>Total Weight</div>
                  <div className={styles.pdtrmdText}>
                    {productDetail?.total_weight}
                  </div>
                </div>
                <div className={styles.pdtrmDiv}>
                  <div className={styles.pdtrmdHead}>Silver Purity</div>
                  <div className={styles.pdtrmdText}>
                    {productDetail?.gold_purity}
                  </div>
                </div>
                <div className={styles.pdtrmDiv}>
                  <div className={styles.pdtrmdHead}>Diamond Clarity</div>
                  <div className={styles.pdtrmdText}>
                    {productDetail?.diamond_clarity}
                  </div>
                </div>
              </div>
            </div>
  
            <div className={styles.pdtrColor}>
              <div className={styles.pdtrcHeading}>Silver Finish</div>
              <div className={styles.pdtrcSelect}>
                <div
                  className={`${styles.pdtrcssilver} ${
                    selectedColor === "silver" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => {
                    
                    setSelectedColor("silver");
                  }}
                ></div>
                <div
                  className={`${styles.pdtrcsgold} ${
                    selectedColor === "gold" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => setSelectedColor("gold")}
                ></div>
                <div
                  className={`${styles.pdtrcsrose} ${
                    selectedColor === "rose" ? styles.pdtrcsSelected : ""
                  }`}
                  onClick={() => setSelectedColor("rose")}
                ></div>
              </div>
            </div>
  
            {productDetail?.category?.category_name === "Rings" && (
              <div className={styles.pdtrSize}>
                <div className={styles.pdtrsChart}>Ring Size</div>
                <div
                  className={styles.pdtrsDrop}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {selectedSize} <BiChevronDown />
                  {showDropdown && (
                    <div className={styles.pdtrsdropdown}>
                      <div onClick={() => setSelectedSize("1")}>1</div>
                      <div onClick={() => setSelectedSize("2")}>2</div>
                      <div onClick={() => setSelectedSize("3")}>3</div>
                      <div onClick={() => setSelectedSize("4")}>4</div>
                      <div onClick={() => setSelectedSize("5")}>5</div>
                      <div onClick={() => setSelectedSize("6")}>6</div>
                      <div onClick={() => setSelectedSize("7")}>7</div>
                      <div onClick={() => setSelectedSize("8")}>8</div>
                      <div onClick={() => setSelectedSize("9")}>9</div>
                      <div onClick={() => setSelectedSize("10")}>10</div>
                      <div onClick={() => setSelectedSize("11")}>11</div>
                      <div onClick={() => setSelectedSize("12")}>12</div>
                      <div onClick={() => setSelectedSize("13")}>13</div>
                      <div onClick={() => setSelectedSize("14")}>14</div>
                      <div onClick={() => setSelectedSize("15")}>15</div>
                      <div onClick={() => setSelectedSize("16")}>16</div>
                      <div onClick={() => setSelectedSize("17")}>17</div>
                      <div onClick={() => setSelectedSize("18")}>18</div>
                      <div onClick={() => setSelectedSize("19")}>19</div>
                      <div onClick={() => setSelectedSize("20")}>20</div>
                      <div onClick={() => setSelectedSize("21")}>21</div>
                      <div onClick={() => setSelectedSize("22")}>22</div>
                      <div onClick={() => setSelectedSize("23")}>23</div>
                      <div onClick={() => setSelectedSize("24")}>24</div>
                      <div onClick={() => setSelectedSize("25")}>25</div>
                      <div onClick={() => setSelectedSize("26")}>26</div>
                      <div onClick={() => setSelectedSize("27")}>27</div>
                      <div onClick={() => setSelectedSize("28")}>28</div>
                      <div onClick={() => setSelectedSize("29")}>29</div>
                      <div onClick={() => setSelectedSize("30")}>30</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={styles.pdtrBtn}>
              <div
                className={`${styles.pdtrbPri} rounded`}
                onClick={() => {
                  addToCart(productDetail, 1, selectedColor, selectedSize);
                  alert("Item added to cart!");
                }}
              >
                add to cart
              </div>
              <div
                className={`${styles.pdtrbSec} rounded`}
                onClick={openWhatsApp}
              >
                    Enquire Gold Price
              </div>
             
            </div>
            {/* icon */}
            <div>
                <div className={styles.iconGrid}>
                    <img
                      className={styles.iconItem}
                      src="/assets/icons/01.png"
                      alt=""
                    />
                    <img
                      className={styles.iconItem}
                      src="/assets/icons/02.png"
                      alt=""
                    />
                    <img
                      className={styles.iconItem}
                      src="/assets/icons/03.png"
                      alt=""
                    />
                    <img className={styles.iconItem} src="/assets/icons/04.png" alt="" />
                      <img
                      className={styles.iconItem}
                      src="/assets/icons/05.png"
                      alt=""
                    />
                    </div>
             </div> 
            {/* end */}
          </div>
        </div>
  
        <div className={`${styles.productDetailBottom}`}>
          <div className={styles.pdbMoreHeading}>
            <div className={styles.pdbHeadingMore}>You may also lik<span className={styles.thiscolor}>e this</span></div>
            <div className={styles.pdbCircle}></div>
          </div>
  
          <div className={styles.productMore}>
            <MoreProductSlider prodCat={productDetail?.category?.category_name} />
          </div>
        </div>
      </div>
    );
  }

  
};

export default page;

