import { baseApi } from "../../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: (data) => ({
        url: "/sell/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sell"],
    }),

    sellList: builder.query({
      query: (options) => ({
        url: `/sell/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["sell"],
    }),

    deleteSell: builder.mutation({
      query: (id) => ({
        url: `/sell/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sell"],
    }),
  }),
});

export const { useCreateSellMutation, useSellListQuery, useDeleteSellMutation } = sellApi;
