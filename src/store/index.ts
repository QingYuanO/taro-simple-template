import { imgApi } from "@/service/apis/imgApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import index from "../pages/index/slice";
import { coreApi } from "./coreApi";

const store = configureStore({
  reducer: {
    index,
    [coreApi.reducerPath]: coreApi.reducer,
    [imgApi.reducerPath]: imgApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware).concat(imgApi.middleware),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
