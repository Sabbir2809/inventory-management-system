import { baseApi } from "../../api/baseApi";

const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplier/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["supplier"],
    }),

    supplierList: builder.query({
      query: (options) => ({
        url: `/supplier/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),

    supplierDetails: builder.query({
      query: (id) => ({
        url: `/supplier/details/${id}`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),

    updateSupplier: builder.mutation({
      query: (options) => ({
        url: `/supplier/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["supplier"],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),

    supplierDropdown: builder.query({
      query: () => ({
        url: `/supplier/dropdown`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useSupplierListQuery,
  useSupplierDetailsQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useSupplierDropdownQuery,
} = supplierApi;
