import {api} from "@/store/api";
import {API_ROUTES} from "@/lib/apiRoutes";
import { DocumentType, ApiResponse } from "./documenttype.types";

export const documenttypeApi = api.injectEndpoints({
    endpoints:(builder)=>({

        //Get All
        getDocumentTypes: builder.query<DocumentType[],void>({
            query:()=>API_ROUTES.DOCUMENT_TYPES,
            transformResponse:(res:ApiResponse<DocumentType[]>)=>res.data,
            providesTags:["DocumentType"],

        }),

        //Get by Id
        getDocumentTypeById: builder.query<DocumentType, number>({
            query:(id)=>`${API_ROUTES.DOCUMENT_TYPES}/${id}`,
            transformResponse:(res:ApiResponse<DocumentType>)=>res.data,
           providesTags: (res, err, id) => [{ type: "DocumentType", id }],
        }),

        createDocumentType: builder.mutation<DocumentType, Partial<DocumentType>>({
        query: (payload) => ({
        url: API_ROUTES.DOCUMENT_TYPES,
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: ApiResponse<DocumentType>) => res.data,
      invalidatesTags: ["DocumentType"],
    }),

    // UPDATE
    updateDocumentType: builder.mutation<DocumentType, Partial<DocumentType>>({
      query: (payload) => ({
        url: `${API_ROUTES.DOCUMENT_TYPES}/${payload.documentId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (res: ApiResponse<DocumentType>) => res.data,
      invalidatesTags: (res) =>
        res ? [{ type: "DocumentType", id: res.documentId }] : ["DocumentType"],
    }),

 // DELETE (soft delete most likely)
    deleteDocumentType: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `${API_ROUTES.DOCUMENT_TYPES}/${id}`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiResponse<any>) => res.success,
      invalidatesTags: ["DocumentType"],
    }),

    // GET PAGINATED DOCUMENT TYPES
getPaginatedDocumentTypes: builder.query<
  {
    data: DocumentType[];   // backend returns Data = []
    totalPages: number;
    totalCount: number;
  },
  { pageNumber: number; pageSize: number; search?: string; status?: string }
>({
  query: ({ pageNumber, pageSize, search = "", status = "" }) => ({
    url: `${API_ROUTES.DOCUMENT_TYPES}/paginated`,
    params: { pageNumber, pageSize, search, status },
  }),

  transformResponse: (res: any) => ({
    data: res.data?.data ?? res.data ?? [],
    totalPages: res.data?.totalPages ?? res.totalPages ?? 1,
    totalCount: res.data?.totalCount ?? res.totalCount ?? 0,
  }),

  providesTags: ["DocumentType"],
}),

    })
})


export const{
  useGetPaginatedDocumentTypesQuery,
    useGetDocumentTypesQuery,
    useGetDocumentTypeByIdQuery,
    useCreateDocumentTypeMutation,
    useUpdateDocumentTypeMutation,
    useDeleteDocumentTypeMutation,

}=documenttypeApi