import { useGetPokemonsQuery } from "@/services/pokemonApi";
import { useCallback, useRef, useState } from "react";

export function PokemonList() {
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading, isFetching } = useGetPokemonsQuery(offset);

  console.log(data);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // Se o último item está visível, não estamos buscando nada novo,
        // e existe uma próxima página então realizamos a açao
        if (entries[0].isIntersecting && !isFetching && data?.next) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, data]
  );
  return (
    <div>
      <div>
        {data?.results.map((pokemon, index) => {
          if (data.results.length === index + 1) {
            return (
              <div
                className="bg-gray-800 p-4 rounded-lg text-center capitalize transition-transform hover:scale-105"
                ref={lastPokemonElementRef}
                key={pokemon.name}
              >
                {pokemon.name}
              </div>
            );
          }
          return (
            <div
              key={pokemon.name}
              className="bg-gray-800 p-4 rounded-lg text-center capitalize transition-transform hover:scale-105"
            >
              {pokemon.name}
            </div>
          );
        })}
      </div>

      {isFetching && (
        <p className="text-center mt-4">Carregando mais Pokémon...</p>
      )}
      {error && (
        <p className="text-center mt-4 text-red-500">Ocorreu um erro!</p>
      )}
    </div>
  );
}
