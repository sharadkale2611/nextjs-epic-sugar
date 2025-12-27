// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
    user: any | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        logoutAction: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            // ✅ Clear cookie on logout
            Cookies.remove("accessToken");
        },
    },
});

export const { setCredentials, logoutAction } = authSlice.actions;
export default authSlice.reducer;
