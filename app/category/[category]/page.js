"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductAPI from "@/apis/ProductAPI";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import { FiChevronDown } from "react-icons/fi";
import BannerSlider from "@/components/BannerSlider/BannerSlider";
import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  const category = params.category;
  const HeroData = {
    Rings: [
      {
        id: 1,
        caption:
          "Discover timeless elegance with our exquisite ring collection.",
        heading: "Rings",
        para: "",
        link: "/",
        imgm: "01ring-m.jpg",
        img: "01ring.jpg",
      },
      {
        id: 3,
        caption: "Elevate your style with our captivating pendant designs.",
        heading: "Pendants",
        para: "",
        link: "/",
        imgm: "03Pendants-m.jpg",
        img: "03Pendants.jpg",
      },
      {
        id: 2,
        caption:
          "Adorn your wrists with our handcrafted bracelet masterpieces.",
        heading: "Bracelets",
        para: "",
        link: "/",
        imgm: "04Bracelets-m.jpg", 
        img: "04Bracelets.jpg", 
      },
      {
        id: 4,
        caption: "Dazzle with our curated selection of stunning earrings.",
        heading: "Earrings",
        para: "",
        link: "/",
        imgm: "02Earrings-m.jpg",
        img: "02Earrings.jpg",
      },
    ],
    Earrings: [
      {
        id: 4,
        caption: "Dazzle with our curated selection of stunning earrings.",
        heading: "Earrings",
        para: "",
        link: "/",
        imgm: "02Earrings-m.jpg",
        img: "02Earrings.jpg",
      },
      {
        id: 2,
        caption:
          "Adorn your wrists with our handcrafted bracelet masterpieces.",
        heading: "Bracelets",
        para: "",
        link: "/",
        imgm: "04Bracelets-m.jpg",
        img: "04Bracelets.jpg",
      },
      {
        id: 1,
        caption:
          "Discover timeless elegance with our exquisite ring collection.",
        heading: "Rings",
        para: "",
        link: "/",
        imgm: "01ring-m.jpg",
        img: "01ring.jpg",
      },
      {
        id: 3,
        caption: "Elevate your style with our captivating pendant designs.",
        heading: "Pendants",
        para: "",
        link: "/",
        imgm: "03pendants-m.jpg",
        img: "03pendants.jpg",
      },
    ],
    Bracelets: [
      {
        id: 2,
        caption:
          "Adorn your wrists with our handcrafted bracelet masterpieces.",
        heading: "Bracelets",
        para: "",
        link: "/",
        imgm: "04Bracelets-m.jpg",
        img: "04Bracelets.jpg",
      },
      {
        id: 1,
        caption:
          "Discover timeless elegance with our exquisite ring collection.",
        heading: "Rings",
        para: "",
        link: "/",
        imgm: "01ring-m.jpg",
        img: "01ring.jpg",
      },
      {
        id: 4,
        caption: "Dazzle with our curated selection of stunning earrings.",
        heading: "Earrings",
        para: "",
        link: "/",
        imgm: "02Earrings-m.jpg",
        img: "02Earrings.jpg",
      },
      {
        id: 3,
        caption: "Elevate your style with our captivating pendant designs.",
        heading: "Pendants",
        para: "",
        link: "/",
        imgm: "03Pendants-m.jpg",
        img: "03Pendants.jpg",
      },
    ],
    Pendants: [
      {
        id: 3,
        caption: "Elevate your style with our captivating pendant designs.",
        heading: "Pendants",
        para: "",
        link: "/",
        imgm: "03Pendants-m.jpg",
        img: "03Pendants.jpg",
      },
      {
        id: 2,
        caption:
          "Adorn your wrists with our handcrafted bracelet masterpieces.",
        heading: "Bracelets",
        para: "",
        link: "/",
        imgm: "04Bracelets-m.jpg",
        img: "04Bracelets.jpg",
      },
      {
        id: 1,
        caption:
          "Discover timeless elegance with our exquisite ring collection.",
        heading: "Rings",
        para: "",
        link: "/",
        imgm: "01ring-m.jpg",
        img: "01ring.jpg",
      },
      {
        id: 4,
        caption: "Dazzle with our curated selection of stunning earrings.",
        heading: "Earrings",
        para: "",
        link: "/",
        imgm: "02Earrings-m.jpg",
        img: "02Earrings.jpg",
      },
    ],
    Mens: [
      {
        id: 4,
        caption: "Style with Our Exquisite Men's Jewellery Collection.",
        heading: "Men's Collection",
        para: "",
        link: "/",
        imgm: "03_Bracelets-M-m.jpg",
        img: "03_Bracelets-M.jpg",
      },
      {
        id: 3,
        caption: "Elevate your style with our captivating pendant designs.",
        heading: "Pendants",
        para: "",
        link: "/",
        imgm: "03Pendants-m.jpg",
        img: "03Pendants.jpg",
      },
      {
        id: 2,
        caption:
          "Adorn your wrists with our handcrafted bracelet masterpieces.",
        heading: "Bracelets",
        para: "",
        link: "/",
        imgm: "04Bracelets-m.jpg",
        img: "04Bracelets.jpg",
      },
      {
        id: 1,
        caption:
          "Discover timeless elegance with our exquisite ring collection.",
        heading: "Rings",
        para: "",
        link: "/",
        imgm: "01ring-m.jpg",
        img: "01ring.jpg",
      },
    ],
  };
  const [showPriceList, setShowPriceList] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = () => {
    let filteredProducts = products;

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split(" - ");
      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = parseFloat(product.price);
        return (
          productPrice >= parseFloat(minPrice) &&
          productPrice <= parseFloat(maxPrice)
        );
      });
    }

    setFilteredProducts(filteredProducts);
  };

  const priceRanges = [
    "50000 - 75000",
    "75001 - 100000",
    "100001 - 200000",
    "200001 - 500000",
    "500001 - 1000000",
    "Reset",
  ];

  const categories = ["All", "Ring", "Earrings", "Pendants", "Bracelets"];

  const handlePriceRangeClick = (range) => {
    if (range === "Reset") {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(range);
    }
    setShowPriceList(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, status } = await axios.get(
          "https://diamour-backend-7mz7m.ondigitalocean.app/core/productsUnOp"
        );
        // console.log(data);
        if (status === 200) {
          setProducts(data);
          setFilteredProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedPriceRange]);

  useEffect(() => {
    const filterCategory = () => {
      let filtered = [];
      if (category.toLowerCase() === "rings") {
        filtered = products.filter(
          (product) => product.category.category_name === "Rings"
        );
      } else if (category.toLowerCase() === "earrings") {
        filtered = products.filter(
          (product) => product.category.category_name === "Earrings"
        );
      } else if (category.toLowerCase() === "pendants") {
        filtered = products.filter(
          (product) => product.category.category_name === "Pendants"
        );
      } else if (category.toLowerCase() === "bracelets") {
        filtered = products.filter(
          (product) => product.category.category_name === "Bracelets"
        );
      } else if (category.toLowerCase() === "mens") {
        filtered = products.filter(
          (product) => product.category.category_name === "MENs"
        );
      }
      setFilteredProducts(filtered);
    };
    filterCategory();
  }, [products]);

  return (
    <div className={styles.product}>
      {category.toLowerCase() === "rings" && (
        <BannerSlider BannerData={HeroData.Rings} />
      )}
      {category.toLowerCase() === "earrings" && (
        <BannerSlider BannerData={HeroData.Earrings} />
      )}
      {category.toLowerCase() === "pendants" && (
        <BannerSlider BannerData={HeroData.Pendants} />
      )}
      {category.toLowerCase() === "bracelets" && (
        <BannerSlider BannerData={HeroData.Bracelets} />
      )}
      {category.toLowerCase() === "mens" && (
        <BannerSlider BannerData={HeroData.Mens} />
      )}

      <div className={styles.productFilter}>
        <div className={styles.filterByPrice}>
          <div
            className={styles.fBPHeading}
            onClick={() => setShowPriceList(!showPriceList)}
          >
            {selectedPriceRange ? selectedPriceRange : "Price"}{" "}
            <FiChevronDown />
          </div>
          {showPriceList && (
            <div className={styles.fBPList}>
              {priceRanges.map((range) => (
                <div key={range} onClick={() => handlePriceRangeClick(range)}>
                  {range}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.productWrap}>
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* <div className={styles.productExtra}>
        <div className={styles.number}>Showing {filteredProducts.length} of 131 rings</div>
        <div className={styles.loadBtn}>Load more</div>
      </div> */}
    </div>
  );
};

export default page;
