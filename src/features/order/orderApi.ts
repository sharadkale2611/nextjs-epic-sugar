// src/features/order/orderApi.ts

import { api } from "@/store/api";
import {
    CreateOrderPayload,
    OrderResponse,
    InvoiceResponse,
    ApiResponse,
} from "./order.types";
import { API_ROUTES } from "@/lib/apiRoutes";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // CREATE ORDER
        createOrder: builder.mutation<ApiResponse<OrderResponse>, CreateOrderPayload>({
            query: (payload) => ({
                url: `${API_ROUTES.ORDERS}/place-order`,
                method: "POST",
                body: payload,
            }),
        }),

        // GET INVOICE
        getInvoice: builder.query<ApiResponse<InvoiceResponse>, number>({
            query: (orderId) => `${API_ROUTES.ORDERS}/invoice/${orderId}`,
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetInvoiceQuery,
} = orderApi;
