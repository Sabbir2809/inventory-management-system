import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    expenseSummary: builder.query({
      query: () => ({
        url: `/summary/expense`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    purchaseSummary: builder.query({
      query: () => ({
        url: `/summary/purchase`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),

    sellSummary: builder.query({
      query: () => ({
        url: `/summary/sell`,
        method: "GET",
      }),
      providesTags: ["sell"],
    }),

    returnSummary: builder.query({
      query: () => ({
        url: `/summary/return`,
        method: "GET",
      }),
      providesTags: ["return"],
    }),
  }),
});

export const { useExpenseSummaryQuery, usePurchaseSummaryQuery, useSellSummaryQuery, useReturnSummaryQuery } =
  dashboardApi;
