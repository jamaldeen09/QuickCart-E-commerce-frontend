"use client"
import React from "react";
import { motion, Variants } from "framer-motion";
import {  Users, Award, Globe, Heart, Star, Shield, HeadphonesIcon } from "lucide-react";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import { useRouter } from "next/navigation";


const About = (): React.ReactElement => {
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

  const containerVariants: Variants  = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.2,
      },
    },
  };

  const stats = [
    { icon: Users, value: "500K+", label: "Happy Customers" },
    { icon: Globe, value: "50+", label: "Countries" },
    { icon: Award, value: "25+", label: "Industry Awards" },
    { icon: Heart, value: "98%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly push boundaries to create products that redefine what's possible.",
      icon: Star,
      color: "text-blue-500"
    },
    {
      title: "Quality",
      description: "Every product undergoes rigorous testing to ensure exceptional performance.",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Customer Focus",
      description: "Our customers inspire us to create technology that enhances their lives.",
      icon: Heart,
      color: "text-orange-500"
    },
    {
      title: "Reliability",
      description: "Dependable products backed by excellent customer service and support.",
      icon: HeadphonesIcon,
      color: "text-purple-500"
    }
  ];
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="20" cy="20" r="15" fill="currentColor" className="text-orange-200" />
            <circle cx="80" cy="80" r="10" fill="currentColor" className="text-orange-200" />
            <circle cx="70" cy="30" r="8" fill="currentColor" className="text-orange-200" />
          </svg>
        </div>
        
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Story
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-700 max-w-2xl mx-auto">
            Pioneering the future of technology with innovation, quality, and customer satisfaction at our core.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 20, we set out with a simple goal: to bring cutting-edge technology to everyone without compromising on quality or experience.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Today, we continue to push boundaries in audio, computing, and gaming technology, creating products that enhance everyday life and transform how people interact with technology.
              </p>
              
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-md p-8">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="90" fill="#FEEBC8" stroke="#ED8936" strokeWidth="2" />
                  <circle cx="100" cy="100" r="70" fill="#FBD38D" stroke="#ED8936" strokeWidth="2" />
                  <circle cx="100" cy="100" r="50" fill="#F6AD55" stroke="#ED8936" strokeWidth="2" />
                  <circle cx="100" cy="100" r="30" fill="#ED8936" stroke="#C05621" strokeWidth="2" />
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16" fontWeight="bold">TECHNOLOGY</text>
                  <text x="100" y="125" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">EXCELLENCE</text>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-md"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon size={40} className="text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{stat.value}</h3>
                <p className="text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Values</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do, from product development to customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`flex justify-center mb-4 ${value.color}`}>
                  <value.icon size={40} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{value.title}</h3>
                <p className="text-gray-700 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-orange-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto max-w-4xl text-center bg-white rounded-2xl p-12 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Join Our Journey</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the difference that passion for technology and commitment to excellence can make.
          </p>
          <button onClick={() => router.push("/shop")} className="cursor-pointer py-3 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium transition-all duration-300">
            Explore Our Products
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;