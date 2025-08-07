import { useState } from 'react';
import './App.css'
import Header from './components/layout/Header'
import DiscoveryPage from './page/DiscoveryPage'
import type { CollectionPokemon, Pokemon } from './types/type';
import CollectionPage from './page/CollectionPage';

const COLLECTION_STORAGE_KEY = 'pokemon_collection';
function getInitialCollection(): CollectionPokemon[] {
  try {
    const saved = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to parse collection from localStorage:", e);
  }
  return [];
}

function App() {
  const [currentPage, setCurrentPage] = useState<'discovery' | 'collection'>('discovery');
  const [collection, setCollection] = useState<CollectionPokemon[]>(getInitialCollection);

  const addToCollection = (pokemon: Pokemon) => {
    const newCollection = [...collection, { ...pokemon, addedAt: Date.now() }];
    setCollection(newCollection);
    localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(newCollection));
  };

  const removeFromCollection = (pokemonId: number) => {
    const newCollection = collection.filter(p => p.id !== pokemonId);
    setCollection(newCollection);
    localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(newCollection));
  };

  const reorderCollection = (startIndex: number, endIndex: number) => {
    setCollection((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      // Save the reordered collection to localStorage
      localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(result));
      return result;
    });
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          collectionCount={collection.length}
        />
        <main className="pt-16">
          {currentPage === 'discovery' ? (
            <DiscoveryPage 
              addToCollection={addToCollection} 
              removeFromCollection={removeFromCollection} 
              collection={collection} 
            />
          ) : (
            <CollectionPage collection={collection} removeFromCollection={removeFromCollection} reorderCollection={reorderCollection} />
          )}
        </main>
      </div>
  ) 
}

export default App
