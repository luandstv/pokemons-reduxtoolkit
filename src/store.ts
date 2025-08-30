import { configureStore, createSlice } from "@reduxjs/toolkit";

type PokemonTypeInfo = {
    name: string,
    url: string,
}

type PokemonTypeSlot = {
    slot: number,
    type: PokemonTypeInfo,
}

type Pokemon ={
    id: string,
    name: string,
    type: PokemonTypeSlot[],
}

type InitialState = {
    pokemons: Pokemon[]
}

const initialState: InitialState = {
    pokemons: []
}

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        getPokemons: () => {}
    }
})

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof  store.dispatch