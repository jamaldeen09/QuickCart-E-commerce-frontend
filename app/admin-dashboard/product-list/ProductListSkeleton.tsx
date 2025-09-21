'use client'
import React from "react";
import { motion, Variants } from "framer-motion";

const ProductListSkeleton = () => {
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
    <div className="flex-1 min-h-screen flex flex-col">
      <div className="w-full p-4 md:p-6 lg:p-8">
        {/* Header Skeleton */}
        <div className="mb-6 space-y-2">
          <motion.div
            className="h-8 bg-gray-200 rounded-md"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
              backgroundSize: '200% 100%',
              width: '200px'
            }}
          />
          <motion.div
            className="h-4 bg-gray-200 rounded-md"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
              backgroundSize: '200% 100%',
              width: '120px'
            }}
          />
        </div>

        {/* Products Container Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header Row Skeleton */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            {['Product', 'Category', 'Price', 'Actions'].map((header, index) => (
              <motion.div
                key={header}
                className={`h-4 bg-gray-200 rounded-md ${index === 0 ? 'col-span-5' : index === 1 ? 'col-span-2' : index === 2 ? 'col-span-2' : 'col-span-3'}`}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                  backgroundSize: '200% 100%'
                }}
              />
            ))}
          </div>

          {/* Products List Skeleton with Scroll */}
          <div className="max-h-[750px] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: item * 0.1 }}
              >
                {/* Product Info Skeleton */}
                <div className="md:col-span-5 flex items-center space-x-4">
                  <motion.div
                    className="flex-shrink-0 bg-gray-200 rounded-lg w-16 h-16"
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
                        backgroundSize: '200% 100%',
                        width: '80%'
                      }}
                    />
                    <motion.div
                      className="h-4 bg-gray-200 rounded-md md:hidden"
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      style={{
                        background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                        backgroundSize: '200% 100%',
                        width: '60%'
                      }}
                    />
                  </div>
                </div>

                {/* Category Skeleton - Hidden on mobile */}
                <div className="hidden md:flex md:col-span-2 items-center">
                  <motion.div
                    className="h-6 bg-gray-200 rounded-full w-20"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>

                {/* Price Skeleton - Hidden on mobile */}
                <div className="hidden md:flex md:col-span-2 items-center">
                  <motion.div
                    className="h-6 bg-gray-200 rounded-md w-16"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>

                {/* Actions Skeleton */}
                <div className="md:col-span-3 flex items-center justify-end space-x-3">
                  {/* Mobile View Button Skeleton */}
                  <motion.div
                    className="md:hidden w-12 h-12 bg-gray-200 rounded-full"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                      backgroundSize: '200% 100%'
                    }}
                  />

                  {/* Desktop View Button Skeleton */}
                  <motion.div
                    className="hidden md:flex w-32 h-10 bg-gray-200 rounded-md"
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
  );
};

export default ProductListSkeleton;