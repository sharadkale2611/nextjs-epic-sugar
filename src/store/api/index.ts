import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApi";
// import { baseQueryWithReauth } from "./baseApi";

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Mill"],
    endpoints: () => ({}),
});
