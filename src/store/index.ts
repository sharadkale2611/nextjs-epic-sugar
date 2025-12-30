// src/store/index.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/authSlice";
import { api } from "./api";
import { locationApi } from "@/features/location/locationApi";

// 🔹 Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
});

// 🔹 Persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // only persist auth
};

// 🔹 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // REQUIRED for redux-persist
        }).concat(api.middleware, locationApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// 🔹 Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
