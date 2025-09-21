import { useGetPokemonByNameQuery } from "@/services/pokemonApi";
import { typeColorMap } from "@/utils/pokemonUtils";

export function PokemonCard({ name }: { name: string }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) {
    return (
      //todo: add skeleton do chadcn
      <div className="bg-gray-800 p-4 rounded-lg text-center animate-pulse">
        <div className="h-24 w-24 bg-gray-700 rounded-full mx-auto mb-2"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-900 p-4 rounded-lg text-center">
        Erro ao carregar {name}
      </div>
    );
  }
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center transition-transform hover:scale-105 shadow-lg flex flex-col justify-between h-full">
      <img
        className="h-24 w-24 mx-auto"
        src={data.sprites.front_default || "https://via.placeholder.com/96"} // Imagem placeholder caso não exista
        alt={data.name}
        loading="lazy" // Ajuda na performance de imagens
      />
      <div>
        <h3 className="text-xl font-bold capitalize mt-2">
          #{data.id} - {data.name}
        </h3>
        <div className="flex justify-center gap-2 mt-2">
          {data.types.map(({ type }) => (
            <span
              key={type.name}
              className={`px-2 py-1 text-xs font-bold text-white rounded-full ${
                typeColorMap[type.name] || "bg-gray-500"
              }`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
