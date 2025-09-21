"use client"
import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Banner = (): React.ReactElement => {
    const router = useRouter();
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 mt-16 mb-16">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-50 rounded-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
                    </div>

                    {/* left image */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative z-10 p-6 lg:p-0 lg:pl-10"
                    >
                        <Image
                            className="max-w-56 lg:max-w-64 transform hover:scale-105 transition-transform duration-700"
                            src={assets.jbl_soundbox_image}
                            alt="jbl_soundbox_image"
                            width={256}
                            height={256}
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative z-10 flex flex-col items-center text-center space-y-4 px-6 py-8 lg:py-14"
                    >
                        <h2 className="text-2xl lg:text-4xl font-bold max-w-md leading-tight">
                            Level Up Your <span className="text-orange-500">Gaming Experience</span>
                        </h2>
                        <p className="text-gray-700 max-w-md text-lg">
                            From immersive sound to precise controls—everything you need to dominate the game
                        </p>
                        <motion.button
                            onClick={() => router.push("/shop")}
                            className="group mt-4 flex 
                            cursor-pointer items-center justify-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                        >
                            Shop Now
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src={assets.arrow_icon_white}
                                    alt="arrow_icon_white"
                                    width={16}
                                    height={16}
                                />
                            </motion.span>
                        </motion.button>
                    </motion.div>

                    {/* right image */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative z-10 p-6 lg:p-0 lg:pr-10"
                    >
                        <Image
                            className="max-w-56 lg:max-w-80 transform hover:scale-105 transition-transform duration-700"
                            src={assets.md_controller_image}
                            alt="md_controller_image"
                            width={320}
                            height={320}
                        />
                    </motion.div>

                    {/* decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;