import type {
  PokemonDetailResponse,
  PokemonListResponse,
} from "@/types/pokemon";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://pokeapi.co/api/v2/",
});

const baseQueryWithDelay: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return baseQuery(args, api, extraOptions);
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: baseQueryWithDelay,
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
    getPokemonByName: builder.query<PokemonDetailResponse, string>({
      query: (name) => `pokemon-form/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
