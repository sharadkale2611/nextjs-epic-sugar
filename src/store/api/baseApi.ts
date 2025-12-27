import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { logoutAction, setCredentials } from "@/features/auth/authSlice";
import type { RootState } from "@/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token =
            (getState() as RootState).auth.accessToken ||
            Cookies.get("accessToken");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // 🔴 If token expired
    if (result.error?.status === 401) {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
            api.dispatch(logoutAction());
            return result;
        }

        // 🔁 Try refresh token
        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh-token",
                method: "POST",
                body: {
                    accessToken: Cookies.get("accessToken"),
                    refreshToken,
                },
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const data: any = refreshResult.data;

            // ✅ Save new tokens
            Cookies.set("accessToken", data.accessToken, {
                path: "/",
                sameSite: "lax",
            });

            Cookies.set("refreshToken", data.refreshToken, {
                path: "/",
                sameSite: "lax",
            });

            api.dispatch(setCredentials(data));

            // 🔁 Retry original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutAction());
        }
    }

    return result;
};
