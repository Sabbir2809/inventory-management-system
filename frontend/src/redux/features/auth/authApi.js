import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/registration",
        method: "POST",
        body: userInfo,
      }),
    }),

    profileDetails: builder.query({
      query: () => ({
        url: "/auth/profile-details",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    profileUpdate: builder.mutation({
      query: (userUpdatedInfo) => ({
        url: "/auth/profile-update",
        method: "PUT",
        body: userUpdatedInfo,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useProfileDetailsQuery, useProfileUpdateMutation } =
  authApi;
