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

export const getTypeById = async (id: number | string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/ytpe/${id}`);
    const json = response.json();
    return json;
  };
  
  export const getAllTypes = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const json = response.json();
    return json;
  };