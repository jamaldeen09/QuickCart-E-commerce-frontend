"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/app/assets/assets';
import { useRouter } from 'next/navigation';
import { ConfiguredProduct, likeOrUnlikeProduct, setCurrentlyLiking } from '@/app/redux/data/productSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/reduxTypes';
import { updateCart, updateLikes } from '@/app/redux/data/profileSlice';
import { ProductSystem } from '@/app/api/product';
import { callToast } from '@/app/utils/authHandlers';
import { ValidStatuses } from '../../../../server/src/models/User';
import { PopulatedCart } from '../../../../server/src/types/productTypes';

const ProductCard = ({ product, isLiked, id, isCreator }: {
    product: ConfiguredProduct,
    isLiked: boolean,
    id: string,
    isCreator: boolean
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { avatar, fullname, role, status, _id, email } = useAppSelector((state) => state.profileInformation);
    const { currentlyLiking, products } = useAppSelector((state) => state.products);
    const singleProduct = products.find(((p) => p._id === id));

    const [_, setIsAdding] = useState<boolean>(false);
    const [isBuying, setIsBuying] = useState<boolean>(false);

    const updateClientsCart = (data: PopulatedCart) => {
        dispatch(updateCart(data));
    }

    const clientUpdate = () => {
        dispatch(likeOrUnlikeProduct({
            productId: id,
            clientsDetails: {
                avatar,
                fullname,
                _id,
                role,
                status
            },
        }));
        dispatch(updateLikes(products.find((p) => p._id === id) as ConfiguredProduct));
    }

    const productLikingOrUnliking = () => {
        // Check if any like operation is already in progress globally
        if (currentlyLiking) {
            return;
        }

        if (
            (!avatar || avatar.trim() === "") ||
            (!fullname || fullname.trim() === "") ||
            (!role || role.trim() === "" || !(["user", "admin"]).includes(role)) ||
            (!status || status.trim() === "" || !(["online", "offline", "away"] as ValidStatuses[]).includes(status)) ||
            (!_id || _id.trim() === "" || _id.length < 24 || _id.length > 24)
        ) {
            callToast("error", "Sign in to like products");
            return;
        }

        let action: "like" | "unlike" = "like"

        if (
            products.find((p) => p._id === id)?.likes.some((like) => like._id === _id)
        ) {
            action = "unlike"
        } else {
            action = "like"
        }

        // Set the currently liking product ID
        dispatch(setCurrentlyLiking(id));

        ProductSystem.likeOrUnlikeItem(
            id,
            action,
            (state: string | null) => {
                dispatch(setCurrentlyLiking(state));
            },
            () => {
                clientUpdate();
            }
        );
    }

    // Show loading spinner only on the product being liked
    const showLoading = currentlyLiking === id;
    // Disable buttons globally when any product is being liked
    const isButtonDisabled = currentlyLiking !== null;

    return (
        <div
            onClick={() => {
                router.push(`/product?id=${product._id}`)
                scrollTo(0, 0)
            }}
            className="flex flex-col items-start gap-0.5 sm:max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full md:h-52 flex items-center justify-center">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                    unoptimized
                />
                {!isCreator && (
                    <button
                        disabled={isButtonDisabled}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            productLikingOrUnliking();
                        }}
                        className={`rounded-full p-1 absolute right-3 top-3 transition-all duration-300 ${isButtonDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:scale-105 active:scale-90"
                            }`}>
                        {showLoading ? (
                            <div>
                                <svg aria-hidden="true" className="w-4 h-4 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="transparent" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : isLiked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-4">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        )}
                    </button>
                )}

            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                            unoptimized
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{"$"}{product.offerPrice}</p>

                {!isCreator && (
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
                            } else {
                                return ProductSystem.addItemToCart(
                                    singleProduct?._id as string,
                                    setIsAdding,
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
                )}
            </div>
        </div>
    )
}

export default ProductCard;