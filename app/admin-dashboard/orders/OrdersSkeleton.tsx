'use client';
import React from "react";
import { motion, Variants } from "framer-motion";

const OrdersSkeleton = () => {
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
    <div className="flex-1 h-screen overflow-scroll flex flex-col text-sm">
      <div className="md:p-10 p-4 space-y-5">
        {/* Header Skeleton */}
        <motion.div
          className="h-7 bg-gray-200 rounded-md"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          style={{
            background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
            backgroundSize: '200% 100%',
            width: '100px'
          }}
        />

        {/* Orders Container */}
        <div className="max-w-4xl rounded-md space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              className="flex flex-col md:flex-row gap-5 justify-between p-5 border border-gray-200 rounded-lg bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: item * 0.1 }}
            >
              {/* Order Info Skeleton */}
              <div className="flex-1 flex gap-5 max-w-80">
                <motion.div
                  className="w-16 h-16 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%'
                  }}
                />
                <div className="flex flex-col gap-3 flex-1">
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
                    className="h-4 bg-gray-200 rounded-md"
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

              {/* Address Info Skeleton */}
              <div className="space-y-2">
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
                <motion.div
                  className="h-3 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%',
                    width: '100px'
                  }}
                />
                <motion.div
                  className="h-3 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%',
                    width: '140px'
                  }}
                />
                <motion.div
                  className="h-3 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%',
                    width: '90px'
                  }}
                />
              </div>

              {/* Price Skeleton */}
              <motion.div
                className="h-6 bg-gray-200 rounded-md my-auto w-16"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                  backgroundSize: '200% 100%'
                }}
              />

              {/* Order Details Skeleton */}
              <div className="space-y-2">
                <motion.div
                  className="h-4 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%',
                    width: '80px'
                  }}
                />
                <motion.div
                  className="h-3 bg-gray-200 rounded-md"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                    backgroundSize: '200% 100%',
                    width: '100px'
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
                    width: '90px'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;