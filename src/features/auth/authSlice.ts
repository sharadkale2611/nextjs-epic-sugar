import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.token = action.payload.accessToken;
        },
        logoutAction: (state) => {
            state.user = null;
            state.token = null;
        }
    },
});

export const { setCredentials, logoutAction } = authSlice.actions;
export default authSlice.reducer;