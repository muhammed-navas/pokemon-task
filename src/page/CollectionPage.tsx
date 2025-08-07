import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
   type DragEndEvent,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    useSortable,
    horizontalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';
import PokemonCard from '../components/card/card';
import { useState, useEffect } from 'react';
import type { CollectionPokemon } from '../types/type';

interface SortablePokemonCardProps {
  pokemon: CollectionPokemon | null | undefined;
  onRemoveFromCollection: (e: React.MouseEvent, pokemonId: number) => void;
}

const SortablePokemonCard = ({ pokemon, onRemoveFromCollection }: SortablePokemonCardProps) => {
    // Return loading state if pokemon is not available
    if (!pokemon) {
      return (
        <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-64 w-full">
          <div className="bg-gray-200 rounded h-32 w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      );
    }

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: pokemon.id.toString(),
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };
    
    const handleRemoveClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemoveFromCollection(e, pokemon.id);
    };
    
    const handleDragStart = (e: any) => {
      if (e.target.closest('button')) {
        e.preventDefault();
        return false;
      }
      listeners?.onPointerDown?.(e);
    };
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`transition-transform duration-200 ${
          isDragging ? 'scale-105 rotate-1' : ''
        }`}
      >
        <div 
          {...attributes} 
          onPointerDown={handleDragStart}
          className="h-full"
        >
          <PokemonCard
            pokemon={pokemon}
            isInCollection={true}
            onAddToCollection={() => {}}
            onRemoveFromCollection={handleRemoveClick}
            showRemoveButton={true}
          />
        </div>
      </div>
    );
  };

const CollectionPage = ({ collection, removeFromCollection, reorderCollection }: { collection: CollectionPokemon[]; removeFromCollection: (pokemonId: number) => void; reorderCollection: (startIndex: number, endIndex: number) => void }) => {
    const [items, setItems] = useState<string[]>([]);
    
    useEffect(() => {
      setItems(collection.map(p => p.id.toString()));
    }, [collection]);
  
    const sensors = useSensors(useSensor(PointerSensor));
  
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
  
      if (!over || active.id === over.id) return;
  
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
  
      if (oldIndex === -1 || newIndex === -1) return;
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      reorderCollection(oldIndex, newIndex);
    };
    
    const handleRemoveFromCollection = (e: React.MouseEvent, pokemonId: number) => {
      e.stopPropagation();
      removeFromCollection(pokemonId);
    };
  
    if (collection.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Collection is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start discovering Pokemon and add them to your collection!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">How to get started:</h3>
              <ul className="text-blue-800 text-sm space-y-1 text-left">
                <li>• Go to the Discovery tab</li>
                <li>• Browse through Pokemon</li>
                <li>• Click the + button to add to collection</li>
                <li>• Come back here to organize your collection</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Collection</h2>
          <p className="text-gray-600">
            Drag and drop Pokemon in your collection to change their order.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Total Pokemon: {collection.length}
          </div>
        </div>
  
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={horizontalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((id) => {
                const pokemon = collection.find((p) => p.id.toString() === id);
                return (
                  <SortablePokemonCard 
                    key={id} 
                    onRemoveFromCollection={handleRemoveFromCollection} 
                    pokemon={pokemon} 
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  };

  export default CollectionPage