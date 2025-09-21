'use client';

import { motion } from 'framer-motion';

export const OrderSummarySkeleton = () => {
  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      {/* Header */}
      <motion.div
        className="h-7 bg-gray-200 rounded-md mb-1"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: '60%' }}
      />

      {/* Divider */}
      <div className="border-gray-500/30 my-5 h-px bg-gray-200"></div>

      <div className="space-y-6">
        {/* Address Selection Section */}
        <div>
          <motion.div
            className="h-4 bg-gray-200 rounded-md mb-2 uppercase"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
            style={{ width: '40%' }}
          />

          {/* Address Dropdown */}
          <div className="relative">
            <motion.div
              className="w-full h-10 bg-gray-200 rounded-sm"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />

            {/* Dropdown arrow */}
            <motion.div
              className="absolute right-3 top-3 w-4 h-4 bg-gray-300 rounded-sm"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </div>
        </div>

        {/* Promo Code Section */}
        <div>
          <motion.div
            className="h-4 bg-gray-200 rounded-md mb-2 uppercase"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
            style={{ width: '35%' }}
          />

          <div className="flex flex-col items-start gap-3">
            <motion.div
              className="w-full h-10 bg-gray-200 rounded-sm"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="h-8 bg-gray-300 rounded-sm"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
              style={{ width: '80px' }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-gray-500/30 my-5 h-px bg-gray-200"></div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          {/* Items */}
          <div className="flex justify-between">
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
              style={{ width: '50%' }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.75
              }}
              style={{ width: '40px' }}
            />
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
              style={{ width: '40%' }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.85
              }}
              style={{ width: '30px' }}
            />
          </div>

          {/* Tax */}
          <div className="flex justify-between">
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9
              }}
              style={{ width: '30%' }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.95
              }}
              style={{ width: '30px' }}
            />
          </div>

          {/* Total Divider */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <motion.div
                className="h-5 bg-gray-300 rounded-md"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.0
                }}
                style={{ width: '40px' }}
              />
              <motion.div
                className="h-5 bg-gray-300 rounded-md"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.05
                }}
                style={{ width: '50px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <motion.div
        className="w-full h-12 bg-gray-300 rounded-md mt-5"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1
        }}
      />
    </div>
  );
};

export default OrderSummarySkeleton;