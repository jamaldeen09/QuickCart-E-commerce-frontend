"use client"
import React from "react";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import { useAppSelector } from "../redux/reduxTypes";
import ProductsProvider from "../providers/ProductsProvider";
import ProductCard from "../components/reusable/ProductCard";
import { Types } from "mongoose";
import AuthModal from "../components/reusable/AuthModal";
import ProfileModal from "../components/reusable/profileModal/ProfileModal";
import ShopSkeletonLoader from "./ShopSkeletonLoader";
import { ConfiguredProduct } from "../redux/data/productSlice";

const page = (): React.ReactElement => {
  const { products } = useAppSelector((state) => state.products);
  const { likedProducts, fetching, _id } = useAppSelector((state) => state.profileInformation)

  const determineLikedState = (
    id: string | Types.ObjectId
  ): boolean => {
    const productBeingLiked = products.find((product) => product._id === id);
    if (!productBeingLiked) return false;

    // check if this product exists in the users likes
    return likedProducts.some((product) => product._id === productBeingLiked._id);
  }
  const determineCreator = (product: ConfiguredProduct): boolean => {
    if (!_id || !product?.createdBy?._id) {
      return false;
    }
    return product.createdBy._id === _id;
  }
  return (
    <ProductsProvider>
      <AuthModal />
      <ProfileModal />
      <div className="flex-grow">
        <Navbar />
        {fetching && products.length <= 0 ? (
          <ShopSkeletonLoader />
        ) : <div className="w-full px-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-start">
            <div className="flex flex-col items-end pt-12">
              <p className="text-2xl font-medium">All products</p>
              <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
              {products.map((product) => <ProductCard
                isCreator={determineCreator(product)}
                key={product._id as string}
                product={product}
                isLiked={determineLikedState(product._id)}
                id={product._id as string}
              />
              )}
            </div>
          </div>
        </div>}
        <Footer />
      </div>
    </ProductsProvider>
  );
};

export default page;