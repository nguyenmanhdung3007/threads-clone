import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts/postsApi";
import { authApi } from "./services/auth/authApi";
import authReducer from "@/features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
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
