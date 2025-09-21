'use client';
import React from "react";
import { motion, Variants } from "framer-motion";

const MyOrdersSkeleton = () => {
    // Animation for the shimmer effect
    const shimmerVariants: Variants = {
        initial: {
            backgroundPosition: '-200% 0'
        },
        animate: {
            backgroundPosition: ['0% 0', '200% 0'] as any,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    return (
        <>
            {/* Navbar placeholder */}
            <div className="h-16 bg-gray-100"></div>

            <div className="flex flex-col justify-between w-full py-6 min-h-screen px-4 md:px-6 lg:px-8">
                <div className="max-w-[79rem] w-full mx-auto">
                    <div className="space-y-5 w-full">
                        {/* Title skeleton */}
                        <motion.div
                            className="h-8 bg-gray-200 rounded-md mt-6 mx-auto max-w-[200px]"
                            variants={shimmerVariants}
                            initial="initial"
                            animate="animate"
                            style={{
                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                backgroundSize: '200% 100%'
                            }}
                        />

                        {/* Orders list skeleton */}
                        <div className="border-t border-gray-300 text-sm">
                            {[1, 2, 3].map((item) => (
                                <motion.div
                                    key={item}
                                    className="flex flex-col gap-5 p-5 border-b border-gray-300 md:flex-row md:items-center md:justify-between"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: item * 0.1 }}
                                >
                                    {/* Product Info Skeleton */}
                                    <div className="flex-1 flex gap-5 max-w-full md:max-w-80">
                                        <motion.div
                                            className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <motion.div
                                                className="h-5 bg-gray-200 rounded-md"
                                                variants={shimmerVariants}
                                                initial="initial"
                                                animate="animate"
                                                style={{
                                                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                    backgroundSize: '200% 100%'
                                                }}
                                            />
                                            <motion.div
                                                className="h-4 bg-gray-200 rounded-md max-w-[80px]"
                                                variants={shimmerVariants}
                                                initial="initial"
                                                animate="animate"
                                                style={{
                                                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                    backgroundSize: '200% 100%'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Address Info Skeleton */}
                                    <div className="md:text-right lg:text-left space-y-2">
                                        <motion.div
                                            className="h-4 bg-gray-200 rounded-md max-w-[120px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <motion.div
                                            className="h-3 bg-gray-200 rounded-md max-w-[100px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <motion.div
                                            className="h-3 bg-gray-200 rounded-md max-w-[140px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <motion.div
                                            className="h-3 bg-gray-200 rounded-md max-w-[90px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                    </div>

                                    {/* Price Skeleton */}
                                    <div className="md:text-center">
                                        <motion.div
                                            className="h-6 bg-gray-200 rounded-md max-w-[70px] mx-auto"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                    </div>

                                    {/* Order Details Skeleton */}
                                    <div className="md:text-right space-y-2">
                                        <motion.div
                                            className="h-4 bg-gray-200 rounded-md max-w-[80px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <motion.div
                                            className="h-3 bg-gray-200 rounded-md max-w-[100px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                        <motion.div
                                            className="h-4 bg-gray-200 rounded-md max-w-[90px] ml-auto md:mx-0"
                                            variants={shimmerVariants}
                                            initial="initial"
                                            animate="animate"
                                            style={{
                                                background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                                                backgroundSize: '200% 100%'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer placeholder */}
            <div className="h-60 bg-gray-100"></div>
        </>
    );
};

export default MyOrdersSkeleton;