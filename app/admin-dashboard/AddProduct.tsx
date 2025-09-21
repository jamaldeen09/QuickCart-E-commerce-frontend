"use client";
import Image from "next/image";
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AdminSystem } from "../api/admin";
import { useAppDispatch } from "../redux/reduxTypes";
import { ConfiguredProduct } from "../redux/data/productSlice";
import { newProduct } from "../redux/data/adminDataSlice";
import LoadingSpinner from "../components/reusable/LoadingSpinner";

// Zod validation schema
const formSchema = z.object({
    images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
    name: z.string().min(1, "Product name is required").max(100, "Name too long"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description too long"),
    category: z.enum(["Earphone", "Headphone", "Watch", "Smartphone", "Laptop", "Camera", "Accessories"]),
    price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    offerPrice: z.string().min(1, "Offer price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
}).refine((data) => parseFloat(data.offerPrice) <= parseFloat(data.price), {
    message: "Offer price cannot be higher than regular price",
    path: ["offerPrice"],
});

type FormValues = z.infer<typeof formSchema>;

const AddProduct = (): React.ReactElement => {
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter()
    const productSystem: AdminSystem = new AdminSystem(router)
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "Earphone",
            price: "",
            offerPrice: "",
            images: [],
        },
    });

    const handleSubmit = async (values: FormValues) => {
        const data = new FormData();

        data.append("price", values.price)
        data.append("name", values.name)
        data.append("category", values.category)
        data.append("description", values.description)
        data.append("offerPrice", values.offerPrice)
        values.images.forEach((file) => {
            if (file) {
                data.append('images', file);
            }
        });
        return productSystem.createProduct(data,
            (data: ConfiguredProduct) => dispatch(newProduct(data)),
            setIsCreating,
            () => {
                setFiles([])
                form.reset()
            }
        )
    };

    const handleImageChange = (index: number, file: File) => {
        const updatedFiles = [...files];
        updatedFiles[index] = file;
        setFiles(updatedFiles);
        form.setValue("images", updatedFiles.filter(Boolean) as File[]);
    };

    return (
        <Card className="w-full max-w-xl border-0 border-transparent shadow-none rounded-none p-6">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Product Images */}
                        <FormField
                            control={form.control}
                            name="images"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Product Images</FormLabel>
                                    <FormDescription>Upload up to 4 images for your product</FormDescription>
                                    <FormControl>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 ">
                                            {[...Array(4)].map((_, index) => (
                                                <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        id={`image${index}`}
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleImageChange(index, file);
                                                            }
                                                        }}
                                                        accept="image/*"
                                                    />
                                                    <Image
                                                        className="w-20 h-20 object-cover border rounded-md"
                                                        src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                                        alt={`Product image ${index + 1}`}
                                                        width={96}
                                                        height={96}
                                                        unoptimized
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Product Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="product-name">Product Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="product-name"
                                            placeholder="Enter product name"
                                            className="h-12 rounded-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Product Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="product-description">Product Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="product-description"
                                            placeholder="Enter product description"
                                            rows={4}
                                            className="rounded-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category, Price, and Offer Price */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="rounded-none">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Earphone">Earphone</SelectItem>
                                                <SelectItem value="Headphone">Headphone</SelectItem>
                                                <SelectItem value="Watch">Watch</SelectItem>
                                                <SelectItem value="Smartphone">Smartphone</SelectItem>
                                                <SelectItem value="Laptop">Laptop</SelectItem>
                                                <SelectItem value="Camera">Camera</SelectItem>
                                                <SelectItem value="Accessories">Accessories</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="rounded-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Offer Price */}
                            <FormField
                                control={form.control}
                                name="offerPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Offer Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="rounded-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button disabled={isCreating} type="submit" className="w-full md:w-auto bg-orange-600 cursor-pointer hover:bg-orange-500">
                            {isCreating ? (
                                <LoadingSpinner size="sm" />
                            ) : "ADD PRODUCT"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AddProduct;