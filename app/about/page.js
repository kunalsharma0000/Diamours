import React from "react";
import styles from "./page.module.css";
import TeamCard from "@/components/TeamCard/TeamCard";

const page = () => {
  return (
    <div className={styles.about}>
      <div className={styles.aboutHero}>
        {/* <div className={styles.aboutHeroLeft}>
          <div className={styles.ahlText1}>We Craft</div>
          <div className={styles.ahlText1}>beautiful Jewellery</div>
        </div> */}
        <div className={styles.aboutHeroRight}>
          <img src="/about/aboutHero.jpg" alt="" className={styles.img1} />
          {/* <img src="/about/2.jpg" alt="" className={styles.img1} /> */}
        </div>
      </div>
      <div className={styles.aboutHistory}>
        <div className={styles.aboutHeading}>About Us</div>
        <div>
          <div className={styles.aboutPara}>
            For the past four generations, we have been dedicated to providing
            exceptional service to our clients in the B2B diamond industry,
            establishing ourselves as the absolute experts in delivering the
            highest quality natural diamonds. However, as the world of diamond
            technology has evolved over the years, so have the needs of the
            modern era. So with a dream of sharing our love for diamonds with a
            much broader audience, we are excited to announce our foray into the
            B2C business of creating beautiful lab-grown diamond jewellery that
            will last a lifetime. And we have named this dream 'Diamour.'
          </div>
          <div className={styles.aboutPara}>
            At Diamour, we believe that everyone should have access to the
            beauty and elegance of high-quality diamonds, and we are committed
            to bringing that vision to life. As a company with deep roots in the
            diamond industry, we understand the value of a diamond and the
            beautiful emotions it can evoke. Our lab-grown diamonds are created
            with the same precision and care as natural diamonds and offer the
            added benefits of being eco-friendly, highly pure, and affordable.
          </div>
          <div className={styles.aboutPara}>
            Our commitment to excellence in diamond quality remains at the
            forefront of our business. Our team of top-notch artists puts their
            passion and craftsmanship into creating stunning pieces of fine
            jewellery that showcase the unique beauty of our lab-grown diamonds.
            From engagement rings to earrings and pendants, each piece is
            handcrafted with meticulous attention to detail and quality. As a
            company that values <span className={styles.boldtext}>integrity, quality, creativity, and passion</span>, our
            goal is  <span className={styles.boldtext}> to provide you with a personalized shopping experience,
            ensuring that your diamond is not just an accessory for you but a
            unique expression of yourself.</span>
          </div>
        </div>
      </div>
      <div className={styles.aboutDiscover}>
        <div className={styles.aboutDiscoverLeft}>
          <div className={styles.adlText1}>Discover Timeless Elegance</div>
          <div className={styles.adlText2}>
            Your Affordable Destination for Exquisite Jewellery
          </div>
          <div className={styles.adlText3}>
            your one-stop destination for affordable and exquisite diamond
            Jewellery. We believe that every individual deserves to experience
            the timeless elegance and allure of diamonds without breaking the
            bank. Our passion lies in curating the finest selection of diamond
            Jewellery.
          </div>
        </div>
        <div className={styles.aboutDiscoverRight}>
          <img src="/about/3.jpeg" alt="" className={styles.adrBigImg} />
          {/* <img src="/about/4.jpg" alt="" className={styles.adrSmallImg} /> */}
        </div>
      </div>
      <div className={styles.aboutMission}>
        <div className={styles.aboutHeading}>Mission Statement</div>
        <div>
          <div className={styles.aboutPara}>
            <p>
              "Creating diamonds as a form of personal expression for
              individuals.
            </p>
            <p>Making diamonds accessible to everyone for everyday wear."</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutTeam}>
        <div className={styles.aboutTeamHeading}>
          <div className={styles.aboutHeadingTeam}>Our Team</div>
          <div className={styles.aboutCircle}></div>
        </div>

        <div className={styles.aboutTeamMain}>
          <div className={styles.aTMImage}>
            <img src="/assets/img/ceo.jpeg" alt="" />
          </div>
          <div className={styles.aTMText}>
            <div className={styles.aTMTHeading}>A note from our Founder</div>
            <div className={styles.aboutPara} style={{ color: "#01321F;" }}>
            Neekhesh Jhaveri, the visionary founder of The Diamour, represents the seamless fusion of tradition and innovation in the world of Jewellery. Hailing from a fourth-generation diamond business family, Neekhesh has inherited a deep-rooted passion for the diamond industry. Yet just not contended with merely inheriting tradition; he's on a mission to revolutionize it. With an educational background in product design, Neekhesh brings a fresh perspective to the world of Jewellery. His keen eye for aesthetics, coupled with his innovative spirit, drives him to craft Jewellery pieces that resonate with the modern generation. His approach is distinctly youth-centric, aiming to provide Jewellery that effortlessly blends with everyday life, reflecting the individuality and dynamism of the wearer.
            </div>
            <div className={styles.aboutPara} style={{ color: "#01321F;" }}>
Neekhesh's commitment to innovation is at the heart of The Diamour's success. He envisions and creates Jewellery that's not just beautiful but also innovative, creative, and in tune with contemporary trends. Through his leadership, The Diamour has become a beacon for those seeking Jewellery that's both timeless and modern, a reflection of Neekhesh's boundless passion and dedication to redefining the world of diamond Jewellery.
            </div>
            <div className={styles.aTMTBottom}>
              <div className={styles.aTMTBName}>Mr. Neekhesh Jhaveri</div>
              <div className={styles.aTMTBDesg}>Co-Founder, CEO</div>
            </div>
          </div>
        </div>

        <div className={styles.aboutTeamWrap}>
          <TeamCard img="f1.png" name="Mr. Jinesh Jhaveri" desg="Co-Founder" />
          <TeamCard img="f2.png" name="Mrs. Sonali Jhaveri" desg="Co-Founder" />
        </div>
      </div>
    </div>
  );
};

export default page;
