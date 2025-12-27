import { logoutAction } from "@/features/auth/authSlice";
import { store } from "@/store";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export const logout = () => {
    try {
        // 🔹 Remove auth cookies
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });

        // 🔹 Clear redux auth state
        store.dispatch(logoutAction());

        // 🔹 Clear local storage (optional but safe)
        localStorage.removeItem("accessToken");

        // 🔹 Redirect to signin page
        window.location.href = "/signin";
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
