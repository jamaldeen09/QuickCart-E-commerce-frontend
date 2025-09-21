"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"
import { assets } from "@/app/assets/assets";
import Image, { StaticImageData } from "next/image";
import { NavIcon } from "./Navbar";
import { useResizer } from "@/app/customHooks/resizer";
import { useRouter } from "next/navigation";


interface FeaturedProductCardProps {
    heading: string;
    description: string;
    image: StaticImageData;
    index: number;
    route: string;
}

const FeaturedProductCard = ({
    heading,
    description,
    image,
    index,
    route,
}: FeaturedProductCardProps) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    const router = useRouter();
    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group h-[400px] relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <Image
                src={image}
                fill
                unoptimized
                alt="featured_product_illustration"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <motion.h3
                    className="font-bold text-2xl mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                    {heading}
                </motion.h3>

                <motion.p
                    className="text-gray-200 mb-4 max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    className="w-fit"
                >
                    <button
                        onClick={() => router.push(route)}
                        className="cursor-pointer bg-orange-600 hover:bg-orange-700 flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        Shop Now
                        <NavIcon
                            src={assets.redirect_icon}
                            alt="redirect_icon"
                            size={16}
                        />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}


const FeaturedProducts = (): React.ReactElement => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

    interface FeaturedProduct {
        image: StaticImageData;
        heading: string;
        description: string;
        id: number;
        route: string;
    }

    const featuredProductsData: FeaturedProduct[] = [
        {
            image: assets.girl_with_headphone_image,
            heading: "Unparalleled Sound",
            description: "Experience crystal-clear audio with our premium noise-cancelling headphones.",
            id: 1,
            route: "/product?id=67a1f52e3f34a77b6dde914a"
        },
        {
            image: assets.girl_with_earphone_image,
            heading: "Stay Connected",
            description: "Compact and stylish wireless earphones for music on the go.",
            id: 2,
            route: "/product?id=67a1f4e43f34a77b6dde9144"
        },
        {
            image: assets.boy_with_laptop_image,
            heading: "Power in Every Pixel",
            description: "High-performance laptops for work, creativity, and entertainment.",
            id: 3,
            route: "/product?id=67a1f7c93f34a77b6dde915a"
        },
    ];

    const [screenSize] = useResizer(1200);
    const router = useRouter();
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Featured Products
                    </h2>
                    <div className="w-20 h-1 bg-orange-600 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Discover our most popular products loved by thousands of customers
                    </p>
                </motion.div>

                <div className={`grid gap-8 ${screenSize ? "grid-cols-1 md:grid-cols-2" : "lg:grid-cols-3"}`}>
                    {featuredProductsData.map((data, index) => (
                        <FeaturedProductCard
                            key={data.id}
                            heading={data.heading}
                            description={data.description}
                            image={data.image}
                            index={index}
                            route={data.route}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={sectionInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <button onClick={() => router.push("/shop")} className="cursor-pointer border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
                        View All Products
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProducts;