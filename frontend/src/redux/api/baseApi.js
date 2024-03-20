import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

// custom
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  if (result?.error?.status === 401) {
    // send refresh token
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    // new token
    const { data } = await res.json();

    if (data?.accessToken) {
      const user = api.getState().auth.user;
      // set user
      api.dispatch(
        setUser({
          user,
          token: data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["profile", "brand", "category", "product"],
  endpoints: () => ({}),
});
