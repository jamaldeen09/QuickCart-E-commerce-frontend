'use client'
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/reduxTypes";
import { assets } from "@/app/assets/assets";
import { NavIcon } from "@/app/components/landingPage/Navbar";
import ProductListSkeleton from "./ProductListSkeleton";


const ProductList = () => {
  const router = useRouter();
  const { products, isFetching } = useAppSelector((state) => state.adminData);

  return (
    <>
      <div className="flex-1 min-h-screen flex flex-col">
        {isFetching ? (
          <div className="flex items-center justify-center h-full">
            <ProductListSkeleton />
          </div>
        ) : (
          <div className="w-full p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
              <p className="text-gray-600 mt-1">{products.length} products found</p>
            </div>

            {/* Products Container */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-gray-700 font-medium text-sm">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Products List with Scroll */}
              <div className="max-h-[750px] overflow-y-auto">
                {products.map((product, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-gray-100 transition-colors duration-200 group"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center space-x-4">
                      <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                          width={64}
                          height={64}
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 md:hidden">
                          {product.category} • ${product.offerPrice}
                        </p>
                      </div>
                    </div>

                    {/* Category - Hidden on mobile */}
                    <div className="hidden md:flex md:col-span-2 items-center">
                      <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Price - Hidden on mobile */}
                    <div className="hidden md:flex md:col-span-2 items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.offerPrice}
                      </span>
                      {product.price !== product.offerPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-3 flex items-center justify-end space-x-3">
                      {/* Mobile View Button */}
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="md:hidden flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
                      >
                        <NavIcon
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                          className="text-white"
                        />
                      </button>

                      {/* Desktop View Button */}
                      <button
                        onClick={() => router.push(`/product?id=${product._id}`)}
                        className="cursor-pointer hidden md:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                      >
                        <span>View Product</span>
                        <NavIcon
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                          className="text-white"
                        />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {products.length === 0 && !isFetching && (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Image
                        src={assets.box_icon}
                        alt="No products"
                        width={48}
                        height={48}
                        className="opacity-50"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 max-w-md">
                      There are no products in your inventory. Add your first product to get started.
                    </p>
                    <button
                      onClick={() => router.push('/admin-dashboard/add-product')}
                      className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors font-medium"
                    >
                      Add Product
                    </button>
                  </div>
                )}
              </div>
            </div>


          </div>
        )}
      </div>


    </>
  );
};

export default ProductList;