import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Triggers {
    authModal: boolean;
    connectionToast: boolean;
    profileModal: boolean;
    adminDashboardSidebar: boolean;
    isLiking: boolean;
    updateProfileModal: boolean;
}

const initialState: Triggers = {
    authModal: false,
    connectionToast: false,
    profileModal: false,
    adminDashboardSidebar: false,
    isLiking: false,
    updateProfileModal: false,
}

export type TriggerKeyPayload = keyof Triggers

const triggerSlice = createSlice({
    initialState,
    name: "triggers",
    reducers: {
        setTrigger: (state, 
            action: PayloadAction<{
                key: TriggerKeyPayload,
                value: boolean
            }>
        ) => {
            state[action.payload.key] = action.payload.value
        }
    }
})

export const { setTrigger } = triggerSlice.actions;
export default triggerSlice.reducer;