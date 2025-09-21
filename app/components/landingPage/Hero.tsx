"use client"
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/app/assets/assets";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxTypes";
import { callToast } from "@/app/utils/authHandlers";
import { ProductSystem } from "@/app/api/product";
import { PopulatedCart } from "../../../../server/src/types/productTypes";
import { updateCart } from "@/app/redux/data/profileSlice";
import LoadingSpinner from "../reusable/LoadingSpinner";

interface ActionButton {
  buttonTxt: string;
  id: number;
  icon?: StaticImageData;
  variant: "primary" | "secondary";
  funcToExecute?: () => void;
}

interface HeroSectionDataSchema {
  title: string;
  heading: string;
  description?: string;
  actionButtons: ActionButton[];
  productImage: StaticImageData;
  id: string;
}

const Hero = (): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const router = useRouter();
  const { fullname, _id, email, } = useAppSelector((state) => state.profileInformation);
  const { products } = useAppSelector((state) => state.products);
  const getId = (id: string) => products.find((product) => product._id === id);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const heroSectionData: HeroSectionDataSchema[] = [
    {
      title: "Limited Time Offer - 30% Off",
      heading: "Experience Pure Sound",
      description: "Premium noise cancellation with crystal clear audio quality for the ultimate listening experience.",
      actionButtons: [
        {
          buttonTxt: "Buy Now", id: 1, variant: "primary",
        },
        { 
          buttonTxt: "Explore Features", 
          id: 2, 
          variant: "secondary", 
          funcToExecute: () => router.push("/product?id=67a1f52e3f34a77b6dde914a") 
        },
      ],
      productImage: assets.bose_headphone_image,
      id: "67a1f52e3f34a77b6dde914a",
    },
    {
      title: "Exclusive Deal - 40% Off",
      heading: "Power Meets Elegance",
      description: "The new MacBook Pro with M3 chip delivers unprecedented performance for professionals.",
      actionButtons: [
        { buttonTxt: "Order Now", id: 1, variant: "primary" },
        { 
          buttonTxt: "View Specs", 
          id: 2, 
          variant: "secondary", 
          funcToExecute: () => router.push("/product?id=67a1f7c93f34a77b6dde915a") 
        },
      ],
      productImage: assets.macbook_image,
      id: "67a1f7c93f34a77b6dde915a",

    },
    {
      title: "Hurry - Limited Stock!",
      heading: "Next-Level Gaming",
      description: "Immerse yourself in stunning 4K gaming with lightning-fast load times and haptic feedback.",
      actionButtons: [
        { buttonTxt: "Shop Now", id: 1, variant: "primary" },
        { 
          buttonTxt: "View Details", 
          id: 2, 
          variant: "secondary", 
          funcToExecute: () => router.push("/product?id=67a1f5ef3f34a77b6dde9150") 
        },
      ],
      productImage: assets.playstation_image,
      id: "67a1f5ef3f34a77b6dde9150",
    },
  ];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSectionData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, heroSectionData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSectionData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSectionData.length) % heroSectionData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const updateClientsCart = (data: PopulatedCart) => {
    dispatch(updateCart(data));
  }

  // Handle button click based on variant
  const handleButtonClick = (button: ActionButton, productId: string) => {
    if (button.variant === "secondary" && button.funcToExecute) {
      button.funcToExecute();
    } else {
      if (
        (!_id || _id.trim() === "") ||
        (!fullname || fullname.trim()) === "" ||
        (!email || email.activeEmail.trim() === "")
      ) {
        return callToast("error", "Sign in to buy this product");
      } else {
        setAutoPlay(false);
        return ProductSystem.addItemToCart(
          getId(productId)?._id as string,
          setIsBuying,
          updateClientsCart,
          "buying",
          router
        );
      }
    }
  };

  return (
    <section className="relative h-[120vh] lg:h-[80vh] overflow-hidden scrollbar-hide">
      {heroSectionData.map((data, index): React.ReactElement => (
        <div
          key={data.id}
          className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center px-4 md:px-8 lg:px-16 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl">

            {/* content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={`flex flex-col space-y-6  text-center lg:text-left order-2 lg:order-1`}>
              <motion.p
                variants={itemVariants}
                className={`text-sm uppercase tracking-wider font-semibold text-orange-600`}
              >
                {data.title}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {data.heading}
              </motion.h1>

              {data.description && (
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl opacity-90 max-w-md mx-auto lg:mx-0">
                  {data.description}
                </motion.p>
              )}

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6"
              >
                {data.actionButtons.map((button) => (
                  <button
                    disabled={isBuying && button.variant === "primary"}
                    onClick={() => handleButtonClick(button, data.id)}
                    key={button.id}
                    className={`py-3 rounded-full font-medium transition-all duration-300 ${isBuying && button.variant === "primary" ? "cursor-not-allowed brightness-75 px-4" : "cursor-pointer px-6"} ${button.variant === "primary"
                      ? "bg-orange-600 hover:brightness-90 shadow-lg text-white"
                      : "flex-center gap-2 group border border-orange-600 text-orange-600"
                      }`}
                  >
                    {isBuying && button.variant === "primary" ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <div className="flex items-center gap-2">
                        {button.buttonTxt}
                        {button.variant === "secondary" && (
                          <ArrowRight size={18}  className="group-hover:translate-x-2 transition-transform duration-300"/> 
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.2, damping: 9, stiffness: 100 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
            >
              <div className="relative w-full max-w-md">
                <Image
                  src={data.productImage}
                  alt="Featured product"
                  className="object-contain transform hover:scale-105 transition-transform duration-700"
                  priority={index === 0}
                />

                {/* Decorative elements */}
                <div className="absolute -z-10 top-10 -left-10 w-72 h-72 rounded-full bg-white opacity-10 blur-xl"></div>
                <div className="absolute -z-10 bottom-10 -right-10 w-64 h-64 rounded-full bg-white opacity-10 blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:flex space-x-3">
        {heroSectionData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-600 scale-125' : 'bg-orange-100'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Autoplay toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
      >
        {autoPlay ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </section>
  );
};

export default Hero;