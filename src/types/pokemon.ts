export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface PokemonTypeInfo {
  name: string;
  url: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonTypeInfo;
}

export interface PokemonForm {
  id: number;
  name: string;
  pokemon: Pokemon;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonForm[];
}
