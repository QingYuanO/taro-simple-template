import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import wxBaseQuery from "@/store/wxBaseQuery";

export const imgApi = createApi({
  baseQuery: wxBaseQuery({ baseUrl: "https://api.waifu.pics" }),
  tagTypes: ['Img',],

  endpoints: (builder) => ({
    getSfwWaifu: builder.query<{ url: string }, void>({
      query: () => ({
        url: "/sfw/waifu",
        method: "GET",
        data: { showErrorToast: true },
      }),
    }),
  }),
});
export const { useGetSfwWaifuQuery } = imgApi;
