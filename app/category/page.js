"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import BannerSlider from "@/components/BannerSlider/BannerSlider";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
// import ProductData from "@/utils/ProductData";
import ProductAPI from "@/apis/ProductAPI";
import axios from "axios";

const page = () => {
  const BannerData = [
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 4,
      caption: "Dazzle with our curated selection of stunning earrings.",
      heading: "Earrings",
      para: "",
      link: "/category/earrings",
      imgm: "02Earrings-m.jpg",
      img: "02Earrings.jpg",
    },
  ];
  const BannerData2 = [
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
    {
      id: 4,
      caption: "Dazzle with our curated selection of stunning earrings.",
      heading: "Earrings",
      para: "",
      link: "/category/earrings",
      imgm: "02Earrings-m.jpg",
      img: "02Earrings.jpg",
    },
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
  ];
  const BannerData3 = [
    {
      id: 4,
      caption: "Dazzle with our curated selection of stunning earrings.",
      heading: "Earrings",
      para: "",
      link: "/category/earrings",
      imgm: "02Earrings-m.jpg",
      img: "02Earrings.jpg",
    },
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
  ];
  const BannerData4 = [
    {
      id: 4,
      caption: "Style with Our Exquisite Men's Jewellery Collection.",
      heading: "Men's Collection",
      para: "",
      link: "/category/mens",
      imgm: "03_Bracelets-M-m.jpg",
      img: "03_Bracelets-M.jpg",
    },
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
  ];
  const BannerData5 = [
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
    {
      id: 4,
      caption: "Style with Our Exquisite Men's Jewellery Collection.",
      heading: "Men's Collection",
      para: "",
      link: "/category/mens",
      imgm: "03_Bracelets-M-m.jpg",
      img: "03_Bracelets-M.jpg",
    },
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
  ];
  const BannerData6 = [
    {
      id: 2,
      caption: "Adorn your wrists with our handcrafted bracelet masterpieces.",
      heading: "Bracelets",
      para: "",
      link: "/category/bracelets",
      imgm: "04Bracelets-m.jpg",
      img: "04Bracelets.jpg",
    },
    {
      id: 3,
      caption: "Elevate your style with our captivating pendant designs.",
      heading: "Pendants",
      para: "",
      link: "/category/pendants",
      imgm: "03Pendants-m.jpg",
      img: "03Pendants.jpg",
    },
    {
      id: 4,
      caption: "Style with Our Exquisite Men's Jewellery Collection.",
      heading: "Men's Collection",
      para: "",
      link: "/category/mens",
      imgm: "03_Bracelets-M-m.jpg",
      img: "03_Bracelets-M.jpg",
    },
    {
      id: 1,
      caption: "Discover timeless elegance with our exquisite ring collection.",
      heading: "Rings",
      para: "",
      link: "/category/rings",
      imgm: "01ring-m.jpg",
      img: "01ring.jpg",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [rings, setRings] = useState([]);
  const [Earrings, setEarrings] = useState([]);
  const [Pendants, setPendants] = useState([]);
  const [Bracelets, setBracelets] = useState([]);
  const [Mens, setMens] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const { data, status } = await axios.get(
          "https://diamour-backend-7mz7m.ondigitalocean.app/core/productsUnOp"
        );
        // console.log(data);
        if (status === 200) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterRings = () => {
      const filtered = products.filter(
        (product) => product.category.category_name === "Rings"
      );
      
      setRings(filtered);
    };

    const filterEarrings = () => {
      const filtered = products.filter(
        (product) => product.category.category_name === "Earrings"
      );
      
      setEarrings(filtered);
    };

    const filterPendants = () => {
      const filtered = products.filter(
        (product) => product.category.category_name === "Pendants"
      );
      
      setPendants(filtered);
    };

    const filterBracelets = () => {
      const filtered = products.filter(
        (product) => product.category.category_name === "Bracelets"
      );
      
      setBracelets(filtered);
    };
    const filterMens = () => {
      const filtered = products.filter(
        (product) => product.category.category_name === "MENs"
      );
      
      setMens(filtered);
    };
    filterRings();
    filterEarrings();
    filterPendants();
    filterBracelets();
    filterMens();
  }, [products]);

  return (
    <div className={styles.category}>
      <div className={styles.section1}>
        <BannerSlider BannerData={BannerData} />
      </div>
      <div className={styles.section2}>
        <div className={styles.catHeading}>Rings</div>
        <ProductSlider category={"rings"} productData={rings.slice(0, 8)} />
      </div>
      <div className={styles.section1}>
        <BannerSlider BannerData={BannerData3} />
      </div>
      <div className={styles.section2}>
        <div className={styles.catHeading}>Earrings</div>
        <ProductSlider
          category={"earrings"}
          productData={Earrings.slice(0, 8)}
        />
      </div>
      <div className={styles.section1}>
        <BannerSlider BannerData={BannerData5} />
      </div>
      <div className={styles.section2}>
        <div className={styles.catHeading}>Pendants</div>
        <ProductSlider
          category={"pendants"}
          productData={Pendants.slice(0, 8)}
        />
      </div>
      <div className={styles.section1}>
        <BannerSlider BannerData={BannerData6} />
      </div>
      <div className={styles.section2}>
        <div className={styles.catHeading}>Bracelets</div>
        <ProductSlider
          category={"bracelets"}
          productData={Bracelets.slice(0, 8)}
        />
      </div>
      <div className={styles.section1}>
        <BannerSlider BannerData={BannerData4} />
      </div>
      <div className={styles.section2}>
        <div className={styles.catHeading}>Men's Collection</div>
        <ProductSlider category={"mens"} productData={Mens.slice(0, 8)} />
      </div>
    </div>
  );
};

export default page;