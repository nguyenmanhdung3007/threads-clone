import baseQuery from "../baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery,
  tagTypes: ["Post", "Feed", "Reply"],
  endpoints: (builder) => ({
    // GET FEEDS
    getFeeds: builder.query({
      query: (params) => ({
        url: "/api/posts/feed",
        method: "GET",
        params, // type, page, per_page
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Feed", id })), "Feed"]
          : ["Feed"],
    }),

    // GET POST DETAIL
    getPostDetail: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // CREATE POST
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Feed"], // Làm mới Feed để thấy bài viết mới
    }),

    // Cập nhật bài viết (Sử dụng phương thức POST với _method PUT cho multipart)
    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: "POST",
        data: formData, // Chứa _method: "PUT"
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        "Feed",
      ],
    }),

    // Xóa bài viết
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "POST",
        data: { _method: "DELETE" },
      }),
      invalidatesTags: ["Feed"],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
