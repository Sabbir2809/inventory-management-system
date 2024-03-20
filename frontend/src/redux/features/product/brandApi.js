import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    brandList: builder.query({
      query: (options) => ({
        url: `/brand/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    updateBrand: builder.mutation({
      query: (options) => ({
        url: `/brand/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const { useCreateBrandMutation, useBrandListQuery, useUpdateBrandMutation } = brandApi;
