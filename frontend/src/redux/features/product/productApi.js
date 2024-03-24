import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    productList: builder.query({
      query: (options) => ({
        url: `/product/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (options) => ({
        url: `/product/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    productDropdown: builder.query({
      query: () => ({
        url: `/product/dropdown`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useProductListQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useProductDropdownQuery,
} = productApi;
