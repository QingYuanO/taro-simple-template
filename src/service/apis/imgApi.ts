import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import wxBaseQuery from "@/store/wxBaseQuery";
import { CustomData } from "..";

export const imgApi = createApi({
  baseQuery: wxBaseQuery({ baseUrl: "https://api.waifu.pics" }),
  tagTypes: ["Img"],

  endpoints: (builder) => ({
    getSfwWaifu: builder.query<{ url: string }, CustomData | null>({
      query: (args) => ({
        url: "/sfw/waifu",
        method: "GET",
        data: { showErrorToast: true, showLoad: false, ...args },
        providesTags: { type: "IMG", id: "waifu" },
      }),
    }),
  }),
});
export const { useGetSfwWaifuQuery,useLazyGetSfwWaifuQuery, usePrefetch } = imgApi;
