import { IAddress } from './../../../../server/src/models/Address';
import { ConfiguredProduct } from '@/app/redux/data/productSlice';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProfilePayload } from "../../../../server/src/types/authTypes"
import { PopulatedCart  } from "../../../../server/src/types/productTypes";
import { Types } from "mongoose";

export interface ConfiguredOrder {
    items: {            
        product: ConfiguredProduct,  
        quantity: number
    }[],
    amount: number;
    address: Omit<IAddress, "userId">;
    orderStatus: string; 
    createdAt: string;
    updatedAt: string;
}
export type ConfiguredProfilePayload = Omit<ProfilePayload, "createdAt" | "updatedAt"| "likedProducts" | "orders"> & {
    likedProducts: ConfiguredProduct[];
    createdAt: string;
    updatedAt: string;
    fetching?: boolean;
    orders: ConfiguredOrder[]
}

const initialState: ConfiguredProfilePayload = {
    _id: "",
    role: "user",
    fullname: "",
    email: {
        activeEmail: "",
        otherEmails: [],
    },
    avatar: "",
    status: "offline",
    cart: { products: [], totalItems: 0, _id: "" },
    connectedAccounts: [],
    createdAt: "",
    updatedAt: "",
    likedProducts: [],
    fetching: true,
    savedAddresses: [],
    orders: [],
}

const profileSlice = createSlice({
    initialState,
    name: "profileInformation",
    reducers: {
        getProfile: (state, action: PayloadAction<ConfiguredProfilePayload>) => {
            state._id = action.payload._id;
            state.avatar = action.payload.avatar;
            state.cart = action.payload.cart;
            state.createdAt = action.payload.createdAt;
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.role = action.payload.role;
            state.likedProducts = action.payload.likedProducts;
            state.status = action.payload.status;
            state.updatedAt = action.payload.updatedAt
            state.connectedAccounts = action.payload.connectedAccounts
            state.savedAddresses = action.payload.savedAddresses;
            state.orders = action.payload.orders
        },

        changeAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload
        },
        refreshProfile: (state) => {
            state._id = "";
            state.role = "user";
            state.fullname = "";
            state.email = {
                activeEmail: "",
                otherEmails: [],
            };
            state.avatar = "";
            state.status = "offline";
            state.cart = {
                products: [],
                _id: "",
                totalItems: 0
            };
            state.createdAt = "";
            state.updatedAt = "";
            state.likedProducts = [];
            state.savedAddresses = [];
        },
        updateCart: (state, action: PayloadAction<PopulatedCart>) => {
            state.cart = action.payload
        },
        changeCartItemQuantity: (state, action: PayloadAction<{
            productId: string | Types.ObjectId,
            action: "increase" | "decrease",
        }>) => {
            state.cart.products.forEach((product) => {
                if (product.item._id === action.payload.productId) {
                    if (action.payload.action === "increase") {
                        if (product.quantity < 20) {
                            product.quantity += 1
                        }
                    } else {
                        if (product.quantity > 1) {
                            product.quantity -= 1
                        }
                    }
                }
            })
        },

        removeCartItem: (state, action: PayloadAction<string>) => {
            const updatedCartProducts = state.cart.products.filter((product) => product.item._id !== action.payload);
            state.cart.products = updatedCartProducts
        },

        updateLikes: (state, action: PayloadAction<ConfiguredProduct>) => {
            // 1. check if the product the user is trying to like exists in their liked products
            if (state.likedProducts.some((product) => product._id === action.payload._id)) {
                const updatedLikedProducts = state.likedProducts.filter((product) => product._id !== action.payload._id);
                state.likedProducts = updatedLikedProducts
            } else {
                state.likedProducts.push(action.payload);
            }
        },

        addNewAddress: (state, action: PayloadAction<Omit<IAddress, "userId">>) =>{
            state.savedAddresses.push(action.payload);
        },

        newOrder: (state, action: PayloadAction<ConfiguredOrder>) => {
            state.orders.push(action.payload);
            state.cart.products = []
            state.cart.totalItems = 0
        },
        clearOrders: (state) => {
            state.orders = []
        },
        addNewEmail: (state, action: PayloadAction<string>) => {
            state.email.otherEmails.push(action.payload)
        },
        switchActiveEmail: (state, action: PayloadAction<string>) => {
            const previousActiveEmail = state.email.activeEmail
            state.email.otherEmails = state.email.otherEmails.filter((email) => email !== action.payload);
            state.email.otherEmails.push(previousActiveEmail);
            state.email.activeEmail = action.payload;
        },
        updateEmails: (state, action: PayloadAction<string[]>) => {
            state.email.otherEmails = action.payload
        },
        updateProfile: (state, action: PayloadAction<{
            fullname: string;
            avatar: string;
        }>) => {
            state.fullname = action.payload.fullname;
            state.avatar = action.payload.avatar;
        }
    }
})

export const { getProfile, changeAvatar, addNewEmail , updateProfile ,updateEmails , switchActiveEmail ,setFetching, refreshProfile, updateCart, changeCartItemQuantity, removeCartItem, updateLikes, addNewAddress, newOrder, clearOrders } = profileSlice.actions;
export default profileSlice.reducer;