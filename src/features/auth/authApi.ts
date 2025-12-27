// src/features/auth/authApi.ts

import { api } from "@/store/api";


export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    userId: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: string;
}

export const authApi = api.injectEndpoints({
    endpoints : (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body)=>({
                url: '/Auth/login',
                method: 'POST',
                body,
            })
        }),
    }),
});


export const  { useLoginMutation } = authApi;

