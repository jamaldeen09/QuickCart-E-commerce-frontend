"use client"
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod"
import { authenticationSchemaProvider, ValidAuthTypes } from "@/app/utils/authHandlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxTypes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { setTrigger, TriggerKeyPayload } from "@/app/redux/triggers/triggers";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/app/utils/icons";
import { Input } from "@/components/ui/input";
import { AuthenticationSystem } from "@/app/api/auth";
import { RegistrationPayload } from "../../../../server/src/types/authTypes";
import LoadingSpinner from "./LoadingSpinner";
import { getDetails, getFieldDetails, getLink } from "@/app/utils/tsxHelpers";
import { useResizer } from "@/app/customHooks/resizer";
import { ConfiguredProfilePayload, getProfile } from "@/app/redux/data/profileSlice";


export const handleTriggerPayload = (
    trigger: TriggerKeyPayload,
    value: boolean,
) => {
    return { key: trigger, value }
};

const AuthModal = ({
    url = "DEVELOPMENT",
}: { url?: "DEVELOPMENT" | "PRODUCTION" }): React.ReactElement => {
    const searchParams = useSearchParams();
    const auth = searchParams.get("auth") || "register";
    const email = searchParams.get("email") || "";
    const [payloadValue, setPayloadValue] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResending, setIsResending] = useState<boolean>(false);
    const pathname = usePathname();
    const id = searchParams.get("id");

    const generatedSchema = authenticationSchemaProvider(auth as ValidAuthTypes || "register");
    const defaultValues = useMemo(() => {
        switch (auth) {
            case "register":
                return { firstname: "", lastname: "", email: "", password: "" };
            case "login":
                return { email: "", password: "" };
            case "password-reset":
                return { email: "" };
            case "change-password":
                return { newPassword: "", confirmPassword: "" };
            case "otp-verification":
                return { otp: "" };
            default:
                return {};
        }
    }, [auth]);
    const generatedForm = useForm<z.infer<typeof generatedSchema>>({
        resolver: zodResolver(generatedSchema),
        defaultValues,
        mode: "onChange",
    });
    const { authModal } = useAppSelector((state) => state.triggers);
    const dispatch = useAppDispatch();
    const payload = handleTriggerPayload("authModal", payloadValue);
    const router = useRouter();
    const shouldDisableButton = auth === "password-reset" || auth === "otp-verification" || auth === "change-password";
    const authSystem: AuthenticationSystem = new AuthenticationSystem(isLoading, setIsLoading, router);

    const renderFormFields = () => {
        const fields = getFieldDetails(auth);
        if (!fields) return null;

        // Add safety check to ensure fields exist in schema
        const schemaFields = Object.keys(generatedSchema.shape);

        if (auth === "register") {
            const nameFields = fields.filter(detail =>
                detail.name === "firstname" || detail.name === "lastname"
            );
            const otherFields = fields.filter(detail =>
                detail.name !== "firstname" && detail.name !== "lastname"
            );

            return (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nameFields.map((detail) => {
                            if (!schemaFields.includes(detail.name)) return null;
                            const fieldName = detail.name as keyof z.infer<typeof generatedSchema>;

                            return (
                                <FormField
                                    key={detail.name}
                                    control={generatedForm.control}
                                    name={fieldName}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{detail.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={detail.placeholder}
                                                    type={detail.type}
                                                    {...field}
                                                    value={field.value || ""}
                                                    className="h-10 px-4 text-sm rounded-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            );
                        })}
                    </div>

                    {otherFields.map((detail) => {
                        if (!schemaFields.includes(detail.name)) return null;
                        const fieldName = detail.name as keyof z.infer<typeof generatedSchema>;

                        return (
                            <FormField
                                key={detail.name}
                                control={generatedForm.control}
                                name={fieldName}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{detail.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={detail.placeholder}
                                                type={detail.type}
                                                {...field}
                                                value={field.value || ""}
                                                className="h-10 px-4 text-sm rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                </>
            );
        }

        return fields.map((detail) => {
            if (!schemaFields.includes(detail.name)) return null;
            const fieldName = detail.name as keyof z.infer<typeof generatedSchema>;

            return (
                <FormField
                    key={detail.name}
                    control={generatedForm.control}
                    name={fieldName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{detail.label}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={detail.placeholder}
                                    type={detail.type}
                                    {...field}
                                    value={field.value || ""}
                                    className="h-10 px-4 text-sm rounded-lg"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
        });
    };

    const onSubmit = async (values: z.infer<typeof generatedSchema>) => {

        const disableModal = () => dispatch(setTrigger({ key: "authModal", value: false }));
        const extractData = (data: ConfiguredProfilePayload) => {
            dispatch(getProfile(data))
        }

        if (auth === "register") {
            return authSystem.register(values as RegistrationPayload, disableModal, extractData);
        } else if (auth === "login") {
            return authSystem.login(values as Omit<RegistrationPayload, "firstname" | "lastname">, disableModal, extractData);
        } else if (auth === "password-reset") {
            return authSystem.passwordReset(values as { email: string },
                () => dispatch(setTrigger({ key: "authModal", value: true })),
                pathname,
                id as string,
            );
        } else if (auth === "otp-verification") {
            return authSystem.verifyOtp(
                values as { otp: string },
                () => dispatch(setTrigger({ key: "authModal", value: true })),
                pathname,
                id as string,
            )
        } else if (auth === "change-password") {
            return authSystem.changePassword(
                {
                    password: (values as {
                        newPassword: string;
                        confirmPassword: string;
                    }).confirmPassword
                },
                () => dispatch(setTrigger({ key: "authModal", value: true })),
                pathname,
                id as string,
            )
        } else {
            return null;
        }
    }

    useEffect(() => {
        if (authModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }
    }, [authModal]);

    useEffect(() => {
        setIsLoading(false);
        generatedForm.reset(defaultValues);
    }, [auth, generatedForm, defaultValues, authModal]);

    useEffect(() => {
        if (auth === "otp-verification") {
            AuthenticationSystem.validateOtpStatus(router, pathname,
                id as string,);
            dispatch(setTrigger({ key: "authModal", value: true }));
        } else if (auth === "change-password") {
            AuthenticationSystem.validatePasswordResetStatus(router, pathname,
                id as string,);
            dispatch(setTrigger({ key: "authModal", value: true }));
        }
    }, [dispatch, auth, id, pathname, router])

    const [screenSize] = useResizer(640);
    const styles = {
        annoyingScreensStyles: "rounded-none h-full overflow-y-auto",
        normalScreensStyles: "sm:overflow-y-hidden sm:h-fit sm:rounded-lg sm:max-w-md md:max-w-lg"
    }
    return (
        <AnimatePresence>
            {authModal && (

                // overlay
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    key="auth-modal-overlay"
                    className={`inset-0 fixed top-0 h-full bg-black/90 flex-center z-50 ${screenSize ? "px-0" : "sm:px-4"}`}
                >

                    {/* authentication form */}
                    <Form {...generatedForm}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={auth === "otp-verification" || auth === "change-password" ? { duration: 0.2, delay: 0.4 } : { duration: 0.2 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            key="auth-modal"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}

                            className={`bg-white w-full  ${screenSize ? styles.annoyingScreensStyles : styles.normalScreensStyles} py-6 px-6 
                            `}
                        >
                            {/* header */}
                            <header>
                                {/* x icon container */}
                                <div className="flex-end mb-3">
                                    <button
                                        disabled={isLoading}
                                        onClick={() => {
                                            setPayloadValue(false);

                                            if (payloadValue === false) {
                                                dispatch(setTrigger(payload));
                                                router.push(
                                                    `${pathname}${id ? `?id=${id}` : ""}`
                                                );
                                            }
                                        }}
                                        className={`rounded-lg p-2 ${isLoading ? "cursor-not-allowed brightness-90" : "cursor-pointer hover:bg-gray-100"}
                                      transition-colors duration-300`}
                                    >
                                        <XIcon size={17} className="text-gray-600" />
                                    </button>
                                </div>

                                {/* heading + description */}
                                <div className="text-center w-full max-w-sm mx-auto">
                                    {getDetails(auth)}
                                </div>

                                {/* oAuth button */}
                                <div className="w-full mt-3 my-6">
                                    <Button
                                        onClick={() => {
                                            window.location.href = url === "DEVELOPMENT" ? "http://localhost:4080/api/auth/google" : "";
                                        }}
                                        disabled={shouldDisableButton}
                                        variant="outline"
                                        className="w-full rounded-lg cursor-pointer text-gray-600 h-10"
                                    >
                                        <GoogleIcon />
                                        Continue with google
                                    </Button>
                                </div>

                                {/* divider */}
                                <div className="relative w-full px-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-2 text-gray-400 dark:bg-black">or</span>
                                    </div>
                                </div>
                            </header>
                            <form
                                method="POST"
                                onSubmit={generatedForm.handleSubmit(onSubmit)}
                                className="space-y-5 mt-4"
                            >
                                {renderFormFields()}
                                {auth === "login" && (
                                    <div
                                    >
                                        <p className="w-fit text-xs text-gray-600 ">
                                            Forgot your password? <span
                                                onClick={() => router.push(`${pathname}${id ? `?id=${id}&auth=password-reset` : "?auth=password-reset"}`)}
                                                className="text-blue-600 cursor-pointer hover:brightness-75 transition-all duration-300">Reset it here!</span>
                                        </p>
                                    </div>
                                )}
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className={`w-full h-10 rounded-lg cursor-pointer ${auth === "login" ? "sm:mt-0" : "sm:mt-2"}`}
                                >
                                    {isLoading ? (
                                        <LoadingSpinner size="sm" />
                                    ) : "Continue"}
                                </Button>
                            </form>
                            <div className="text-center sm:mt-6 text-gray-600 text-sm mt-4">
                                {getLink(auth, router, isLoading, isResending,
                                    () => authSystem.resendOtp(
                                        { email },
                                        setIsResending,
                                    ),
                                    pathname,
                                    id as string,
                                )}
                            </div>
                        </motion.div>
                    </Form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;