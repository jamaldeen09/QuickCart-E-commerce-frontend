'use client';

import { motion } from 'framer-motion';

const ProfileSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Avatar skeleton */}
          <motion.div
            className="h-6 w-6 rounded-full bg-gray-200"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Text content skeleton */}
          <div className="flex-1 space-y-2">
            {/* Username skeleton */}
            <motion.div
              className="h-4 rounded-md bg-gray-200"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              style={{ width: '60%' }}
            />

            {/* Secondary text skeleton */}
            <motion.div
              className="h-3 rounded-md bg-gray-200"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
              style={{ width: '40%' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileSkeleton;