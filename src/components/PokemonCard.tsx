import { useGetPokemonByNameQuery } from "@/services/pokemonApi";
import { typeColorMap } from "@/utils/pokemonUtils";
import { SkeletonCard } from "./SkeletonCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

export function PokemonCard({ name }: { name: string }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error || !data) {
    return (
      <div className="bg-destructive text-destructive-foreground p-4 rounded-lg text-center">
        Erro ao carregar {name}
      </div>
    );
  }
  return (
    <Card className="bg-card text-card-foreground p-4 rounded-lg text-center capitalize">
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <img
          className="h-24 w-24 mx-auto"
          src={data.sprites.front_default || "https://via.placeholder.com/96"} // Imagem placeholder caso não exista
          alt={data.name}
          loading="lazy" // Ajuda na performance de imagens
        />
      </CardContent>

      <CardFooter className="flex justify-center gap-2 mt-2">
        {data.types.map(({ slot, type }) => (
          <Badge
            key={slot}
            className={`text-white ${typeColorMap[type.name] || "bg-gray-500"}`}
          >
            {type.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
