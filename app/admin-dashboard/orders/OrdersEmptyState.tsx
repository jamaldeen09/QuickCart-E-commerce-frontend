'use client';
import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const OrdersEmptyState = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Illustration */}
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Image
          src={assets.box_icon}
          alt="No orders"
          width={64}
          height={64}
          className="opacity-50"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        No Orders Yet
      </h3>

      {/* Description */}
      <p className="text-gray-500 max-w-md mb-6">
        Your order history will appear here once customers start placing orders.
        All incoming orders will be displayed in this section.
      </p>

      {/* Stats Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-md">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">0</div>
          <div className="text-sm text-orange-800">Total Orders</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">$0</div>
          <div className="text-sm text-orange-800">Total Revenue</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">0</div>
          <div className="text-sm text-orange-800">Pending Orders</div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/admin-dashboard')}
        className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-medium"
      >
        View Dashboard
      </motion.button>

      {/* Additional Help Text */}
      <p className="text-sm text-gray-400 mt-6">
        Need help? Check your product listings or marketing strategies to attract more customers.
      </p>
    </motion.div>
  );
};

export default OrdersEmptyState;