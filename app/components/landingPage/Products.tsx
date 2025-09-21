"use client"
import { assets, productsDummyData } from "@/app/assets/assets";
import React, { useState } from "react";
import { NavIcon } from "./Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxTypes";
import { updateCart } from "@/app/redux/data/profileSlice";
import { ProductSystem } from "@/app/api/product";
import { callToast } from "@/app/utils/authHandlers";
import { PopulatedCart } from "../../../../server/src/types/productTypes";


interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string[];
    id: string,
    viewDetails: (id: string) => void;
}

const ProductCard = ({
    name,
    description,
    price,
    image,
    id,
    viewDetails
}: ProductCardProps): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { fullname, _id, email } = useAppSelector((state) => state.profileInformation);
    const { products } = useAppSelector((state) => state.products);

    const [isBuying, setIsBuying] = useState<boolean>(false);
    const router = useRouter();
    const updateClientsCart = (data: PopulatedCart) => {
        dispatch(updateCart(data));
    }

    const singleProduct = products.find(p => p._id === id)
    return (
        <div
            onClick={() => viewDetails(id)}
            className="flex flex-col  w-full group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
        >

            {/* image + heart icon */}
            <div
                className="bg-gray-100 h-60 w-full relative flex-center rounded-lg ">

                {/* image */}
                <Image
                    src={image[0]}
                    alt="Product image"
                    width={200}
                    height={200}
                    unoptimized
                    className="group-hover:scale-110 transition-all duration-300"
                />

            </div>

            {/* information */}
            <div className="w-full mt-3">
                <h1 className="font-bold text-base">{name}</h1>
                <p className="text-gray-500 truncate text-ellipsis overflow-hidden text-sm w-full">{description}</p>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600">4.5</p>
                    <div className="flex items-center gap-1">
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <NavIcon
                                    key={index}
                                    src={assets.star_icon}
                                    alt="star_icon"
                                    size={13}
                                />
                            ))
                        }
                        {<NavIcon
                            src={assets.star_dull_icon}
                            alt="star_icon"
                            size={13}
                        />}
                    </div>
                </div>

                {/* price */}
                <div className="mt-3 flex-between">
                    <h1 className="font-bold text-xl">${price}</h1>

                    <button
                        disabled={isBuying}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            if (
                                (!_id || _id.trim() === "") ||
                                (!fullname || fullname.trim()) === "" ||
                                (!email || email.activeEmail.trim() === "")
                            ) {
                                return callToast("error", "Sign in to buy this product");
                            } else if (singleProduct?.createdBy._id === _id) {
                                return callToast("error", "This product was created by you and cannot be bought")
                            } else {
                                return ProductSystem.addItemToCart(
                                    id as string,
                                    setIsBuying,
                                    updateClientsCart,
                                    "buying",
                                    router
                                )
                            }
                        }}
                        className="cursor-pointer  px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                        {isBuying ? (
                            <div >
                                <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "Buy now"}
                    </button>

                </div>
            </div>
        </div>
    )
}

const Products = (): React.ReactElement => {
    const router = useRouter();
    const viewProductDetails = (id: string) => router.push(`/product/?id=${id}`);

    return (
        <main
            className="min-h-screen py-6 px-4"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
                {/* title */}
                <div>
                    <p className="text-gray-700 text-2xl font-medium">Popular products</p>
                </div>

                {/* product cards */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-10"
                >
                    {productsDummyData.slice(0, 8).map((data) => (
                        <div key={data._id}>
                            <ProductCard
                                name={data.name}
                                description={data.description}
                                image={data.image}
                                price={data.price}
                                viewDetails={() => viewProductDetails(data._id)}
                                id={data._id}
                            />
                        </div>
                    ))}
                </div>


                {/* see more */}
                <div className="flex-center mt-16">
                    <button
                        onClick={() => router.push("/shop")}
                        className="cursor-pointer border border-gray-200 text-gray-500 px-16 py-3
                      hover:bg-orange-600 hover:text-white hover:border-transparent transition-all duration-300"
                    >
                        See more
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Products;