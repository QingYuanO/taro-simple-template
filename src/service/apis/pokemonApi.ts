import wxBaseQuery from "@/store/wxBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  tagTypes: ["Pokemon"],
  reducerPath: "pokemonApi",
  baseQuery: wxBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => ({ url: `pokemon/${name}` }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApi;
