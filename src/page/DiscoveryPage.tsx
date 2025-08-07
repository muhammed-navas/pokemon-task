import { useEffect } from "react";
import PokemonCard from "../components/card/card";
import { flattenPokemonData, useInfinitePokemon } from "../hook/useInfinitePokemon";
import { useInView } from 'react-intersection-observer';
import type { Pokemon } from "../types/type";


interface DiscoveryPageProps {
  addToCollection: (pokemon: Pokemon) => void;
  removeFromCollection: (pokemonId: number) => void;
  collection: Pokemon[];
}

const DiscoveryPage = ({ addToCollection, removeFromCollection, collection }: DiscoveryPageProps) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfinitePokemon();
    const allPokemon = flattenPokemonData(data);
    const { ref: loadMoreRef, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Pokemon</h2>
              <p className="text-gray-600">Please try again later.</p>
            </div>
          </div>
        );
      }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Pokemon</h2>
          <p className="text-gray-600">Scroll to discover more Pokemon and add them to your collection!</p>
        </div>
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isInCollection={collection.some(p => p.id === pokemon.id)}
              onAddToCollection={addToCollection}
              onRemoveFromCollection={(e, pokemonId) => {
                e.stopPropagation();
                removeFromCollection(pokemonId);
              }}
            />
          ))}
        </div>
    
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          ) : hasNextPage ? (
            <p className="text-gray-500">Loading more Pokemon...</p>
          ) : (
            <p className="text-gray-500">You've reached the end!</p>
          )}
        </div>
      </div>
    )
}
export default DiscoveryPage
