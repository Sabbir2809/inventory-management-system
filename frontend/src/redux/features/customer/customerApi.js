import { baseApi } from "../../api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),

    customerList: builder.query({
      query: (options) => ({
        url: `/customer/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    updateCustomer: builder.mutation({
      query: (options) => ({
        url: `/customer/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["customer"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useCustomerListQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
