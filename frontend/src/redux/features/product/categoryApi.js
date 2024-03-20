import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    categoryList: builder.query({
      query: (options) => ({
        url: `/category/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: (options) => ({
        url: `/category/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useCategoryListQuery, useUpdateCategoryMutation } = brandApi;
