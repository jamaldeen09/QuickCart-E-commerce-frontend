import {configureStore} from "@reduxjs/toolkit"
import setTrigger from "./triggers/triggers"
import sonnerSlice from "./sonnerSlice"
import profileSlice from "./data/profileSlice"
import productSlice from "./data/productSlice"
import adminDataSlice from "./data/adminDataSlice"

export const store = configureStore({
    reducer: {
        // slices goes here
        triggers: setTrigger,
        sonnerSlice: sonnerSlice,
        profileInformation: profileSlice,
        products: productSlice,
        adminData: adminDataSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
