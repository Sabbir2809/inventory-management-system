import { baseApi } from "../../api/baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase"],
    }),

    purchaseList: builder.query({
      query: (options) => ({
        url: `/purchase/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase"],
    }),
  }),
});

export const { useCreatePurchaseMutation, usePurchaseListQuery, useDeletePurchaseMutation } =
  purchaseApi;
