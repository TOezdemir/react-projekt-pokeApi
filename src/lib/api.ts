export type Pokemon = {
    abilities: Ability[];
    cries: {
      latest: string;
    };
    height: number;
    id: number;
    location_area_encounters: string;
    name: string;
    order: number;
    types: Type[];
    weight: number;
    moves: Moves[]
    sprites: {
        other: {
            front_default: string
        },
        home: {
            front_default: string,
            front_shiny: string
        }
    }
  }

  export type Ability = {
    ability: {
        name: string;
      };
      slot: number;
    }

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
        };
    }

export type Moves = {
    move: {
        name: string
    }
}

export type PokemonType = {
    pokemon: {
      name: string;
      url: string;
    };
  };

export type TypeData = {
    pokemon: PokemonType[];
  };

export default async function callPokemon(id: number | string): Promise<Pokemon>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if(!response.ok){
            throw new Error("Fehler!")
        }
        const data = await response.json() as Pokemon
        return data
    }
    catch (err){
        console.log(err)
        throw new Error
    }
}

export async function fetchPokemonByType(type: string): Promise<{name: string, id: number}[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json() as TypeData;
    const filteredPokemon = data.pokemon.filter((pokemon) => {
      const pokemonId = pokemon.pokemon.url.split("/").slice(-2, -1)[0];
      return parseInt(pokemonId) <= 151;
    }).map((pokemon)=>{
      const pokemonId = pokemon.pokemon.url.split("/").slice(-2,-1)[0]
      return{
        name: pokemon.pokemon.name,
        id: parseInt(pokemonId)
      }
    })
    return filteredPokemon;
  }