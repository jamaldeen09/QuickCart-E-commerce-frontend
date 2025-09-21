'use client';

import { motion } from 'framer-motion';

const CartSkeleton = () => {
  return (
    <div className="flex-1">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 border-b border-gray-500/30 pb-4 md:pb-6">
        <motion.div
          className="h-8 bg-gray-200 rounded-md"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: '180px' }}
        />
        <motion.div
          className="h-6 bg-gray-200 rounded-md"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{ width: '80px' }}
        />
      </div>

      {/* Desktop table skeleton */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full table-auto">
          <thead className="text-left">
            <tr>
              {['Product Details', 'Price', 'Quantity', 'Subtotal'].map((header, index) => (
                <th key={header} className="pb-4 md:pb-6 px-2 md:px-4">
                  <motion.div
                    className="h-5 bg-gray-200 rounded-md"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                    style={{
                      width: index === 0 ? '120px' :
                        index === 1 ? '60px' :
                          index === 2 ? '80px' : '70px'
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b border-gray-200">
                {/* Product details column */}
                <td className="flex items-center gap-3 md:gap-4 py-4 md:py-5 px-2 md:px-4">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-14 md:w-16 h-14 md:h-16 bg-gray-200 rounded-lg"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item * 0.2
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <motion.div
                      className="h-4 bg-gray-200 rounded-md mb-2"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item * 0.2 + 0.1
                      }}
                      style={{ width: '120px' }}
                    />
                    <motion.div
                      className="h-3 bg-gray-200 rounded-md"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item * 0.2 + 0.2
                      }}
                      style={{ width: '60px' }}
                    />
                  </div>
                </td>

                {/* Price column */}
                <td className="py-4 md:py-5 px-2 md:px-4">
                  <motion.div
                    className="h-5 bg-gray-200 rounded-md mx-auto"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.2 + 0.3
                    }}
                    style={{ width: '60px' }}
                  />
                </td>

                {/* Quantity column */}
                <td className="py-4 md:py-5 px-2 md:px-4">
                  <motion.div
                    className="flex items-center gap-1.5 md:gap-2 justify-center mx-auto"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.2 + 0.4
                    }}
                    style={{ width: '80px' }}
                  >
                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-gray-200 rounded-sm"></div>
                    <div className="w-6 h-6 md:w-7 md:h-7 border border-gray-200 bg-white"></div>
                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-gray-200 rounded-sm"></div>
                  </motion.div>
                </td>

                {/* Subtotal column */}
                <td className="py-4 md:py-5 px-2 md:px-4">
                  <motion.div
                    className="h-5 bg-gray-200 rounded-md mx-auto"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item * 0.2 + 0.5
                    }}
                    style={{ width: '70px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards skeleton */}
      <div className="md:hidden space-y-4">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="border border-gray-200 rounded-lg p-4"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item * 0.2
            }}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-gray-200 rounded-md" style={{ width: '120px' }}></div>
                <div className="h-3 bg-gray-200 rounded-md" style={{ width: '60px' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                <div className="w-7 h-7 border border-gray-200 bg-white"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
              </div>

              <div className="text-right space-y-1">
                <div className="h-3 bg-gray-200 rounded-md ml-auto" style={{ width: '60px' }}></div>
                <div className="h-4 bg-gray-200 rounded-md ml-auto" style={{ width: '70px' }}></div>
              </div>
            </div>

            <div className="w-full mt-3 py-2 bg-gray-200 rounded-md"></div>
          </motion.div>
        ))}
      </div>

      {/* Continue shopping button skeleton */}
      <motion.div
        className="group flex items-center mt-6 gap-2 w-fit"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
      >
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div className="h-5 bg-gray-200 rounded-md" style={{ width: '140px' }}></div>
      </motion.div>
    </div>
  );
};

export default CartSkeleton;