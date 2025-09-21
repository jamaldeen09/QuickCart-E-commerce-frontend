
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypes";
import { IAddress } from "../../../server/src/models/Address";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/reusable/LoadingSpinner";
import { ProductSystem } from "../api/product";
import { Types } from "mongoose";
import { ConfiguredOrder, newOrder } from "../redux/data/profileSlice";
import { callToast } from "../utils/authHandlers";

const OrderSummary = () => {

  const [selectedAddress, setSelectedAddress] = useState<Omit<IAddress, "userId"> | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { savedAddresses, cart } = useAppSelector((state) => state.profileInformation);
  const getTotal = (): number => {
    let total = 0

    cart.products.forEach(p => {
      total += p.item.offerPrice * p.quantity
    })
    return Number(total.toFixed(2));
  }

  const createOrder = () => {

    if (!selectedAddress) {
      callToast("error", "Please select an address before making your order", 6000);
      return;
    }
    ProductSystem.createOrder(
      setIsOrdering,
      selectedAddress?._id as Types.ObjectId,
      (order: ConfiguredOrder) => dispatch(newOrder(order)),
      router,
    )
  }
  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress?.fullname}, ${selectedAddress?.area}, ${selectedAddress?.city}, ${selectedAddress?.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {savedAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => {
                      setSelectedAddress(() => address)
                      setIsDropdownOpen(false);
                    }}
                  >
                    {`${address.fullname}, ${address.area}, ${address.city}, ${address.state}`}
                  </li>
                ))}
                <li
                  onClick={() => {
                    router.push("/add-address");
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {cart.totalItems}</p>
            <p className="text-gray-800">USD {cart.products.map(p => p.item.offerPrice).reduce((acc, num) => acc + num, 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">{50}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>${getTotal()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={isOrdering}
        className={`w-full text-white py-3 mt-5 ${isOrdering ? "bg-orange-700 cursor-not-allowed" : "hover:bg-orange-700 bg-orange-600 cursor-pointer"}`}>
        {isOrdering ? (
          <LoadingSpinner size="sm" />
        ) : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;