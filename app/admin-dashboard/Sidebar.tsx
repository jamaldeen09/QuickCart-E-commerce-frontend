"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { assets } from '../assets/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../redux/reduxTypes';
import { XIcon } from 'lucide-react';
import { setTrigger } from '../redux/triggers/triggers';

const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const disableSidebar = () => dispatch(setTrigger({ key: "adminDashboardSidebar", value: false }));
    const menuItems = [
        {
            name: 'Add Product', path: '/admin-dashboard', icon: assets.add_icon, onClickFunc: () => {
                disableSidebar()
                router.push("/admin-dashboard")
            }
        },
        {
            name: 'Product List', path: '/admin-dashboard/product-list', icon: assets.product_list_icon, onClickFunc: () => {
                disableSidebar()
                router.push("/admin-dashboard/product-list")
            }
        },
        {
            name: 'Orders', path: '/admin-dashboard/orders', icon: assets.order_icon, onClickFunc: () => {
                disableSidebar()
                router.push("/admin-dashboard/orders")
            }
        },
    ];
    const { adminDashboardSidebar } = useAppSelector((state) => state.triggers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (adminDashboardSidebar) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }
    }, [adminDashboardSidebar]);

    return (
        <>
            {/* tablet + dektop version */}
            <div className='w-fit lg:w-64 h-full text-base border-gray-300 py-2 hidden md:flex flex-col border-r'>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={
                                    `flex items-center py-3 px-4 gap-3 ${isActive
                                        ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                                        : "hover:bg-gray-100/90 border-white"
                                    }`
                                }
                            >
                                <Image
                                    src={item.icon}
                                    alt={`${item.name.toLowerCase()}_icon`}
                                    className="w-7 h-7"
                                />
                                <p className='lg:block hidden text-center'>{item.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* mobile version (offcanvas) */}
            <AnimatePresence>
                {adminDashboardSidebar && (
                    // overlay
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        exit={{ opacity: 0 }}
                        key="admin-dashboard-sidebar-overlay"
                        className="inset-0 bg-black/70 fixed top-0 h-full w-full md:hidden z-50"
                    >
                        {/* offcanvas */}
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            key="admin-dashboard-offcanvas"
                            exit={{ x: -40, opacity: 0 }}
                            className="absolute left-0 w-64 h-full text-base border-gray-300 py-2 flex flex-col border-r bg-white"
                        >
                            <div className="flex-between p-4 border-b border-gray-200">
                                {/* logo */}
                                <div>
                                    <Image
                                        src={assets.logo}
                                        alt="QuickCart logo"
                                        width={100}
                                        unoptimized
                                    />
                                </div>
                                <button
                                    onClick={disableSidebar}
                                    className="hover:bg-gray-100 p-1 rounded-lg cursor-pointer transition-colors duration-300">
                                    <XIcon size={20} />
                                </button>
                            </div>
                            {menuItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <button key={item.name} onClick={item.onClickFunc} className="cursor-pointer">
                                        <div
                                            className={
                                                `flex items-center py-3 px-4 gap-3 ${isActive
                                                    ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                                                    : "hover:bg-gray-100/90 border-white"
                                                }`
                                            }
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={`${item.name.toLowerCase()}_icon`}
                                                className="w-7 h-7"
                                            />
                                            <p className='text-center'>{item.name}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SideBar;
