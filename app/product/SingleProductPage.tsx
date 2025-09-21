"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductSystem } from "../api/product";
import { changeSingleProduct, ConfiguredProduct } from "../redux/data/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import Navbar from "../components/landingPage/Navbar";
import Image from "next/image";
import { assets } from "../assets/assets";
import Footer from "../components/landingPage/Footer";
import { PopulatedCart } from "../../../server/src/types/productTypes";
import { updateCart } from "../redux/data/profileSlice";
import { callToast } from "../utils/authHandlers";
import LoadingSpinner from "../components/reusable/LoadingSpinner";
import ProductPageSkeleton from "../components/reusable/ProductPageSkeleton";
import ProductCard from "../components/reusable/ProductCard";
import { Types } from "mongoose";

const SingleProductPage = (): React.ReactElement => {
    const searchParams = useSearchParams();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const singleProduct = useAppSelector((selector) => selector.products.singleProduct);
    const { _id, fullname, email } = useAppSelector((selector) => selector.profileInformation);
    const { likedProducts } = useAppSelector((state) => state.profileInformation);

    const productId = searchParams.get("id") || ""
    const dispatch = useAppDispatch();
    const getSingleProduct = (product: ConfiguredProduct) => {
        dispatch(changeSingleProduct(product));
    }
    const [mainImage, setMainImage] = useState<string>("");
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isBuying, setIsBuying] = useState<boolean>(false);
    const { products } = useAppSelector((selector) => selector.products);
    const router = useRouter();

    const fetchProduct = async () => {
        await ProductSystem.getSingleProduct(productId as string, getSingleProduct, setIsFetching);
    }

    const updateClientsCart = (data: PopulatedCart) => {
        dispatch(updateCart(data));
    }

    const determineLikedState = (
        id: string | Types.ObjectId
    ): boolean => {
        const productBeingLiked = products.find((product) => product._id === id);
        if (!productBeingLiked) return false;

        // check if this product exists in the users likes
        return likedProducts.some((product) => product._id === productBeingLiked._id);
    }


    useEffect(() => {
        if (productId) {
            fetchProduct();
        } else { return }
    }, [productId]);


    return (
        <div>
            <Navbar />
            <div className="flex-grow ">
                {isFetching ? (
                    <ProductPageSkeleton />
                ) :
                    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="px-5 lg:px-16 xl:px-20">
                                <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                                    <Image
                                        src={mainImage || (singleProduct?.image[0] || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=")}
                                        alt={`${singleProduct?.name}'s details`}
                                        className="w-full h-auto object-cover mix-blend-multiply"
                                        unoptimized
                                        width={1280}
                                        height={720}
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {singleProduct?.image.map((image, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setMainImage(image)}
                                            className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                        >
                                            <Image
                                                src={image}
                                                alt="alt"
                                                className="w-full h-auto object-cover mix-blend-multiply"
                                                width={1280}
                                                height={720}
                                                unoptimized
                                            />
                                        </div>

                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                                    {singleProduct?.name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" unoptimized />
                                        <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" unoptimized />
                                        <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" unoptimized />
                                        <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" unoptimized />
                                        <Image
                                            className="h-4 w-4"
                                            src={assets.star_dull_icon}
                                            alt="star_dull_icon"
                                            unoptimized
                                        />
                                    </div>
                                    <p>(4.5)</p>
                                </div>
                                <p className="text-gray-600 mt-3">
                                    {singleProduct?.description}
                                </p>
                                <p className="text-3xl font-medium mt-6">
                                    ${singleProduct?.offerPrice}
                                    <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                                        ${singleProduct?.price}
                                    </span>
                                </p>
                                <hr className="bg-gray-600 my-6" />
                                <div className="overflow-x-auto">
                                    <table className="table-auto border-collapse w-full max-w-72">
                                        <tbody>
                                            <tr>
                                                <td className="text-gray-600 font-medium">Brand</td>
                                                <td className="text-gray-800/50 ">Generic</td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-medium">Color</td>
                                                <td className="text-gray-800/50 ">Multi</td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-600 font-medium">Category</td>
                                                <td className="text-gray-800/50">
                                                    {singleProduct?.category}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {singleProduct?.createdBy._id !== _id && (
                                    <div className="flex items-center mt-10 gap-4">
                                        <button
                                            disabled={isAdding}
                                            onClick={() => {
                                                if (
                                                    (!_id || _id.trim() === "") ||
                                                    (!fullname || fullname.trim()) === "" ||
                                                    (!email || email.activeEmail.trim() === "")
                                                ) {
                                                    return callToast("error", "Sign in to add this product to your cart");
                                                } else {
                                                    return ProductSystem.addItemToCart(
                                                        singleProduct?._id as string,
                                                        setIsBuying,
                                                        updateClientsCart,
                                                        "adding",
                                                        router,
                                                        setIsAdding,
                                                    )
                                                }
                                            }}
                                            className={`${isAdding ? "brightness-75 cursor-not-allowed" : "hover:bg-gray-200 bg-gray-100 cursor-pointer"} w-full py-3.5  text-gray-800/80 transition`}
                                        >
                                            {isAdding ? (
                                                <LoadingSpinner size="custom" />
                                            ) : "Add to Cart"}
                                        </button>
                                        <button
                                            disabled={isBuying}
                                            onClick={() => {
                                                if (
                                                    (!_id || _id.trim() === "") ||
                                                    (!fullname || fullname.trim()) === "" ||
                                                    (!email || email.activeEmail.trim() === "")
                                                ) {
                                                    return callToast("error", "Sign in to buy this product");
                                                } else {
                                                    return ProductSystem.addItemToCart(
                                                        singleProduct?._id as string,
                                                        setIsBuying,
                                                        updateClientsCart,
                                                        "buying",
                                                        router,
                                                        setIsAdding,
                                                    )
                                                }
                                            }}
                                            className={`w-full py-3.5 text-white transition
                                    ${isBuying ? "cursor-not-allowed bg-orange-600" : "cursor-pointer hover:bg-orange-600 bg-orange-500"}`}>
                                            {isBuying ? (
                                                <LoadingSpinner size="custom" />
                                            ) : "Buy now"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center mb-4 mt-16">
                                <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                                    {products.slice(0, 5).map((product) => {

                                        return (
                                            <ProductCard
                                                key={product._id as string}
                                                product={product}
                                                isLiked={determineLikedState(product._id)}
                                                id={product._id as string}
                                                isCreator={product.createdBy._id === _id}
                                            />
                                        )
                                    })}
                                </div>
                            </div>

                            <button onClick={() => router.push("/shop")} className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-orange-600 hover:text-white transition-colors duration-300 hover:border-transparent cursor-pointer">
                                See more
                            </button>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
};

export default SingleProductPage;