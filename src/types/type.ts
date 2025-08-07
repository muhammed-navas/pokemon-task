export interface PokemonPage {
    pokemon: Pokemon[];
    nextOffset?: number;
    hasMore: boolean;
  }

  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
   

  export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    types: PokemonType[];
    stats: PokemonStat[];
  }
  
  
  export interface PokemonListItem {
    name: string;
    url: string;
  }

  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
  }


  export interface HeaderProps {
    currentPage: 'discovery' | 'collection';
    onPageChange: (page: 'discovery' | 'collection') => void;
    collectionCount: number;
  }


 export interface PokemonCardProps {
    pokemon: Pokemon;
    isInCollection: boolean;
    onAddToCollection: (pokemon: Pokemon) => void;
    onRemoveFromCollection?: (e: React.MouseEvent, pokemonId: number) => void;
    showRemoveButton?: boolean;
  }

  export interface CollectionPokemon extends Pokemon {
    addedAt: number;
  }