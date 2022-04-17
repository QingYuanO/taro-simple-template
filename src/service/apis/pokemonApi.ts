import { coreApi } from "@/store/coreApi";

export const pokemonApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => ({ url: `pokemon/${name}` }),
    }),
  }),
});
pokemonApi.enhanceEndpoints({ addTagTypes: ["Pokemon"] });

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApi;
