import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    rehydrated: boolean;
}

const initialState: AuthState = {
    user: null,
    rehydrated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
        },
        setRehydrated: (state, action: PayloadAction<boolean>) => {
            state.rehydrated = action.payload;
        },
    },
});

export const { setCredentials, logoutAction, setRehydrated } =
    authSlice.actions;

export default authSlice.reducer;
