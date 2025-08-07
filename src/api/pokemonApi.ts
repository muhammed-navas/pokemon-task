import type { Pokemon, PokemonListResponse } from "../types/type";


export const fetchPokemonList = async (
    offset: number = 0,
    limit: number = 6
  ): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw new Error('Failed to fetch Pokemon list');
    }
  };
  
  export const fetchPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/pokemon/${nameOrId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching Pokemon details for ${nameOrId}:`, error);
      throw new Error(`Failed to fetch Pokemon details for ${nameOrId}`);
    }
  };

  export const fetchMultiplePokemonDetails = async (
    pokemonList: { name: string; url: string }[]
  ): Promise<Pokemon[]> => {
    try {
      const promises = pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.name));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching multiple Pokemon details:', error);
      throw new Error('Failed to fetch multiple Pokemon details');
    }
  }; 