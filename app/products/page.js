"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductAPI from "@/apis/ProductAPI";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import ProductData from "@/utils/ProductData";
import { FiChevronDown } from "react-icons/fi";

const page = () => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showPriceList, setShowPriceList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = () => {
    let filteredProducts = products;

    if (selectedCategory !== "All") {
      
      filteredProducts = filteredProducts.filter(
        (product) => product.category.category_name === selectedCategory
        
      );
      console.log(product)
    }

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

  const categories = ["All", "Ring", "Earrings", "Pendants", "Bracelets", "MENs"];

  const handlePriceRangeClick = (range) => {
    if (range === "Reset") {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(range);
    }
    setShowPriceList(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All" ? "All" : category);
    setShowCategoryList(false);
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
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPriceRange, products]);

  return (
    <div className={styles.product}>
      <div className={styles.productHero}>
        {/* <div className={styles.productHeading}>Rings</div> */}
      </div>

      <div className={styles.productFilter}>
        <div className={styles.filterByCategory}>
          <div
            className={styles.fBCHeading}
            onClick={() => setShowCategoryList(!showCategoryList)}
          >
            {selectedCategory === "All" ? "Category" : selectedCategory}{" "}
            <FiChevronDown />
          </div>
          {showCategoryList && (
            <div className={styles.fBCList}>
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

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

      <div className={styles.productContainer}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.productWrap}>
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      </div>

    </div>
  );
};

export default page;
