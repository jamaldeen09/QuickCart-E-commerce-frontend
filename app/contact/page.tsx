"use client"
import React from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send, HeadphonesIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "../components/landingPage/Footer";
import Navbar from "../components/landingPage/Navbar";
import { callToast } from "../utils/authHandlers";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    subject: z.string().min(5, {
        message: "Subject must be at least 5 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

const Contact = (): React.ReactElement => {
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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.13,
                delayChildren: 0.2,
            },
        },
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit() {
        callToast("success", "Message submitted");
        form.reset();
    }

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            content: "+1 (555) 123-4567",
            subcontent: "Mon-Fri from 8am to 5pm"
        },
        {
            icon: Mail,
            title: "Email",
            content: "support@techstore.com",
            subcontent: "We'll respond within 24 hours"
        },
        {
            icon: MapPin,
            title: "Office",
            content: "123 Tech Street, Silicon Valley",
            subcontent: "CA 94301, United States"
        },
        {
            icon: HeadphonesIcon,
            title: "Support",
            content: "24/7 Customer Support",
            subcontent: "Dedicated help when you need it"
        }
    ];

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
                        Get in Touch
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Have questions or need assistance? We're here to help you with all your tech needs.
                    </motion.p>
                </motion.div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 h-fit"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Send us a message</h2>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your.email@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="What is this regarding?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us how we can help you..."
                                                        className="min-h-[150px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-600 hover:bg-orange-700 py-3 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        Send Message
                                        <Send size={18} />
                                    </Button>
                                </form>
                            </Form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                                <p className="text-lg text-gray-700 mb-8">
                                    Reach out to us through any of these channels. Our team is ready to assist you with any questions about our products or services.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100"
                                    >
                                        <div className="p-3 bg-orange-100 rounded-full">
                                            <item.icon className="text-orange-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                            <p className="text-gray-900">{item.content}</p>
                                            <p className="text-sm text-gray-600">{item.subcontent}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* FAQ Quick Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="p-6 rounded-xl bg-white border border-orange-100 shadow-sm"
                            >
                                <h3 className="font-semibold text-gray-900 mb-4">Quick Help</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <a href="#" className="text-orange-600 hover:underline">Shipping & Delivery</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <a href="#" className="text-orange-600 hover:underline">Returns & Refunds</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <a href="#" className="text-orange-600 hover:underline">Product Support</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <a href="#" className="text-orange-600 hover:underline">Technical Specifications</a>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-orange-50 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Find quick answers to common questions about our products and services.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "How long does shipping take?",
                                answer: "Standard shipping takes 3-5 business days. Express shipping is available for delivery within 1-2 business days."
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 30-day return policy on all unused products in original packaging. Some restrictions may apply."
                            },
                            {
                                question: "Do you offer technical support?",
                                answer: "Yes, we provide free technical support for all our products for the first year after purchase."
                            },
                            {
                                question: "Are your products covered by warranty?",
                                answer: "All our products come with a standard 1-year manufacturer warranty. Extended warranties are available."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-white shadow-sm border border-orange-100"
                            >
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-700">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;