import baseQuery from "../baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authentication",
  baseQuery,
  tagTypes: ["User", "UserColumns", "Columns"],
  endpoints: (builder) => ({
    // lấy user's data
    getUserInfo: builder.query({
      query: () => ({
        url: "/api/auth/user",
        method: "GET",
      }),
      providesTag: ["User"],
    }),
    
    // lấy feed columns
    getFeedColumns: builder.query({
      query: () => ({
        url: "/api/auth/columns",
        method: "GET",
      }),
      providesTag: ["Columns"],
    }),

    // đăng nhập
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // đăng ký
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useGetFeedColumnsQuery, useLoginMutation, useRegisterMutation } =
  authApi;
