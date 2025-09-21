"use client"
import { ProfilePayload, RegistrationPayload } from './../../../server/src/types/authTypes';
import { Actiontype } from "../types/generalTypes";
import { callToast } from "../utils/authHandlers";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { axiosHandlers } from '../config/axiosConfig';
import { ConfiguredProfilePayload } from '../redux/data/profileSlice';
import { formatDate } from '../utils/generalHelpers';
import { ConfiguredProduct } from '../redux/data/productSlice';

export class AuthenticationSystem {
    public loadingState: boolean;
    public setLoadingState: Actiontype<boolean>;
    public appRouter: AppRouterInstance;

    constructor(
        loadingState: boolean,
        setLoadingState: Actiontype<boolean>,
        appRouter: AppRouterInstance,
    ) {
        this.loadingState = loadingState;
        this.setLoadingState = setLoadingState;
        this.appRouter = appRouter
    }


    async register(
        data: RegistrationPayload,
        disableModal: () => void,
        extractData: (data: ConfiguredProfilePayload) => void,
    ) {
        try {
            this.setLoadingState(true);
            const response = await axiosHandlers.axios.post("/api/auth/register", data);

            extractData(AuthenticationSystem.formatProfilePayload(response.data.data.profile as ProfilePayload));
            this.setLoadingState(false);
            callToast("success", response.data.message);
            disableModal();
            this.appRouter.push("/")
        } catch (err: unknown) {
            this.setLoadingState(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message);
            } else {
                console.error("Registration Failed: ", err);
                callToast("error", "Registration Failed");
            }
        }
    }

    static formatProfilePayload(profile: ProfilePayload): ConfiguredProfilePayload {
        const configuredPayload = {
            _id: profile._id,
            status: profile.status,
            cart: profile.cart,
            avatar: profile.avatar,
            email: profile.email,
            fullname: profile.fullname,
            createdAt: formatDate(profile.createdAt),
            updatedAt: formatDate(profile.updatedAt),
            role: profile.role,
            likedProducts: profile.likedProducts.map((product) => {
                return { ...product, createdAt: formatDate(product?.createdAt) || "", updatedAt: formatDate(product?.updatedAt) || ""}
            }),
            savedAddresses: profile.savedAddresses,
            connectedAccounts: profile.connectedAccounts,
            orders: profile?.orders.map((order) => ({
                ...order,
                items: order.items.map((item) => ({
                    ...item,
                    product: {
                        ...item.product,
                        createdAt: formatDate(item.product?.createdAt) || "",
                        updatedAt: formatDate(item.product?.updatedAt) || ""
                    } as ConfiguredProduct
                })),
                createdAt: formatDate(order.createdAt),
                updatedAt: formatDate(order.updatedAt)
            })) || []
        }
        return configuredPayload
    }

    async login(
        data: Omit<RegistrationPayload, "firstname" | "lastname">,
        disableModal: () => void,
        extractData: (data: ConfiguredProfilePayload) => void,
    ) {
        try {
            this.setLoadingState(true);
            const response = await axiosHandlers.axios.post("/api/auth/login", data);

            extractData(AuthenticationSystem.formatProfilePayload(response.data.data.profile as ProfilePayload));
            this.setLoadingState(false);
            callToast("success", response.data.message);
            disableModal();
            this.appRouter.push("/")
        } catch (err: unknown) {
            this.setLoadingState(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message, 5000);
            } else {
                console.error("Log in failed: ", err);
                callToast("error", "Login Failed")
            }
        }
    }

    async passwordReset(
        data: { email: string },
        enableModal: () => void,
        pathname: string,
        id: string,
    ) {
        try {
            this.setLoadingState(true);
            const response = await axiosHandlers.axios.post("/api/auth/password-reset", data);

            this.setLoadingState(false);
            callToast("success", response.data.message);
            this.appRouter.push(`${pathname}${id ? `?id=${id}&auth=otp-verification&email=${encodeURIComponent(data.email)}` : `?auth=otp-verification&email=${encodeURIComponent(data.email)}`}`);
        } catch (err: unknown) {
            this.setLoadingState(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message, 5000);
                if (
                    err.response?.status === 401 || err.response?.status == 403 || err.response?.status === 406
                ) {
                    this.appRouter.push(`${pathname}${id ? `?id=${id}&auth=login` : "?auth=login"}`);
                    enableModal();
                }
            } else {
                console.error("Failed to reset password: ", err);
                callToast("error", "Failed to reset your password", 4000)
            }
        }
    }

    static async validateOtpStatus(
        appRouter: AppRouterInstance,
        pathname: string,
        id: string,
    ) {
        try {
            await axiosHandlers.axios.get("/api/auth/validate-otp-status");
        } catch (err: unknown) {
            appRouter.push(`${pathname}${id ? `?id=${id}&auth=password-reset` : "?auth=password-reset"}`);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message, 5000);
            } else {
                console.error(`Failed to validate clients otp status: ${err}`);
                callToast("error", "Failed to validate your otp status");
            }
        }
    }

    async resendOtp(
        data: { email: string },
        setIsResending: Actiontype<boolean>
    ) {
        try {
            setIsResending(true);
            const response = await axiosHandlers.axios.post("/api/auth/resend-otp", data);

            callToast("success", response.data?.message);
            setIsResending(false);
        } catch (err: unknown) {
            setIsResending(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message)
            } else {
                console.error(`Failed to resend otp: ${err}`);
                callToast("error", "Server error: failed to resend your otp");
            }
        }
    }

    async verifyOtp(
        data: { otp: string },
        enableModal: () => void,
        pathname: string,
        id: string,
    ) {
        try {
            this.setLoadingState(true);
            const response = await axiosHandlers.axios.post("/api/auth/verify-otp", data);

            this.setLoadingState(false);
            callToast("success", response.data.message);
            this.appRouter.push(`${pathname}${id ? `?id=${id}?auth=change-password` : "?auth=change-password"}`);
        } catch (err: unknown) {
            this.setLoadingState(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message, 5000);
                if (
                    err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 406
                ) {
                    this.appRouter.push("/?auth=login");
                    enableModal();
                }
            } else {
                console.error(`Failed to verify client's otp: ${err}`);
                callToast("error", "Server error: failed to verify your otp");
            }
        }
    }

    static async validatePasswordResetStatus(
        appRouter: AppRouterInstance,
        pathname: string,
        id: string,
    ) {
        try {
            await axiosHandlers.axios.get("/api/auth/validate-password-reset-status");
        } catch (err: unknown) {
            appRouter.push(`${pathname}${id ? `?id=${id}&auth=password-reset` : "?auth=password-reset"}`);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message, 5000);
            } else {
                console.error(`Failed to validate clients password reset status: ${err}`);
                callToast("error", "Failed to validate your password reset status");
            }
        }
    }

    async changePassword(
        data: { password: string },
        enableModal: () => void,
        pathname: string,
        id: string,
    ) {
        try {
            this.setLoadingState(true);
            const response = await axiosHandlers.axios.patch("/api/auth/change-password", data);

            this.setLoadingState(false);
            callToast("success", response.data.message);
            this.appRouter.push(`${pathname}${id ? `?id=${id}&auth=login` : "?auth=login"}`);
            enableModal();
        } catch (err: unknown) {
            if (err instanceof axiosHandlers.axiosError) {
                this.setLoadingState(false);
                if (!err.response?.data.message || err.response?.data.message.trim() === "" || err.response?.data.message === undefined || err.response?.data.message === null) return;
                callToast("error", err.response?.data.message);
                if (
                    err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 406
                ) {
                    this.appRouter.push(`${pathname}${id ? `?id=${id}&auth=login` : "?auth=login"}`);
                    enableModal();
                }
            } else {
                console.error(`Error occured during password change: ${err}`);
                callToast("error", "A server error occured while trying to change your password");
            }
        }
    }

    static async fetchProfileInformation(
        extractData: (data: ConfiguredProfilePayload) => void,
        setIsFetching?: Actiontype<boolean>,
    ) {
        try {

            if (setIsFetching) setIsFetching(true);
            const response = await axiosHandlers.axios.get("/api/auth/profile-information");

            if (setIsFetching) setIsFetching(false);
            extractData(response.data);
        } catch (err: unknown) {
            if (setIsFetching) setIsFetching(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    return;
                } else {
                    console.error("Failed to logout: ", err.response?.data.message)
                }
            } else {
                console.error(`Failed to fetch profile information: ${err}`);
                callToast("error", "Failed to fetch profile information")
            }
        }
    }

    static async logout(
        appRouter: AppRouterInstance
    ) {
        try {
            await axiosHandlers.axios.post("/api/auth/logout")
            appRouter.push("/")
        } catch (err: unknown) {
            if (err instanceof axiosHandlers.axiosError) {
                callToast("error", err.response?.data.message);
            } else {
                console.error(`Failed to logout: ${err}`)
                callToast("error", "Server error: failed to logout")
            }
        }
    }

    static async verifyAccount(
        appRouter: AppRouterInstance,
        setShouldMount: Actiontype<boolean>,
        data: { page: "my-orders" | "cart" }
    ) {
        try {
            setShouldMount(false);
            await axiosHandlers.axios.post("/api/auth/protected-route");
            setShouldMount(true);
        } catch (err: unknown) {
            setShouldMount(false);
            appRouter.push("/");
            if (err instanceof axiosHandlers.axiosError) {
                callToast("error",
                    data.page === "my-orders" ?
                        "Sign in to see your order history" :
                        "Sign in to access your cart"
                )
                console.error(`Axios error: ${err}`);
            } else {
                console.error(`Failed to verify client: ${err}`);
            }
        }
    }

    static async addNewEmail(
        data: { email: string },
        setIsAdding: Actiontype<boolean>,
        disableAccModal: (state: boolean) => void,
        addEmail: (email: string) => void,
        appRouter: AppRouterInstance,
        resetForm: () => void,
    ) {
        try {
            setIsAdding(true);
            const response = await axiosHandlers.axios.post("/api/auth/add-email", data);
            addEmail(response.data.data.newEmail);
            setIsAdding(false);
            resetForm();
            callToast("success", response.data.message);
        } catch (err: unknown) {
            setIsAdding(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err)
                if (err.response?.data.message) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        disableAccModal(true);
                        appRouter.push("/");
                        callToast("error", err.response?.data.message);
                    } else {
                        callToast("error", err.response?.data.message);
                    }
                } else { return; }
            } else {
                console.error(`Failed to add new email: ${err}`)
                callToast("error", "Failed to add new email")
            }
        }
    }

    static async switchActiveEmail(
        setIsSwitching: (state: boolean) => void,
        disableAccModal: (state: boolean) => void,
        switchActiveEmail: (email: string) => void,
        appRouter: AppRouterInstance,
        data: { email: string }
    ) {
        try {
            setIsSwitching(true);
            const response = await axiosHandlers.axios.patch("/api/auth/switch-active-email", data);
            switchActiveEmail(response.data.data.activeEmail);
            setIsSwitching(false);
            callToast("success", response.data.message);
        } catch (err: unknown) {
            setIsSwitching(false)
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err);
                if (err.response?.data.message) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        disableAccModal(true);
                        appRouter.push("/");
                        callToast("error", err.response?.data.message);
                    } else {
                        callToast("error", err.response?.data.message);
                    }
                } else { return; }
            } else {
                console.error(`Failed to switch active email: ${err}`);
                callToast("error", "Failed to switch active email")
            }
        }
    }

    static async deleteSavedEmail(
        appRouter: AppRouterInstance,
        disableAccModal: (state: boolean) => void,
        setIsDeleting: (state: boolean) => void,
        data: { email: string },
        updateEmails: (emails: string[]) => void,
    ) {
        try {
            
            setIsDeleting(true)
            const response = await axiosHandlers.axios.patch("/api/auth/delete-saved-email", data);
            updateEmails(response.data.data.updatedEmails);
            setIsDeleting(false);
            callToast("success", response.data.message);
        } catch (err: unknown) {
            setIsDeleting(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err);
                if (err.response?.data.message) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        disableAccModal(true);
                        appRouter.push("/");
                        callToast("error", err.response?.data.message);
                    } else {
                        callToast("error", err.response?.data.message);
                    }
                } else { return; }
            } else {
                console.error(`Failed to switch active email: ${err}`);
                callToast("error", "Failed to switch active email")
            }
        }
    }

    static async updateProfile(
        appRouter: AppRouterInstance,
        disableAccModal: (state: boolean) => void,
        setUpdateModal: (state: boolean) => void,
        setIsUpdating: Actiontype<boolean>,
        data: FormData,
        updateClientsProfile: (data: {
            fullname: string;
            avatar: string;
        }) => void,
    ) {
        try {
            setIsUpdating(true);
            const response = await axiosHandlers.axios.patch("/api/auth/update-profile", data);
            updateClientsProfile(response.data.data.details);
            setIsUpdating(false);
            setUpdateModal(false);
            callToast("success", response.data.message)
        } catch (err: unknown) {
            setIsUpdating(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err);
                if (err.response?.data.message) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        disableAccModal(true);
                        setUpdateModal(false);
                        appRouter.push("/");
                        callToast("error", err.response?.data.message);
                    } else {
                        callToast("error", err.response?.data.message);
                    }
                } else { return; }
            } else {
                console.error(`Failed to updated clients profile: ${err}`);
                callToast("error", "Failed to update your profile")
            }
        }
    }
}