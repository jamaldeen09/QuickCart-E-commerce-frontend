'use client';
import React from "react";
import { motion } from "framer-motion";

const ShopSkeletonLoader = () => {
  return (
    <div className="flex-grow">
      <div className="w-full px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-start">
          {/* Title section skeleton */}
          <div className="flex flex-col  pt-12 w-fit">
            <motion.div
              className="h-8 bg-gray-200 rounded-md mb-2"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ width: '150px' }}
            />
            <motion.div
              className="ml-auto w-16 h-0.5 bg-gray-200 rounded-full "
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
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <motion.div
                key={item}
                className="flex flex-col items-start gap-0.5 sm:max-w-[200px] w-full"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item * 0.1
                }}
              >
                {/* Product image skeleton */}
                <div className="relative bg-gray-200 rounded-lg w-full md:h-52 aspect-square">
                  {/* Like button skeleton */}
                  <motion.div
                    className="absolute right-3 top-3 w-6 h-6 bg-gray-300 rounded-full"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.1 + 0.2
                    }}
                  />
                </div>

                {/* Product name skeleton */}
                <motion.div
                  className="h-5 bg-gray-200 rounded-md mt-2 w-full"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item * 0.1 + 0.3
                  }}
                />

                {/* Product description skeleton */}
                <motion.div
                  className="h-3 bg-gray-200 rounded-md w-3/4 max-sm:hidden"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item * 0.1 + 0.4
                  }}
                />

                {/* Rating skeleton */}
                <div className="flex items-center gap-2 mt-1">
                  <motion.div
                    className="h-3 w-6 bg-gray-200 rounded-md"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.1 + 0.5
                    }}
                  />
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        className="h-3 w-3 bg-gray-200 rounded-sm"
                        animate={{
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: item * 0.1 + star * 0.1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price and button skeleton */}
                <div className="flex items-end justify-between w-full mt-1">
                  <motion.div
                    className="h-6 w-16 bg-gray-200 rounded-md"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.1 + 0.6
                    }}
                  />
                  <motion.div
                    className="w-20 h-8 bg-gray-200 rounded-full"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.1 + 0.7
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

export default ShopSkeletonLoader;