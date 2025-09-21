'use client';
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/redux/reduxTypes";
import { assets } from "@/app/assets/assets";
import { useResizer } from "@/app/customHooks/resizer";
import OrdersSkeleton from "./OrdersSkeleton";
import OrdersEmptyState from "./OrdersEmptyState";

const Orders = () => {

    const { isFetching, orders } = useAppSelector(((state) => state.adminData));
    const [screenSize] = useResizer(1115)
    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {isFetching ? <OrdersSkeleton /> : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.length <= 0 && !isFetching ? <OrdersEmptyState /> : orders.map((order, index) => (
                        <div key={index} className={`flex ${screenSize ? "flex-col" : "flex-col lg:flex-row"} gap-5 justify-between p-5 lg:py-5 lg:px-2 border-t border-gray-300`}>
                            <div className="flex-1 flex gap-5 max-w-80">
                                <Image
                                    className="max-w-16 max-h-16 object-cover"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />
                                <p className="flex flex-col gap-3">
                                    <span className="font-medium">
                                        {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                    </span>
                                    <span>Items : {order.items.length}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">{order.address.fullname}</span>
                                    <br />
                                    <span >{order.address.area}</span>
                                    <br />
                                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                                    <br />
                                    <span>{order.address.phoneNumber}</span>
                                </p>
                            </div>
                            <p className="font-medium my-auto">{`$${order.amount.toFixed(2)}`}</p>
                            <div>
                                <p className="flex flex-col">
                                    <span>Method : COD</span>
                                    <span>Date : {order.createdAt}</span>
                                    <span>Payment : {order.orderStatus}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default Orders;