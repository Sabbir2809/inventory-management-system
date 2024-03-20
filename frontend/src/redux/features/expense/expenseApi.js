import { baseApi } from "../../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenseType: builder.mutation({
      query: (data) => ({
        url: "/expense/create-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),

    updateExpenseType: builder.mutation({
      query: (options) => ({
        url: `/expense/type/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["expense"],
    }),

    expenseTypeList: builder.query({
      query: (options) => ({
        url: `/expense/type/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),

    expenseList: builder.query({
      query: (options) => ({
        url: `/expense/${options.pageNumber}/${options.perPage}/${options.searchKeyword}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    updateExpense: builder.mutation({
      query: (options) => ({
        url: `/expense/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseTypeMutation,
  useUpdateExpenseTypeMutation,
  useExpenseTypeListQuery,
  useCreateExpenseMutation,
  useExpenseListQuery,
  useUpdateExpenseMutation,
} = expenseApi;
