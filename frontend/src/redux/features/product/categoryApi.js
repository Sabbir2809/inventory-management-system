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

    categoryDropdown: builder.query({
      query: () => ({
        url: `/category/dropdown`,
        method: "GET",
      }),
      providesTags: ["category"],
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

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoryListQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCategoryDropdownQuery,
} = brandApi;
