import  { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import { locationApi } from "@/features/location/locationApi";
import { api } from "./api";

export const store = configureStore({
    reducer : {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
            locationApi.middleware            
        ),
    devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;