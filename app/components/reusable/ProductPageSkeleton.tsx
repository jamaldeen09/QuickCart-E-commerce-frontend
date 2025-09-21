'use client';

import { motion } from 'framer-motion';

const ProductPageSkeleton = () => {
  return (
    <div className="flex-grow">

      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image gallery skeleton */}
          <div className="px-5 lg:px-16 xl:px-20">
            {/* Main image skeleton */}
            <motion.div
              className="rounded-lg overflow-hidden bg-gray-200 mb-4 aspect-square"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Thumbnail grid skeleton */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  className="rounded-lg overflow-hidden bg-gray-200 aspect-square"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item * 0.1
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="flex flex-col">
            {/* Title skeleton */}
            <motion.div
              className="h-8 bg-gray-200 rounded-md mb-4"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ width: '70%' }}
            />

            {/* Rating skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    className="h-4 w-4 bg-gray-200 rounded-sm"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: star * 0.1
                    }}
                  />
                ))}
              </div>
              <motion.div
                className="h-4 w-8 bg-gray-200 rounded-md"
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

            {/* Description skeleton */}
            <div className="space-y-2 mt-3">
              <motion.div
                className="h-4 bg-gray-200 rounded-md"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
                style={{ width: '100%' }}
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
                  delay: 0.5
                }}
                style={{ width: '90%' }}
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
                  delay: 0.6
                }}
                style={{ width: '80%' }}
              />
            </div>

            {/* Price skeleton */}
            <div className="flex items-center mt-6 gap-2">
              <motion.div
                className="h-8 w-20 bg-gray-200 rounded-md"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
              />
              <motion.div
                className="h-5 w-16 bg-gray-200 rounded-md"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              />
            </div>

            {/* Divider */}
            <div className="bg-gray-200 h-px my-6"></div>

            {/* Product details table skeleton */}
            <div className="space-y-3">
              {['Brand', 'Color', 'Category'].map((item, index) => (
                <div key={item} className="flex justify-between">
                  <motion.div
                    className="h-4 w-16 bg-gray-200 rounded-md"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                  <motion.div
                    className="h-4 w-24 bg-gray-200 rounded-md"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2 + 0.1
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Button group skeleton */}
            <div className="flex items-center mt-10 gap-4">
              <motion.div
                className="w-full py-3.5 bg-gray-200 rounded"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }}
              />
              <motion.div
                className="w-full py-3.5 bg-gray-200 rounded"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.0
                }}
              />
            </div>
          </div>
        </div>

        {/* Featured products section skeleton */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <motion.div
              className="h-8 w-48 bg-gray-200 rounded-md"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-28 h-0.5 bg-gray-200 mt-2"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                className="flex flex-col space-y-2"
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
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </motion.div>
            ))}
          </div>

          {/* See more button skeleton */}
          <motion.div
            className="px-8 py-2 mb-16 border rounded bg-gray-200 w-32 h-10"
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
        </div>
      </div>

    </div>
  );
};

export default ProductPageSkeleton;