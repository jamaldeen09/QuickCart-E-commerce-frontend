"use client"
import { useResizer } from "@/app/customHooks/resizer";
import React from "react";
import ScrollFadeIn from "../reusable/ScrollFadeIn";
import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { callToast } from "@/app/utils/authHandlers";

const subscribeValidtion = z.object({
    email: z.string().email({ message: "Invalid email address" })
})

const Subscribe = (): React.ReactElement => {
    const [screenSize] = useResizer(344);

    const subscribeSchema = useForm<z.infer<typeof subscribeValidtion>>({
        resolver: zodResolver(subscribeValidtion),
        defaultValues: {
            email: ""
        },
        mode: "onChange"
    });

    const onSubmit = () => {
        callToast("success", "Subscription succesfull");
        subscribeSchema.reset();
    }
    return (
        <ScrollFadeIn>
            <section
                className="h-fit mt-10 px-4"
            >
                <div className="w-full max-w-7xl mx-auto h-fit">

                    <div className="flex flex-col gap-1 text-center">
                        <h1 className="font-bold text-gray-700 text-2xl md:text-4xl">Subscribe now & get 20% off</h1>
                        <p className="text-gray-400/80 text-xs md:text-sm w-full max-w-xl mx-auto">
                            Lorem ipsum is simply dummy text of the printing and typesetting industry
                        </p>
                    </div>

                    {/* input field */}
                    <Form {...subscribeSchema}>
                        <div className="flex flex-col gap-2">
                            <div className="relative w-full max-w-sm md:max-w-xl mx-auto mt-10">

                                <form onSubmit={subscribeSchema.handleSubmit(onSubmit)} method="POST">
                                    <FormField
                                        name="email"
                                        control={subscribeSchema.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormMessage />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className={`focus:outline-none focus:ring-2 focus:ring-orange-600 px-6 h-16 rounded-sm shadow-sm
                      transition-all duration-300 w-full border border-gray-200 focus:border-transparent
                      `}
                                                        type="email"
                                                        placeholder="Enter your email"
                                                    />
                                                </FormControl>

                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className={`mt-4 bottom-0 h-16 w-full ${screenSize ? "text-xs" : "text-base "}
                      bg-orange-600 text-white cursor-pointer hover:bg-orange-500 transition-all duration-300 rounded-sm `}
                                    >
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Form>
                </div>
            </section>
        </ScrollFadeIn>
    );
};

export default Subscribe;