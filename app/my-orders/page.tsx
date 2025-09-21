"use client"
import React from "react";
import MyOrders from "./MyOrders";
import ProfileModal from "../components/reusable/profileModal/ProfileModal";
import ProductsProvider from "../providers/ProductsProvider";


const page = (): React.ReactElement => {

    return (
        <ProductsProvider>
            {/* my order component component */}
            <MyOrders />
            {/* profile modal */}
            <ProfileModal />
        </ProductsProvider>
    );
};

export default page;