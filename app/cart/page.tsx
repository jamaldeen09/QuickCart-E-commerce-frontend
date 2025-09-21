"use client"
import React from "react";
import Cart from "./Cart";
import ProfileModal from "../components/reusable/profileModal/ProfileModal";
import ProductsProvider from "../providers/ProductsProvider";


const page = (): React.ReactElement => {
    return (
        <>
            <ProductsProvider>
                {/* cart component */}
                <Cart />
                {/* profile modal */}
                <ProfileModal />
            </ProductsProvider>
        </>
    );
};

export default page;