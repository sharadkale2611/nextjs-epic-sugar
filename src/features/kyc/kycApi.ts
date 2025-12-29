// features/kyc/kycApi.ts

import { api } from "@/store/api";
import {
  ApiResponse,
  KycVerificationResponse,
} from "./kyc.types";
import { API_ROUTES } from "@/lib/apiRoutes";


export const kycApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // =========================
    // GET KYC Verification Docs
    // =========================
    getKycVerification: builder.query<KycVerificationResponse, number>({
      query: (userId) => `${API_ROUTES.KYC}/${userId}`,
      transformResponse: (
        res: ApiResponse<KycVerificationResponse>
      ) => res.data,
      providesTags: (r, e, userId) => [{ type: "KYC", userId }],
    }),

    // =========================
    // UPDATE STATUS
    // =========================
    updateKycStatus: builder.mutation<
      any,
      { kycId: number; status: string; remarks?: string }
    >({
      query: ({ kycId, status, remarks }) => ({
        url: `${API_ROUTES.KYC_UPDATE}/${kycId}`,
        method: "PATCH",
        body: { status, remarks },
      }),
      invalidatesTags: ["KYC"],
    }),
  }),
});

export const {
  useGetKycVerificationQuery,
  useUpdateKycStatusMutation,
} = kycApi;
