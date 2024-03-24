import { baseApi } from "../../api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    expenseReport: builder.query({
      query: (options) => ({
        url: `/report/expense/${options.formDate}/${options.toDate}`,
        method: "GET",
      }),
      invalidatesTags: ["expense"],
    }),

    sellReport: builder.query({
      query: (options) => ({
        url: `/report/sell/${options.formDate}/${options.toDate}`,
        method: "GET",
      }),
      invalidatesTags: ["sell"],
    }),

    purchaseReport: builder.query({
      query: (options) => ({
        url: `/report/purchase/${options.formDate}/${options.toDate}`,
        method: "GET",
      }),
      invalidatesTags: ["purchase"],
    }),

    returnReport: builder.query({
      query: (options) => ({
        url: `/report/return/${options.formDate}/${options.toDate}`,
        method: "GET",
      }),
      invalidatesTags: ["return"],
    }),
  }),
});

export const {
  useExpenseReportQuery,
  useSellReportQuery,
  usePurchaseReportQuery,
  useReturnReportQuery,
} = reportApi;
