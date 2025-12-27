import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts/postsApi";
import { authApi } from "./services/auth/authApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    authApi.middleware,
    postsApi.middleware,
  ],
});

export { store };
