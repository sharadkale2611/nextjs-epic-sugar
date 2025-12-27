"use client";

import { Provider } from "react-redux";
import { store } from "@/store"
import { SnackbarProvider } from "notistack";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            style={{
                marginTop: "70px", //  PUSH BELOW HEADER
            }}
        >
            {children}
        </SnackbarProvider>

    </Provider>
}