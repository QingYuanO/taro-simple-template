import { imgApi } from "@/service/apis/imgApi";
import { pokemonApi } from "@/service/apis/pokemonApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import index from "../pages/index/slice";

const store = configureStore({
  reducer: {
    index,
    [imgApi.reducerPath]: imgApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(imgApi.middleware),
  // .concat(pokemonApi.middleware),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
