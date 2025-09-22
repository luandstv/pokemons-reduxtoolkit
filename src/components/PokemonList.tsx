import { useGetPokemonsQuery } from "@/services/pokemonApi";
import { useCallback, useRef, useState } from "react";
import { PokemonCard } from "./PokemonCard";

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
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {data?.results.map((pokemon, index) => {
          if (data.results.length === index + 1) {
            return (
              <div ref={lastPokemonElementRef} key={pokemon.name}>
                <PokemonCard name={pokemon.name} />
              </div>
            );
          }
          return <PokemonCard name={pokemon.name} />;
        })}
      </div>

      {isFetching && (
        <p className="text-center mt-4 text-muted-foreground">
          Carregando mais Pokémon...
        </p>
      )}
      {error && (
        <p className="text-center mt-4 text-destructive">Ocorreu um erro!</p>
      )}
    </div>
  );
}
