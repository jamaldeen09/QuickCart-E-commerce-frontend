import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IAddress } from "../../../server/src/models/Address";
import { PopulatedCart } from "../../../server/src/types/productTypes";
import { axiosHandlers } from "../config/axiosConfig";
import { ConfiguredProduct } from "../redux/data/productSlice";
import { Actiontype } from "../types/generalTypes";
import { callToast } from "../utils/authHandlers";
import { Types } from "mongoose";
import { ConfiguredOrder } from "../redux/data/profileSlice";


export class ProductSystem {
    static async fetchProducts(
        queryData: {
            limit: number,
            page: string,
        },
        getProducts: (data: ConfiguredProduct[]) => void,
        isFetching: (state: boolean) => void,
    ) {
        try {
            isFetching(true);
            const { limit, page } = queryData
            const response = await axiosHandlers.axios.get(`/api/products/get-products?page=${page}&limit=${limit}`);

            isFetching(false);
            getProducts(response.data.data.products);
        } catch (err: unknown) {
            isFetching(false);
            if (err instanceof axiosHandlers.axiosError) {
                if (!err.response?.data.message) return;
                callToast("error", err?.response?.data.message)
            } else {
                console.error(`Failed to fetch products: ${err}`);
                callToast("error", "Failed to fetch products")
            }
        }
    }


    static async getSingleProduct(
        id: string,
        getSingleProduct: (product: ConfiguredProduct) => void,
        setIsFetching: Actiontype<boolean>,
    ) {
        if (!id || id.trim() === "" || id === null || id === undefined) {
            console.error("Product id needed");
            return;
        }

        if (typeof id !== "string") {
            console.error("Product id must be a string");
            return;
        }

        if (id.length < 24 || id.length > 24) {
            console.error("Product id must be 24 characters");
            return;
        }

        try {
            setIsFetching(true)
            const response = await axiosHandlers.axios.get(`/api/products/single-product/${id}`);
            getSingleProduct(response.data.data.product);
            setIsFetching(false)
        } catch (err: unknown) {
            setIsFetching(false)
            if (err instanceof axiosHandlers.axiosError) {
                return;
            } else {
                console.error(`Failed to fetch product: ${err}`)
                callToast("error", "Failed to fetch single product", 4000)
            }
        }
    }

    static async addItemToCart(
        id: string,
        setIsAdding: Actiontype<boolean>,
        setIsBuying: Actiontype<boolean>,
        updateCart: (data: PopulatedCart) => void,
        action: "buying" | "adding",
        appRouter: AppRouterInstance,
    ) {
        try {
            if (action === "adding") {
                setIsAdding(true);
                const response = await axiosHandlers.axios.post(`/api/products/add-to-cart/${id}`);
                setIsAdding(false);
                updateCart(response.data.data.cart);
                callToast("success", response.data.message);
            } else {
                setIsBuying(true);
                const response = await axiosHandlers.axios.post(`/api/products/add-to-cart/${id}`);
                setIsBuying(false);
                updateCart(response.data.data.cart);
                appRouter.push("/cart");
                callToast("success", response.data.message);
            };
        } catch (err: unknown) {
            setIsAdding(false);
            setIsBuying(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.log(err.response?.data);
                callToast("error", "Please sign in");
            } else {
                console.error(`Failed to add product to cart: ${err}`);
                callToast("error", `Server error: ${action === "adding" ? "failed to add requested product to your cart" : "failed to buy requested product"}`)
            }
        }
    }

    static async updateCartItemQuantity(
        data: { id: string, action: "increase" | "decrease" },
        updateCart: (data: PopulatedCart) => void,
    ) {
        try {
            const response = await axiosHandlers.axios.patch("/api/products/update-product-quantity", data);
            updateCart(response.data.data.updatedCart)
        } catch (err: unknown) {
            if (err instanceof axiosHandlers.axiosError) {
                console.error(`Error (${err.response?.status}): ${err}`);
            } else {
                console.error(`Failed to update products quantity: ${err}`);
                callToast("error", "Server error: failed to update products quantity")
            }
        }
    }

    static async removeCartItem(
        id: string,
    ) {
        try {
            await axiosHandlers.axios.patch(`/api/products/remove-cart-item/${id}`);
        } catch (err: unknown) {
            if (err instanceof axiosHandlers.axiosError) {
                console.error(`Failed to remove item from cart: ${err}`);
            } else {
                console.error(`Failed to remove item from clients cart: ${err}`);
                callToast("error", "Server error: failed to remove item from your cart");
            }
        }
    }

    static async likeOrUnlikeItem(
        id: string,
        action: "like" | "unlike",
        likingAProduct: (state: string | null) => void,
        clientUpdate: () => void,
    ) {
        try {
            likingAProduct(id);
            await axiosHandlers.axios.patch(`/api/products/like-or-unlike-product/${id}`);
            clientUpdate();
        } catch (err: unknown) {
            console.error(`Failed to ${action} product`, err);
        } finally {
            likingAProduct(null);
        }
    }

    static async saveAddress(
        setIsSaving: Actiontype<boolean>,
        data: Omit<IAddress, "userId">,
        addNewAddress: (data: Omit<IAddress, "userId">) => void,
        appRouter: AppRouterInstance,
    ) {
        try {
            setIsSaving(true);
            const response = await axiosHandlers.axios.patch("/api/address/save-address", data);

            setIsSaving(false);
            addNewAddress(response.data.data.savedAddress);
            callToast("success", "Address saved");
            appRouter.push("/cart");
        } catch (err: unknown) {
            setIsSaving(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(`Axios Error failed to save address: ${err}`);
                if (!err.response?.data.message) {
                    return;
                } else { callToast("error", err.response?.data.message) }
            } else {
                console.error(`Failed to save address: ${err}`);
                callToast("error", "Failed to save address");
            }
        }
    }

    static async createOrder(
        setIsOrdering: Actiontype<boolean>,
        addressId: Types.ObjectId,
        newOrder: (order: ConfiguredOrder) => void,
        appRouter: AppRouterInstance
    ) {
        try {
            setIsOrdering(true);
            const response = await axiosHandlers.axios.post("/api/products/create-order", { addressId });
            appRouter.push("/order-placed");
            newOrder(response.data.data.order)
            setIsOrdering(false);
        } catch (err: unknown) {
            setIsOrdering(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(`Axios Error failed to create order: ${err}`);
                if (!err.response?.data.message) {
                    return;
                } else { callToast("error", err.response?.data.message) }
            } else {
                console.error(`Failed to create order request from client: ${err}`);
                callToast("error", "Server Error: failed to create order");
            }
        }
    }

    static async clearOrderHistory(
        setIsClearing: Actiontype<boolean>,
        setClearOrderHistory: Actiontype<boolean>,
        clearOrders: () => void,
    ) {
        try {
            setIsClearing(true);
            await axiosHandlers.axios.delete("/api/products/clear-order-history");
            setIsClearing(false);
            setClearOrderHistory(false);
            clearOrders();
        } catch (err: unknown) {
            setIsClearing(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(`Axios error: ${err}`);
                if (err.response?.data.message) {
                    callToast("error", err.response?.data.message)
                } else { return; }
            } else {
                console.error(`Failed to clearn clients order history: ${err}`);
                callToast("error", "Failed to clear your order history")
            }
        }
    }
}