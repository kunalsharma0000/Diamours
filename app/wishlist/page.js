'use client'

import React from 'react'
import styles from '../cart/page.module.css'
import WishCard from '@/components/WishCard/WishCard';
import { useWishlistContext } from '@/context/WishlistContext';

function Wishlist() {
    const { getWishlist } = useWishlistContext();
    const wishlist = getWishlist()
    console.log(wishlist)
  return (
    <main className={styles.cart}>
         <div className={styles.cartHeading}>
                <div className={styles.chLeft}>Your Wishlist</div>
                <div className={styles.chRight}></div>
            </div>
         <div className={styles.pad}>
             {wishlist.length === 0 ? (
                 <div className={styles.emptyWishlist}>Your wishlist is empty.</div>
             ) : (
                 wishlist.map((item, index) => (
                     <WishCard key={index} item={item} />
                 ))
             )}
         </div>
    
    </main>
  )
}

export default Wishlist