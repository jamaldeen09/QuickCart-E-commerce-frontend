'use client';
import React, { useEffect, useState } from "react";
import Navbar from "../components/landingPage/Navbar";
import { assets } from "../assets/assets";
import Image from "next/image";
import Footer from "../components/landingPage/Footer";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import { useResizer } from "../customHooks/resizer";
import { motion, AnimatePresence } from "framer-motion";
import MyOrdersSkeleton from "./MyOrdersSkeleton";
import { AuthenticationSystem } from "../api/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { callToast } from "../utils/authHandlers";
import { ProductSystem } from "../api/product";
import LoadingSpinner from "../components/reusable/LoadingSpinner";
import { clearOrders } from "../redux/data/profileSlice";
import { formatDate } from "../utils/generalHelpers";

const MyOrders = () => {
    const { orders, fetching } = useAppSelector((state) => state.profileInformation);
    const [screenSize] = useResizer(1120);
    const dispatch = useAppDispatch();
    const [clearOrderHistory, setClearOrderHistory] = useState<boolean>(false);
    const [isClearing, setIsClearing] = useState<boolean>(false)
    const router = useRouter();
    const { _id, fullname, email } = useAppSelector((selector) => selector.profileInformation);

    // Animation variants for staggered loading
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const [shouldMount, setShouldMount] = useState<boolean>(false);

    useEffect(() => {
        AuthenticationSystem.verifyAccount(router, setShouldMount, { page: "my-orders" });
    }, []);

    if (!shouldMount) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-32 pt-8 md:pt-12 lg:pt-14 pb-16 lg:pb-20">
                    <div className="flex-1">
                        <MyOrdersSkeleton />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between w-full py-6 min-h-screen px-4 md:px-6 lg:px-8">
                <div className="max-w-[79rem] w-full mx-auto">
                    <div className="space-y-5 w-full">
                        <div className="flex-between ">
                            {/* ${screenSize ? "text-center" : "text-start"} */}
                            <h2 className={`text-xl md:text-2xl font-medium mt-6`}>My Orders</h2>
                            <Button onClick={() => {
                                if (
                                    (!_id || _id.trim() === "") ||
                                    (!fullname || fullname.trim()) === "" ||
                                    (!email || email.activeEmail.trim() === "")
                                ) {
                                    callToast("error", "Sign in to clear your order history");
                                    return router.push("/")
                                } else {
                                    return setClearOrderHistory(true);
                                }
                            }} variant="ghost" className="cursor-pointer text-xs font-medium mt-6 hover:bg-gray-50 hover:text-orange-600" size="sm">Clear order history</Button>
                        </div>
                        {fetching ? (
                            <MyOrdersSkeleton />
                        ) : (
                            <motion.div
                                className="border-t border-gray-300 text-sm"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <AnimatePresence>
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => {
                                            // Extract product names with quantities - FIXED
                                            const productNamesWithQuantities = order.items.map(item =>
                                                `${item.product.name} x ${item.quantity}`
                                            );

                                            // Get the first few product names for display
                                            const displayProducts = productNamesWithQuantities.slice(0, 3);
                                            const remainingCount = productNamesWithQuantities.length - 3;

                                            return (
                                                <motion.div
                                                    key={index}
                                                    className={`flex flex-col gap-5 p-5 border-b border-gray-300
                                                    md:flex-row md:items-center md:justify-between`}
                                                    variants={itemVariants}
                                                    layout
                                                >
                                                    {/* Product Info */}
                                                    <div className="flex-1 flex gap-5 max-w-full md:max-w-80">
                                                        <div className="flex-shrink-0">
                                                            <Image
                                                                className="w-16 h-16 object-cover rounded-md"
                                                                src={assets.box_icon}
                                                                alt="box_icon"
                                                                width={64}
                                                                height={64}
                                                                unoptimized
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium text-base line-clamp-2">
                                                                {displayProducts.join(", ")}
                                                                {remainingCount > 0 && ` and ${remainingCount} more...`}
                                                            </p>
                                                            <span className="text-gray-600 mt-1 block">Items: {order.items.length}</span>
                                                        </div>
                                                    </div>

                                                    {/* Address Info */}
                                                    <div className="md:text-right lg:text-left">
                                                        <p className="space-y-1">
                                                            <span className="font-medium block">{order.address.fullname}</span>
                                                            <span className="text-gray-600 block">{order.address.area}</span>
                                                            <span className="text-gray-600 block">{`${order.address.city}, ${order.address.state}`}</span>
                                                            <span className="text-gray-600 block">{order.address.phoneNumber}</span>
                                                        </p>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="md:text-center">
                                                        <p className="font-medium text-lg">${order.amount.toFixed(2)}</p>
                                                    </div>

                                                    {/* Order Details */}
                                                    <div className="md:text-right">
                                                        <p className="space-y-1">
                                                            <span className="block">Method: COD</span>
                                                            <span className="block text-gray-600">Date: {formatDate(order.createdAt)}</span>
                                                            <span className={`block font-medium ${order.orderStatus === 'Delivered' ? 'text-green-600' :
                                                                order.orderStatus === 'Processing' ? 'text-yellow-600' :
                                                                    order.orderStatus === 'Cancelled' ? 'text-red-600' :
                                                                        'text-blue-600'
                                                                }`}>
                                                                {order.orderStatus}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    ) : (
                                        <motion.div
                                            className="flex flex-col items-center justify-center py-16 text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* Empty Orders SVG Illustration */}
                                            <svg
                                                className="w-64 h-64 md:w-80 md:h-80 text-gray-300 mb-6"
                                                viewBox="0 0 512 512"
                                                fill="currentColor"
                                            >
                                                <path d="M448 341.4V172c0-13.3-10.7-24-24-24H88c-13.3 0-24 10.7-24 24v169.4c-13.9 11.1-24 28.5-24 48.6v64c0 26.5 21.5 48 48 48h384c26.5 0 48-21.5 48-48v-64c0-20.1-10.1-37.5-24-48.6zM96 172c0-4.4 3.6-8 8-8h336c4.4 0 8 3.6 8 8v152H96V172zm384 288c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v64z" />
                                                <path d="M160 256h192c8.8 0 16-7.2 16-16s-7.2-16-16-16H160c-8.8 0-16 7.2-16 16s7.2 16 16 16zm0 64h192c8.8 0 16-7.2 16-16s-7.2-16-16-16H160c-8.8 0-16 7.2-16 16s7.2 16 16 16z" opacity="0.4" />
                                                <circle cx="352" cy="160" r="32" opacity="0.4" />
                                                <path d="M352 128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" opacity="0.2" />
                                            </svg>

                                            <h3 className="text-xl md:text-2xl font-medium text-gray-500 mb-3">
                                                No Orders Yet
                                            </h3>
                                            <p className="text-gray-400 max-w-md mx-auto mb-6">
                                                Your order history will appear here once you start shopping with us.
                                            </p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => router.push("/shop")}
                                                className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200
                                                cursor-pointer"
                                            >
                                                Start Shopping
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />


            {/* clear order history confirmation modal */}
            <AnimatePresence>
                {clearOrderHistory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key="clear-order-history-overlay"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-center inset-0 bg-black/70 h-full w-full fixed top-0 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key="clear-order-history-modal"
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg w-full max-w-md p-6 mx-4"
                        >
                            <h3 className="text-xl font-medium text-gray-800 mb-4">
                                Clear Order History
                            </h3>

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to clear your entire order history?
                                This action cannot be undone and all your order records will be permanently deleted.
                            </p>

                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => setClearOrderHistory(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => ProductSystem.clearOrderHistory(setIsClearing, setClearOrderHistory, () => dispatch(clearOrders()))}
                                    className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer`}
                                >
                                     {isClearing ? (
                                        <LoadingSpinner size="sm"/>
                                    ): "Clear Order History"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyOrders;