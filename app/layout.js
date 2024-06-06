"use client";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import WhatsappButton from "@/components/WhatsApp";
import { CurrencyProvider } from "@/context/Currency";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          <WishlistProvider>
            <CartProvider>
              <CheckoutProvider>
                <Navbar />  
                <WhatsappButton mobileNumber={"+919082803080"} />
                {children}
                <GoogleAnalytics gaId="G-7HY3FZE7ER" />
                <Footer />
              </CheckoutProvider>
            </CartProvider>
          </WishlistProvider>
        </CurrencyProvider>
      </body>
    </html>
    </Provider>
  );
}
