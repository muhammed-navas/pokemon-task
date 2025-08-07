import type { Pokemon, PokemonCardProps } from "../../types/type";


const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  const getPokemonImage = (pokemon: Pokemon): string => {
    return (
      pokemon.sprites.other['official-artwork'].front_default ||
      pokemon.sprites.front_default ||
      '/placeholder-pokemon.png'
    );
  };
  
  const getStatValue = (pokemon: Pokemon, statName: string): number => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat?.base_stat || 0;
  };
  

const PokemonCard = ({ pokemon,
    isInCollection,
    onAddToCollection,
    onRemoveFromCollection,
    showRemoveButton = false, }: PokemonCardProps) => {

    const handleAddToCollection = () => {
        onAddToCollection(pokemon);
    };

    const handleRemoveFromCollection = () => {
        console.log('@id',pokemon.id)
        if (onRemoveFromCollection) {
            onRemoveFromCollection(pokemon.id);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">

            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <img
                    src={getPokemonImage(pokemon)}
                    alt={pokemon.name}
                    className="w-full h-48 object-contain mx-auto"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-pokemon.png';
                    }}
                />

                <div className="absolute top-2 right-2">
                    {showRemoveButton ? (
                        <button
                            onClick={handleRemoveFromCollection}
                            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 shadow-lg"
                            title="Remove from collection"
                        >
                            <span className="text-lg font-bold">×</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCollection}
                            disabled={isInCollection}
                            className={`rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition-all duration-200 shadow-lg ${isInCollection
                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-110'
                                }`}
                            title={isInCollection ? 'Already in collection' : 'Add to collection'}
                        >
                            <span className="text-lg font-bold">
                                {isInCollection ? '✓' : '+'}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Pokemon Info */}
            <div className="p-4">
                {/* Name and ID */}
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800 capitalize">
                        {pokemon.name}
                    </h3>
                    <span className="text-sm text-gray-500 font-mono">
                        #{pokemon.id.toString().padStart(3, '0')}
                    </span>
                </div>
                {/* Show addedAt if present */}
                {typeof (pokemon as any).addedAt === 'number' && (
                    <div className="mb-2 text-xs text-gray-400">
                        Added: {new Date((pokemon as any).addedAt).toLocaleString()}
                    </div>
                )}

                {/* Types */}
                <div className="flex gap-2 mb-3">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${typeColors[type.type.name] || 'bg-gray-400'
                                }`}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">HP:</span>
                        <span className="font-semibold text-green-600">
                            {getStatValue(pokemon, 'hp')}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Attack:</span>
                        <span className="font-semibold text-red-600">
                            {getStatValue(pokemon, 'attack')}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Defense:</span>
                        <span className="font-semibold text-blue-600">
                            {getStatValue(pokemon, 'defense')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard