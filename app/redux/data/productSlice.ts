import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PopulatedProduct, PopulatedUser } from "../../../../server/src/types/productTypes";
import { Types } from "mongoose";

export type ConfiguredProduct = Omit<PopulatedProduct, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
}

interface ProductSliceSchema {
    products: ConfiguredProduct[],
    fetching?: boolean,
    singleProduct: ConfiguredProduct | null,
    productsDataFetchingSettings: {
        limit: number;
        page: string;
    },
    currentlyLiking: string | null
}

const initialState: ProductSliceSchema = {
    products: [],
    singleProduct: null,
    fetching: false,
    productsDataFetchingSettings: {
        limit: 16,
        page: "1",
    },
    currentlyLiking: null,
}

const productSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        getProducts: (state, action: PayloadAction<ConfiguredProduct[]>) => {
            state.products = action.payload;
        },
        addNewProduct: (state, action: PayloadAction<ConfiguredProduct>) => {
            state.products.push(action.payload);
        },
        changeSingleProduct: (state, action: PayloadAction<ConfiguredProduct | null>) => {
            state.singleProduct = action.payload
        },
        isFetchingProducts: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload
        },
        updateProductsLikes: (state, action: PayloadAction<{ updateData: PopulatedUser[], productId: string | Types.ObjectId }>) => {
            state.products.forEach((product) => {
                if (product._id === action.payload.productId) {
                    product.likes = action.payload.updateData;
                }
            })
        },
        likeOrUnlikeProduct: (state, action: PayloadAction<{
            productId: string,
            clientsDetails: PopulatedUser,
        }>) => {
            // 1. find the product the user is trying to like
            const productBeingLiked = state.products.find((product) => product._id === action.payload.productId);

            // 2. add a null check for possibly null products
            if (!productBeingLiked) return;

            // 3. check if the user already exists inside of the found products likes
            if (productBeingLiked.likes.some((like) => like._id === action.payload.clientsDetails._id)) {
                const configuredLikes = productBeingLiked.likes.filter((like) => like._id !== action.payload.clientsDetails._id);
                productBeingLiked.likes = configuredLikes
            } else {
                productBeingLiked?.likes.push(action.payload.clientsDetails);
            }
        },
        configureFetchingData: (state, action: PayloadAction<{ limit: number, page: string }>) => {
            state.productsDataFetchingSettings = action.payload
        },
        // In your Redux slice, add:
        setCurrentlyLiking: (state, action: PayloadAction<string | null>) => {
            state.currentlyLiking = action.payload;
        }

    }
})

export const { getProducts, addNewProduct, changeSingleProduct, isFetchingProducts, likeOrUnlikeProduct, setCurrentlyLiking } = productSlice.actions;
export default productSlice.reducer;