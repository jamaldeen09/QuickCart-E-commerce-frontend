'use client'
import Image from "next/image";
import Navbar from "../components/landingPage/Navbar";
import { assets } from "../assets/assets";
import Footer from "../components/landingPage/Footer";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProductSystem } from "../api/product";
import { useState } from "react";
import { useAppDispatch } from "../redux/reduxTypes";
import { IAddress } from "../../../server/src/models/Address";
import { addNewAddress } from "../redux/data/profileSlice";
import LoadingSpinner from "../components/reusable/LoadingSpinner";
import { useRouter } from "next/navigation";

const addressValidation = z.object({
    fullname: z.string().min(2, { error: "Full name must be at least 2 characters" }),
    phoneNumber: z.string()
        .min(1, { message: "Phone number is required" })
        .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number cannot exceed 15 digits" }),
    address: z.string().min(2, { error: "Address must be at least 2 characters" }),
    pincode: z.string()
        .min(1, { message: "Pincode is required" })
        .regex(/^\d+$/, { message: "Pincode must contain only numbers" })
        .length(6, { message: "Pincode must be exactly 6 digits" }),
    city: z.string().min(2, { error: "City must be at least 2 characters" }),
    state: z.string().min(2, { error: "State must be at least 2 characters" }),
})

const AddAddress = () => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useAppDispatch()
    const generatedAddressSchema = useForm<z.infer<typeof addressValidation>>({
        resolver: zodResolver(addressValidation),
        defaultValues: {
            fullname: "",
            phoneNumber: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
        },
        mode: "onChange"
    })
    const onSubmit = (values: z.infer<typeof generatedAddressSchema>) => {
        return ProductSystem.saveAddress(
            setIsSaving,
            values as Omit<IAddress, "userId">,
            (data: Omit<IAddress, "userId">) => dispatch(addNewAddress(data)),
            router
        )
    }
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <Form {...generatedAddressSchema}>
                    <form onSubmit={generatedAddressSchema.handleSubmit(onSubmit)} method="POST" className="w-full">
                        <p className="text-2xl md:text-3xl text-gray-500">
                            Add Shipping <span className="font-semibold text-orange-600">Address</span>
                        </p>
                        <div className="space-y-3 max-w-sm mt-10">
                            <FormField
                                name="fullname"
                                control={generatedAddressSchema.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                                type="text"
                                                placeholder="Full name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="phoneNumber"
                                control={generatedAddressSchema.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                                type="text"
                                                placeholder="Phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="pincode"
                                control={generatedAddressSchema.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>

                                            <Input
                                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                                type="number"
                                                placeholder="Pin code"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="address"
                                control={generatedAddressSchema.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                                                {...field}
                                                rows={4}
                                                placeholder="Address (Area and Street)"
                                            ></Textarea>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="flex space-x-3">

                                <FormField
                                    name="city"
                                    control={generatedAddressSchema.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>

                                                <Input
                                                    className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                                    type="text"
                                                    placeholder="City/District/Town"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    name="state"
                                    control={generatedAddressSchema.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>

                                                <Input
                                                    className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                                    type="text"
                                                    placeholder="State"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button disabled={isSaving} type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase cursor-pointer">
                            {isSaving ? (
                                <LoadingSpinner size="sm" />
                            ) : "Save address"}
                        </Button>
                    </form>
                </Form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;