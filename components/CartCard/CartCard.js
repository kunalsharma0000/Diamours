import React from "react";
import styles from "./CartCard.module.css";
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { BiMenuAltRight, BiHeart } from "react-icons/bi";
const CartCard = ({ item }) => {
  const { addToWishlist } = useWishlistContext();
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartContext();
  return (
    // <div className={styles.cartCard}>
    //     <div className={styles.ccImg}>
    //         <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.main_image}`} alt="" />
    //     </div>
    //     <div className={styles.ccText}>
    //         <div className={styles.cctName}>{product.title}</div>
    //         <div className={styles.cctPrice}>₹ {product.price}</div>
    //         <div className={styles.cctNumber}>
    //             <div className={styles.cctnbtn} onClick={() => decreaseQuantity(product.id)}>-</div>
    //             <div className={styles.cctnNumber}>{quantity}</div>
    //             <div className={styles.cctnbtn} onClick={() => increaseQuantity(product.id)}>+</div>
    //         </div>
    //         <div className={styles.cctDel} onClick={() => removeFromCart(product.id)}>
    //             <img src="/assets/img/del.png" alt="" /> Remove
    //         </div>
    //     </div>
    // </div>

    <div className={styles.cartCard}>
      <div className={styles.ccImg}>
        <img src={item.product.main_image} alt="" />
      </div>
      <div className={styles.ccText}>
        <div className={styles.cctName}>{item.product.title}</div>
        <div className={styles.cctPrice}>₹ {item.product.price}</div>
        <div className={styles.cctExtra}>
          <div className={styles.ccteMore}>Colour : {item.selectedColor}</div>
          <div className={styles.ccteMore}>Size : {item.selectedSize}</div>
        </div>
        <div className={styles.cctNumber}>
          <div
            className={styles.cctnbtn}
            onClick={() =>
              item.quantity === 1
                ? removeFromCart(
                    item.product.id,
                    item.selectedColor,
                    item.selectedSize
                  )
                : decreaseQuantity(
                    item.product.id,
                    item.selectedColor,
                    item.selectedSize
                  )
            }
          >
            -
          </div>
          <div className={styles.cctnNumber}>{item.quantity}</div>
          <div
            className={styles.cctnbtn}
            onClick={() =>
              increaseQuantity(
                item.product.id,
                item.selectedColor,
                item.selectedSize
              )
            }
          >
            +
          </div>
        </div>
        <div className={styles.cctDel} onClick={() => addToWishlist(item)}>
          <BiHeart /> Add to Wishlist
        </div>
      </div>
    </div>
  );
};

export default CartCard;
