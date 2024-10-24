export type Pokemon = {
    name: string;
    cries: {
      latest: string;
    };
  }

export default async function getPokemonById(id: number | string): Promise<Pokemon>{
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

export async function getPokemonByName(name: string): Promise<Pokemon>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(!response.ok){
            throw new Error("Fehler beim Abrufen der Pokémon-Liste!");
        }
        const data = await response.json() as Pokemon
        return data
    }
    catch (err){
        console.log(err)
        throw new Error;
    }
}