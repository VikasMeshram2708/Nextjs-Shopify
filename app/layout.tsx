import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Shopify : Fashion & Electronics - Stylish Apparel, Cutting-edge Gadgets",
  description:
    "Shopify brings you the best of both worlds! Explore our diverse collection of stylish clothing and cutting-edge electronics. From trendy apparel that defines your style to the latest gadgets that enhance your digital lifestyle, Shopify has it all. Experience the perfect blend of fashion and technology with our curated selection. Elevate your wardrobe and tech arsenal today. Shop now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
