import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardPayload } from "../../../../server/src/types/authTypes";
import { ConfiguredProduct } from "./productSlice";

const initialState: DashboardPayload & { isFetching: boolean }= {
    products: [],
    orders: [],
    isFetching: true,
}

const adminDataSlice = createSlice({
    initialState,
    name: "adminData",
    reducers: {
        getDashboardData: (
            state,
            action: PayloadAction<DashboardPayload>
        ) => {
            state.orders = action.payload.orders
            state.products = action.payload.products
        },

        handleFetch: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },

        newProduct: (
            state,
            action: PayloadAction<ConfiguredProduct>,
        ) => {
            state.products.push(action.payload);
        }
    }
})


export const  { getDashboardData, handleFetch, newProduct} = adminDataSlice.actions;
export default adminDataSlice.reducer;