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
        method: "PATCH",
        body: userUpdatedInfo,
      }),
      invalidatesTags: ["profile"],
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useProfileDetailsQuery,
  useProfileUpdateMutation,
  useVerifyEmailMutation,
  useVerifyOTPMutation,
  useForgetPasswordMutation,
} = authApi;
