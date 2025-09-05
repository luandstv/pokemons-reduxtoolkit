import type { PokemonListResponse } from "@/types/pokemon";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// endpoint api https://pokeapi.co/api/v2/
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonListResponse, number>({
      query: (offset = 0) => `pokemon-form?offset=${offset}&limit=20`,
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
        currentCache.next = newItems.next;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
