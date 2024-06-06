import React from "react";
import styles from "../CartCard/CartCard.module.css";
import { useWishlistContext } from "@/context/WishlistContext";
const WishCard = ({ item }) => {
  const { removeFromWishlist } = useWishlistContext();
  console.log(item);
  return (
    <div className={styles.cartCard}>
      <div className={styles.ccImg}>
        <img src={item.main_image} alt="" />
      </div>
      <div className={styles.ccText}>
        <div className={styles.cctName}>{item.title}</div>
        <div className={styles.cctPrice}>₹ {item.price}</div>
        <div className={styles.cctDel} onClick={() => removeFromWishlist(item)}>
          <img src="/assets/img/del.png" alt="" /> Remove
        </div>
      </div>
    </div>
  );
};

export default WishCard;
