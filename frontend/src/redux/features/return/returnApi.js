import { baseApi } from "../../api/baseApi";

const returnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReturn: builder.mutation({
      query: (data) => ({
        url: "/return/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["return"],
    }),

    returnList: builder.query({
      query: (options) => ({
        url: `/return/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["return"],
    }),

    deleteReturn: builder.mutation({
      query: (id) => ({
        url: `/return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["return"],
    }),
  }),
});

export const { useCreateReturnMutation, useReturnListQuery, useDeleteReturnMutation } = returnApi;
