import baseQuery from "../baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authentication",
  baseQuery,
  tagTypes: ["User", "UserColumns"],
  endpoints: (builder) => ({
    // lấy user's data
    getUserInfo: builder.query({
      query: () => ({
        url: "/api/auth/user",
        method: "GET",
      }),
      providesTag: ["User"],
    }),

    // đăng nhập
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // đăng nhập
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useLoginMutation, useRegisterMutation } = authApi;
