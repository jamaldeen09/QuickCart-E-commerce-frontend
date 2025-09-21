import React from "react";
import SingleProductPage from "./SingleProductPage";
import AuthModal from "../components/reusable/AuthModal";
import ProfileModal from "../components/reusable/profileModal/ProfileModal";
import ProductsProvider from "../providers/ProductsProvider";

const page = (): React.ReactElement => {
    return (
        <>
            <ProductsProvider>
                <SingleProductPage />
                {/* auth modal */}
                <AuthModal />
                {/* profile modal */}
                <ProfileModal />
            </ProductsProvider>
        </>
    );
};

export default page;