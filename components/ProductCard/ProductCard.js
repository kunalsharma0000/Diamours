import React from "react";
import styles from "./ProductCard.module.module.css";
import Link from "next/link";
import { useWishlistContext } from "@/context/WishlistContext";
import { BiHeart } from "react-icons/bi";
import { useSelector } from 'react-redux';






const ProductCard = ({ product }) => {
  const currencyRate = useSelector(state => state.currencyRate.rate);
  const currency = useSelector(state => state.currencyRate.currency);
  
  const { addToWishlist } = useWishlistContext();
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  return (
    <div className={styles.productCard}>

      
      <button
        onClick={() => {
          addToWishlist(product);
          alert("Item Added to Wishlist!");
        }}
        className={styles.productBag}
      >
        <BiHeart />
      </button>


      <Link href={`/products/${product.slug}`}>
        <div className={styles.productImg}>
          <img src={product.main_image} alt="" />
        </div>
        <Link href={`/products/${product.slug}`} className={styles.productText}>
          <div className={styles.ptName}>{product.title}</div>
          <div className={styles.ptPrice}>{currency} {(product.price*currencyRate).toFixed(2)} </div>
        </Link>
      </Link>
    </div>
  );
};

{
  /* <Link href={`/products/${product.prodSlug}`} className={styles.productText}>
    <div className={styles.productCard}>
      <div className={styles.productBag}>
        <img src="/assets/img/cart.png" alt="" />
      </div>
      <div className={styles.productImg}>
        <img src={`/assets/product_images/${product.prodImage}`} alt="" />
      </div>
        <div className={styles.ptName}>{product.prodName}</div>
        <div className={styles.ptPrice}>₹ {product.prodPrice}</div>

    </div>
    </Link> */
}

export default ProductCard;
