import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PlaySound from "../components/PlaySound";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";
// import { getPokemonByName } from "../lib/api";


export default function DetailPage() {

  const { id } = useParams();

  const pokemonQuery = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => callPokemon(id!),
  });

  if (pokemonQuery.isError) {
    return "Sorry, kaputt";
  }

  if (pokemonQuery.isPending) {
    return "Loading...";
  }

  return (
    <div>
      <h2>Details zu Pokemon #{id}</h2>
      <h1>{pokemonQuery.data.name}</h1>
      {/* <p>{pokemonQuery.data.}</p> */}
      <PlaySound audioURL={pokemonQuery.data.cries.latest}/>
    </div>
  );
}
