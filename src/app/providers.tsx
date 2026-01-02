"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { SnackbarProvider } from "notistack";
import { setRehydrated } from "@/features/auth/authSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                onBeforeLift={() => {
                    store.dispatch(setRehydrated(true));
                }}
            >
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    style={{ marginTop: "70px" }}
                >
                    {children}
                </SnackbarProvider>
            </PersistGate>
        </Provider>
    );
}
