'use client';

import { motion } from 'framer-motion';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-20 h-20">
        {/* Outer ring with orange-200 */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-orange-200"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Middle ring with orange-400 */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-orange-400 border-t-transparent"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner spinner with orange-600 */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-orange-600 border-r-transparent"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center dot with orange-700 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-700 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default FullPageLoader;