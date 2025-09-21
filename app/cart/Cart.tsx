'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/landingPage/Navbar";
import Image from "next/image";
import { assets } from "../assets/assets";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import OrderSummary from "./OrderSummary";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { changeCartItemQuantity, removeCartItem, updateCart } from "../redux/data/profileSlice";
import { ProductSystem } from "../api/product";
import { PopulatedCart } from "../../../server/src/types/productTypes";
import { callToast } from "../utils/authHandlers";
import EmptyCartState from "./EmptyCartState";
import CartSkeleton from "./CartSkeleton";
import { OrderSummarySkeleton } from "./OrdrSummarySkeleton";
import { AuthenticationSystem } from "../api/auth";

const Cart = () => {
  const router = useRouter();
  const { cart, fetching } = useAppSelector((selector) => selector.profileInformation);
  const dispatch = useAppDispatch();
  const [disabledButtons, setDisabledButtons] = useState<{ [key: string]: boolean }>({});

  const handleQuantityUpdate = async (productId: string, action: "increase" | "decrease") => {
    setDisabledButtons(prev => ({ ...prev, [productId]: true }));

    dispatch(changeCartItemQuantity({
      productId: productId,
      action: action
    }));

    try {
      await ProductSystem.updateCartItemQuantity(
        { id: productId, action: action },
        (data: PopulatedCart) => dispatch(updateCart(data)),
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      callToast("error", "Failed to update quantity");
    } finally {
      setTimeout(() => {
        setDisabledButtons(prev => ({ ...prev, [productId]: false }));
      }, 400);
    }
  };
  const [shouldMount, setShouldMount] = useState<boolean>(false);

  useEffect(() => {
    AuthenticationSystem.verifyAccount(router, setShouldMount, { page: "cart" });
  }, []);

  if (!shouldMount) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-32 pt-8 md:pt-12 lg:pt-14 pb-16 lg:pb-20">
          <div className="flex-1">
            <CartSkeleton />
          </div>
          <OrderSummarySkeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-32 pt-8 md:pt-12 lg:pt-14 pb-16 lg:pb-20">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 border-b border-gray-500/30 pb-4 md:pb-6">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500/80">{cart.products.length} Items</p>
          </div>

          <div className="overflow-x-auto">
            {fetching ? (
              <CartSkeleton />
            ) : cart.products.length <= 0 ? (
              <EmptyCartState />
            ) : (
              <>
                {/* Desktop Table */}
                <table className="min-w-full table-auto hidden md:table">
                  <thead className="text-left">
                    <tr>
                      <th className="text-nowrap pb-4 md:pb-6 px-2 md:px-4 text-gray-600 font-medium text-sm md:text-base">
                        Product Details
                      </th>
                      <th className="pb-4 md:pb-6 px-2 md:px-4 text-gray-600 font-medium text-sm md:text-base">
                        Price
                      </th>
                      <th className="pb-4 md:pb-6 px-2 md:px-4 text-gray-600 font-medium text-sm md:text-base">
                        Quantity
                      </th>
                      <th className="pb-4 md:pb-6 px-2 md:px-4 text-gray-600 font-medium text-sm md:text-base">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((product) => {
                      const isDisabled = disabledButtons[product.item._id as string] || false;

                      return (
                        <tr key={product.item._id as string} className="border-b border-gray-200">
                          <td className="flex items-center gap-3 md:gap-4 py-4 md:py-5 px-2 md:px-4">
                            <div className="flex-shrink-0">
                              <div className="rounded-lg overflow-hidden bg-gray-500/10 p-1.5 md:p-2">
                                <Image
                                  src={product.item.image[0] || ""}
                                  alt={product.item.name || ""}
                                  className="w-14 md:w-16 h-auto object-cover mix-blend-multiply"
                                  width={1280}
                                  height={720}
                                  unoptimized
                                />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-gray-800 text-sm md:text-base font-medium truncate">
                                {product.item.name || "none"}
                              </p>
                              <button
                                onClick={() => {
                                  dispatch(removeCartItem(product.item._id as string));
                                  callToast("success", `${product.item.name || "Product"} has been removed from your cart`);
                                  ProductSystem.removeCartItem(
                                    product.item._id as string,
                                  )
                                }}
                                className="text-xs text-orange-600 mt-1 cursor-pointer hover:brightness-75 transition-all duration-300"
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                          <td className="py-4 md:py-5 px-2 md:px-4 text-gray-600 text-sm md:text-base">
                            ${product.item.offerPrice || "0"}
                          </td>
                          <td className="py-4 md:py-5 px-2 md:px-4">
                            <div className="flex items-center gap-1.5 md:gap-2 justify-center">
                              <button
                                disabled={product.quantity <= 1 || isDisabled}
                                onClick={() => handleQuantityUpdate(product.item._id as string, "decrease")}
                                className={`transition-colors duration-200 p-1 rounded-sm ${product.quantity <= 1 || isDisabled
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer hover:bg-gray-100"
                                  }`}
                              >
                                <ChevronLeft className={`${product.quantity <= 1 || isDisabled ? "text-gray-400" : "text-gray-800"
                                  } w-3.5 h-3.5 md:w-4 md:h-4`} />
                              </button>

                              <div className={`w-6 h-6 md:w-7 md:h-7 border border-gray-200 flex items-center justify-center text-xs md:text-sm shadow-sm relative ${isDisabled ? "opacity-50" : ""
                                }`}>
                                {isDisabled ? (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
                                  </div>
                                ) : product.quantity}
                              </div>

                              <button
                                disabled={product.quantity >= 20 || isDisabled}
                                onClick={() => handleQuantityUpdate(product.item._id as string, "increase")}
                                className={`transition-colors duration-200 p-1 rounded-sm ${product.quantity >= 20 || isDisabled
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer hover:bg-gray-100"
                                  }`}
                              >
                                <ChevronRight className={`${product.quantity >= 20 || isDisabled ? "text-gray-400" : "text-gray-800"
                                  } w-3.5 h-3.5 md:w-4 md:h-4`} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 md:py-5 px-2 md:px-4 text-gray-600 text-sm md:text-base font-medium">
                            ${(product.item.price * product.quantity).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {cart.products.map((product) => {
                    const isDisabled = disabledButtons[product.item._id as string] || false;

                    return (
                      <div key={product.item._id as string} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="rounded-lg overflow-hidden bg-gray-500/10 p-1.5">
                              <Image
                                src={product.item.image[0] || ""}
                                alt={product.item.name || ""}
                                className="w-14 h-14 object-cover mix-blend-multiply"
                                width={1280}
                                height={720}
                                unoptimized
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 font-medium truncate text-sm">
                              {product.item.name || "none"}
                            </p>
                            <p className="text-gray-600 text-sm">${product.item.offerPrice || "0"}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              disabled={product.quantity <= 1 || isDisabled}
                              onClick={() => handleQuantityUpdate(product.item._id as string, "decrease")}
                              className={`transition-colors duration-200 p-1 rounded-sm ${product.quantity <= 1 || isDisabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-100"
                                }`}
                            >
                              <ChevronLeft className={`${product.quantity <= 1 || isDisabled ? "text-gray-400" : "text-gray-800"
                                } w-4 h-4`} />
                            </button>

                            <div className={`w-7 h-7 border border-gray-200 flex items-center justify-center text-sm shadow-sm relative ${isDisabled ? "opacity-50" : ""
                              }`}>
                              {isDisabled ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-3 h-3 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
                                </div>
                              ) : product.quantity}
                            </div>

                            <button
                              disabled={product.quantity >= 20 || isDisabled}
                              onClick={() => handleQuantityUpdate(product.item._id as string, "increase")}
                              className={`transition-colors duration-200 p-1 rounded-sm ${product.quantity >= 20 || isDisabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-100"
                                }`}
                            >
                              <ChevronRight className={`${product.quantity >= 20 || isDisabled ? "text-gray-400" : "text-gray-800"
                                } w-4 h-4`} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-gray-600 text-sm">Subtotal</p>
                            <p className="font-medium">${(product.item.price * product.quantity).toFixed(2)}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            dispatch(removeCartItem(product.item._id as string));
                            callToast("success", `${product.item.name || "Product"} has been removed from your cart`);
                            ProductSystem.removeCartItem(
                              product.item._id as string,
                            )
                          }}
                          className="w-full mt-3 py-2 text-orange-600 text-sm border border-orange-200 rounded-md hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => router.push("/shop")}
            className="group flex items-center mt-6 gap-2 text-orange-600 cursor-pointer w-fit"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
              width={16}
              height={16}
            />
            <span className="text-sm md:text-base">Continue Shopping</span>
          </button>
        </div>

        {fetching ? <OrderSummarySkeleton /> : cart.products.length > 0 && !fetching && (
          <OrderSummary />
        )}
      </div>
    </>
  );
};

export default Cart;