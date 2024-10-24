import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PlaySound from "../components/PlaySound";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";


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
      <br />
      <p>Abbilities:</p>
      <p>{pokemonQuery.data.abilities[0].ability.name}</p>
      <p>{pokemonQuery.data.abilities[1]?.ability.name}</p>
      <br />
      <p>Moves:</p>
      <p>{pokemonQuery.data.moves[0].move.name}</p>
      <p>{pokemonQuery.data.moves[1].move.name}</p>
      <p>{pokemonQuery.data.moves[2].move.name}</p>
      <p>{pokemonQuery.data.moves[3].move.name}</p>
      <PlaySound audioURL={pokemonQuery.data.cries.latest}/>
    </div>
  );
}
