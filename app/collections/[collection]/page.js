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


import { useSelector } from 'react-redux';






// const { currency, changeCurrency } = useCurrencyContext();



const page = () => {
  const currencyRate = useSelector(state => state.currencyRate.rate);
  const params = useParams();
  const category = params.collection;
  const HeroData = {
    floral: [
      {
        id: 1,
        caption:
          "Explore the Blossom Floral Collection",
        heading: "Floral Collection",
        para: "",
        link: "/collections/floral",
        img: "FloaraBanner.jpg",
      },
      {
        id: 2,
        caption:
          "Fluid grace of aqua in stunning jwellery",
        heading: "Water Collection",
        para: "",
        link: "/collections/water",
        img: "WaterBanner.jpg",
      },
    ],
    water: [
      {
        id: 1,
        caption:
          "Fluid grace of aqua in stunning jwellery",
        heading: "Water Collection",
        para: "",
        link: "/collections/water",
        img: "WaterBanner.jpg",
      },
      {
        id: 2,
        caption:
          "Explore the Blossom Floral Collection",
        heading: "Floral Collection",
        para: "",
        link: "/collections/floral",
        img: "FloaraBanner.jpg",
      },
    ],
  
  };
  const [showPriceList, setShowPriceList] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const { currency, changeCurrency } = useCurrencyContext();

  // const rate = currency;

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

  // filterProducts();

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
        const { data, status } = await axios.get(ProductAPI.ALL_PRODUCT);
        // console.log(data);
        if (status === 200) {
          setProducts(data);
          setFilteredProducts(data);
          setLoading(false);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchProducts();
    filterProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedPriceRange]);

  useEffect(() => {
    const filterCategory = () => {
      let filtered = [];
      if (category.toLowerCase() === "floral") {
        filtered = products.filter(
          (product) => product?.collection?.collection_name === "Floral"
        );
      } else if (category.toLowerCase() === "water") {
        filtered = products.filter(
          (product) => product?.collection?.collection_name === "Water"
        );
      }
      setFilteredProducts(filtered);
    };
    filterCategory();
  }, [products]);
  

  

  return (
    <div className={styles.product}>
      {category.toLowerCase() === "floral" && (
        <BannerSlider BannerData={HeroData.floral} />
      )}
      {category.toLowerCase() === "water" && (
        <BannerSlider BannerData={HeroData.water} />
      )}

      <div className={styles.productFilter}>
        <div className={styles.filterByPrice}>
          <div
            className={styles.fBPHeading}
            onClick={() => setShowPriceList(!showPriceList)}
          >
            {selectedPriceRange ? "Price "+ String(selectedPriceRange) : "Price "}
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

      <div className={styles.productContainer}>
      {loading ? (
        <Loader />
      ) : (
        filteredProducts.length > 0 ? (
                  <div className={styles.productWrap}>
                    {filteredProducts?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
        ): 
        (
                  <div className={styles.productWrap}>
                    {products?.map((product) => (
                      
                      // console.log(product),
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
        )
      )}
      </div>
    </div>
  );
};

export default page;
