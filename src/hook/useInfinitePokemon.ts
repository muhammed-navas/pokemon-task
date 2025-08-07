import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pokemon, PokemonPage } from "../types/type";
import { fetchMultiplePokemonDetails, fetchPokemonList } from '../api/pokemonApi';

const POKEMON_PER_PAGE = 6;

export const useInfinitePokemon = () => {
    return useInfiniteQuery({
      queryKey: ['pokemon', 'infinite'],
      queryFn: async ({ pageParam = 0 }) => {
        const pokemonList = await fetchPokemonList(pageParam, POKEMON_PER_PAGE);
        const detailedPokemon = await fetchMultiplePokemonDetails(pokemonList.results);
        return {
          pokemon: detailedPokemon,
          nextOffset: pokemonList.next ? pageParam + POKEMON_PER_PAGE : undefined,
          hasMore: !!pokemonList.next,
        };
      },
      getNextPageParam: (lastPage: PokemonPage) => lastPage.nextOffset,
      initialPageParam: 0,
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000, 
    });
  };

  export const flattenPokemonData = (data: any): Pokemon[] => {
    if (!data?.pages) return [];
    
    return data.pages.flatMap((page: any) => page.pokemon || []);
  }; 