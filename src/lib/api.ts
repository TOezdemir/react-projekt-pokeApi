export const getPokemonById = async (id: number | string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = response.json();
    return json
}