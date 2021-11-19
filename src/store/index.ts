import { configureStore } from "@reduxjs/toolkit";
import index from "../pages/index/slice";

const store = configureStore({
  reducer: {
    index,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export default store;
