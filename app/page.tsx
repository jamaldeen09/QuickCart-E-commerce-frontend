"use client"
import React from "react";
import LandingPage from "./pages/LandingPage";
import ProfileModal from "./components/reusable/profileModal/ProfileModal";
import AuthModal from "./components/reusable/AuthModal";
import ProductsProvider from "./providers/ProductsProvider";

const page = (): React.ReactElement => {
  return (
    <ProductsProvider>
      {/* auth modal */}
      <AuthModal />

      {/* profile modal */}
      <ProfileModal />

      {/* landing page */}
      <LandingPage />
    </ProductsProvider>
  );
};

export default page;