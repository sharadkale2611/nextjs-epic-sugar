import { logoutAction } from "@/features/auth/authSlice";
import { store, persistor } from "@/store";
import Cookies from "js-cookie";

export const logout = async () => {
    // 1️⃣ Clear redux state
    store.dispatch(logoutAction());

    // 2️⃣ Clear persisted redux
    await persistor.purge();

    // 3️⃣ Remove cookies used by middleware
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // 4️⃣ Force hard redirect
    window.location.replace("/signin");
};
