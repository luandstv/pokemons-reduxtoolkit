# Listagem de Pokémon com React e RTK Query

Este projeto é uma aplicação web desenvolvida com React, Vite e TypeScript que exibe uma lista de Pokémon consumindo a [PokeAPI](https://pokeapi.co/). A principal funcionalidade é a implementação de um scroll infinito eficiente para carregar os Pokémon de forma paginada.

## ✨ Funcionalidades Principais

-   **Ambiente Moderno:** Construído com Vite para um desenvolvimento rápido e otimizado.
-   **Tipagem Estática:** Uso de TypeScript para garantir a segurança e a manutenibilidade do código.
-   **Gerenciamento de Estado e Cache:** Utilização do Redux Toolkit e RTK Query para gerenciar o estado da aplicação e o cache das requisições à API.
-   **Scroll Infinito:** Carregamento automático de mais Pokémon conforme o usuário rola a página, utilizando a API `IntersectionObserver`.
-   **Arquitetura Limpa:** Separação clara de responsabilidades entre a camada de UI (componentes) e a camada de serviço (API).

## 🚀 Decisões Técnicas e Arquitetura

A organização do projeto foi pensada para ser escalável e de fácil manutenção.

### 1. Camada de API com RTK Query (`src/services/pokemonApi.ts`)

A comunicação com a PokeAPI é centralizada em um serviço criado com RTK Query. A principal melhoria foi a refatoração da busca paginada de Pokémon.

-   **Abordagem Adotada: `infiniteQuery`**

    Em vez de uma implementação manual com `builder.query` que exigia lógica customizada de `merge` para juntar os resultados, foi adotado o `builder.infiniteQuery`. Esta abordagem é a recomendada pelo RTK Query para listas paginadas ou "infinitas".

    **Vantagens:**
    -   **Código Simplificado:** Remove a necessidade de gerenciar manualmente o cache com `merge`, `serializeQueryArgs` e `forceRefetch`.
    -   **Lógica Declarativa:** Apenas precisamos definir a função `getNextPageParam`, que extrai o `offset` da próxima página a partir da resposta da API.
    -   **Hooks Otimizados:** Gera o hook `useGetPokemonsInfiniteQuery`, que já fornece helpers como `fetchNextPage` e `hasNextPage`, simplificando a lógica no componente.

    ```typescript
    // src/services/pokemonApi.ts
    getPokemons: builder.infiniteQuery<PokemonListResponse, void>({
      query: ({ pageParam = 0 }) => `pokemon-form?offset=${pageParam}&limit=20`,
      infiniteQueryOptions: {
        getNextPageParam: (lastPage) => {
          if (lastPage.next) {
            const url = new URL(lastPage.next);
            const offset = url.searchParams.get("offset");
            return offset ? Number(offset) : undefined;
          }
          return undefined;
        },
      },
    }),
    ```

### 2. Organização de Tipos (`src/types/pokemon.ts`)

Para melhorar a organização e reutilização, todas as interfaces TypeScript (`Pokemon`, `PokemonListResponse`, etc.) foram extraídas para um arquivo dedicado. Isso torna o arquivo da API mais focado em sua responsabilidade principal: definir os endpoints.

### 3. Componente de UI com Scroll Infinito (`src/components/PokemonList.tsx`)

O componente que renderiza a lista utiliza o hook `useGetPokemonsInfiniteQuery` e a API `IntersectionObserver` do navegador para uma experiência de scroll infinito fluida.

-   Um `observer` monitora o último item da lista.
-   Quando o último item entra na área visível da tela, a função `fetchNextPage()` (do hook) é chamada.
-   O RTK Query automaticamente busca os novos dados e os anexa ao cache existente, fazendo com que o componente renderize a lista atualizada.

## 📦 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/luandstv/pokemons-reduxtoolkit.git
    ```

2.  **Navegue até o diretório:**
    ```bash
    cd list-pokemon
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.
