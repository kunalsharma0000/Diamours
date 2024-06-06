import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <img src="/assets/img/logobig.png" alt="" />
      </div>
      <div className={styles.footerMiddle}>
        <div className={styles.fmLeft}>
          {/* <div className={styles.fmWrap}>
                        <div className={styles.fmwHeading}>Categories</div>
                        <div className={styles.fmwText}>
                            <Link href='#' className={styles.fmwtPara}>Rings</Link>
                            <Link href='#' className={styles.fmwtPara}>Necklace</Link>
                            <Link href='#' className={styles.fmwtPara}>Ear Rings</Link>
                            <Link href='#' className={styles.fmwtPara}>Women</Link>
                            <Link href='#' className={styles.fmwtPara}>Men</Link>
                            <Link href='#' className={styles.fmwtPara}>Children</Link>
                            <Link href='#' className={styles.fmwtPara}>Watches</Link>
                        </div>
                    </div>
                    <div className={styles.fmWrap}>
                        <div className={styles.fmwHeading}>Services</div>
                        <div className={styles.fmwText}>
                            <Link href='#' className={styles.fmwtPara}>Custom jewels</Link>
                            <Link href='#' className={styles.fmwtPara}>Repair</Link>
                            <Link href='#' className={styles.fmwtPara}>Purity Check</Link>
                        </div>
                    </div>
                    <div className={styles.fmWrap}>
                        <div className={styles.fmwHeading}>Utlis</div>
                        <div className={styles.fmwText}>
                            <Link href='#' className={styles.fmwtPara}>Location</Link>
                            <Link href='#' className={styles.fmwtPara}>Contact Us</Link>
                            <Link href='#' className={styles.fmwtPara}>Support</Link>
                            <Link href='#' className={styles.fmwtPara}>FAQs</Link>
                            <Link href='#' className={styles.fmwtPara}>Blogs</Link>
                        </div>
                    </div> */}
          <div className={styles.fmWrap}>
            <div className={styles.fmwHeading}>Links</div>
            <div className={styles.fmwText}>
              <Link href="/" className={styles.fmwtPara}>
                Home
              </Link>
              <Link href="/about" className={styles.fmwtPara}>
                About
              </Link>
              <Link href="/category" className={styles.fmwtPara}>
                Categories
              </Link>
              <Link href="/products" className={styles.fmwtPara}>
                Products
              </Link>
              <Link href="/sizing" className={styles.fmwtPara}>
                How to find your Diamour Ring Size?
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.fmWrap}>
          <div className={styles.fmwHeading}>Categories</div>
          <div className={`${styles.fmWrap} ${styles.fmmWrap}`}>
            <div className={styles.fmwText}>
              <Link href="/category/rings" className={styles.fmwtPara}>
                Rings
              </Link>
              <Link href="/category/earrings" className={styles.fmwtPara}>
                Earrings
              </Link>
              <Link href="/category/pendants" className={styles.fmwtPara}>
                Pendants
              </Link>
              <Link href="/category/bracelets" className={styles.fmwtPara}>
                Bracelets
              </Link>
              <Link href="/category/mens" className={styles.fmwtPara}>
                Men's
              </Link>
              {/* <Link href='#' className={styles.fmwtPara}>Cookies</Link> */}
            </div>
          </div>
        </div>
        <div className={styles.fmWrap}>
          <div className={styles.fmwHeading}>Our Policy</div>
          <div className={`${styles.fmWrap} ${styles.fmmWrap}`}>
            <div className={styles.fmwText}>
              <Link href="/terms" className={styles.fmwtPara}>
                Return and Refund Policy
              </Link>
              <Link href="/privacy" className={styles.fmwtPara}>
                Privacy Policy
              </Link>
              <Link href="/shipping" className={styles.fmwtPara}>
                Shipping Policy
              </Link>
              <Link href="/customer" className={styles.fmwtPara}>
              Customer Services
              </Link>
              {/* <Link href='#' className={styles.fmwtPara}>Cookies</Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.fbLeft}>
          Copyright &copy; 2023 Diamour. All Right Reserved
        </div>
        <div className={styles.fbRight}>
          <a href="https://www.facebook.com/profile.php?id=61554101997304&is_tour_dismissed=true">
            <img src="/assets/img/fb.png" alt="" />
          </a>
          <a href="https://instagram.com/the_diamour?igshid=NGVhN2U2NjQ0Yg==">
            <img src="/assets/img/ints.png" alt="" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=919082803080">
            <img src="/assets/img/wapp.png" alt="" />
          </a>
        
        </div>
       
      </div>
     
      <div className="Compnay" style={{float:'right',display:'flex',justifyContent:"center" }}>
      <p className="company-address">
          Bharat Diamond Bourse, BKC, Bandra (East), Mumbai, Maharashtra - 400051
          </p>
      </div>
    </div>
    
  );
};

export default Footer;
