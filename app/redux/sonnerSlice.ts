import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type SonnerPositions = "bottom-center" | "bottom-left" | "bottom-right" |  "top-center" |  "top-left" | "top-right"
interface SonnerSliceIntialState { position: SonnerPositions }
const initialState: SonnerSliceIntialState = { position: "bottom-left" }

const sonnerSlice = createSlice({
    initialState,
    name: "sonnerSlice",
    reducers: {
        changePosition: (state, action: PayloadAction<SonnerPositions>) => {
            state.position = action.payload;
        }
    }
})

export const { changePosition } = sonnerSlice.actions;
export default sonnerSlice.reducer;