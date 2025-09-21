"use client"
import React from "react";
import Navbar from "../components/landingPage/Navbar";
import Hero from "../components/landingPage/Hero";
import Products from "../components/landingPage/Products";
import FeaturedProducts from "../components/landingPage/FeaturedProducts";
import Banner from "../components/landingPage/Banner";
import Subscribe from "../components/landingPage/Subscribe";
import Footer from "../components/landingPage/Footer";


const LandingPage = (): React.ReactElement => {

  return (
    <div
      className="flex-grow overflow-hidden flex flex-col"
    >
      {/* navbar */}
      <Navbar />

      {/* hero section */}
      <Hero />

      {/* products */}
      <Products />

      {/* featured products */}
      <FeaturedProducts />

      {/* banner */}
      <Banner />

      {/* subscribe */}
      <Subscribe />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;