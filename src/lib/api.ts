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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        if(!response.ok){
            throw new Error("Fehler beim Abrufen der Pokémon-Liste!");
        }
        const data = await response.json();
        const pokemonList = data.results;

        // Finde das Pokemon
        const pokemon = pokemonList.find((p: {name: string}) => p.name === name);
        if (!pokemon) {
            throw new Error(`Pokémon mit dem Namen "${name}" nicht gefunden!`);
        }

        // ID klären
        const pokemonId = pokemon.url.split("/").slice(-2, -1)[0]; 

        // Pokemon mit ID abrufen
        const pokemonDetails = await getPokemonById(pokemonId);
        return pokemonDetails; 
    }
    catch (err){
        console.log(err)
        throw new Error;
    }
}