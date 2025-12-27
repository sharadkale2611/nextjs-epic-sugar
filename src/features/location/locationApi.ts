import { API_ROUTES } from "@/lib/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface State {
    stateId: number;
    stateName: string;
    country: string;
    isActive: boolean;
}

interface City {
    cityId: number;
    cityName: string;
    stateId: number;
    stateName: string;
    isActive: boolean;
}


interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error: any;
    errors: any;
}

export const locationApi = createApi({
    reducerPath: "locationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include", // important if cookies are used
    }),
    endpoints: (builder) => ({
        getStates: builder.query<any[], void>({
            query: () => API_ROUTES.STATES,
            transformResponse: (response: ApiResponse<State[]>) => response.data,

        }),

        getCities: builder.query<any[], number>({
            query: (stateId) => `${API_ROUTES.CITIES}/${stateId}`,
            transformResponse: (response: ApiResponse<City[]>) => response.data,
        }),
    }),
});

export const {
    useGetStatesQuery,
    useGetCitiesQuery,
} = locationApi;


