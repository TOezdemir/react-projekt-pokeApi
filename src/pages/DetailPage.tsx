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
    return "Team Rocket sabotaged this!";
  }

  if (pokemonQuery.isPending) {
    return "Loading...";
  }

  const pokemonName = pokemonQuery.data.name.charAt(0).toUpperCase() + pokemonQuery.data.name.slice(1).toLowerCase()

  return (
    <div>
      <button>
        <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data.id}.png`}
        alt={pokemonName}
        />
        <PlaySound audioURL={pokemonQuery.data.cries.latest}/>
      </button>
      
      <h3>#{id!.toString().padStart(3, '0')}</h3>
      <p>{pokemonName}</p>
      
      <br />
      <p>ATTACKS AND MOVEMENTS</p>
      <br />
      <p>Abbilities:</p>

      <p>{pokemonQuery.data.abilities[0].ability.name
      .charAt(0).toUpperCase()
      + pokemonQuery.data.abilities[0].ability.name
      .slice(1).toLowerCase()}</p>

      <p>{pokemonQuery.data.abilities[1]?.ability.name
      .charAt(0).toUpperCase()
      + pokemonQuery.data.abilities[1]?.ability.name
      .slice(1).toLowerCase()}</p>
      <br />
      <p>Moves:</p>
      <p>{pokemonQuery.data.moves[0].move.name
        .charAt(0).toUpperCase()
        + pokemonQuery.data.moves[0].move.name
        .slice(1).toLowerCase()}</p>
      <p>{pokemonQuery.data.moves[1].move.name
        .charAt(0).toUpperCase()
        + pokemonQuery.data.moves[1].move.name
        .slice(1).toLowerCase()}</p>
      <p>{pokemonQuery.data.moves[2].move.name
        .charAt(0).toUpperCase()
        + pokemonQuery.data.moves[2].move.name
        .slice(1).toLowerCase()}</p>
      <p>{pokemonQuery.data.moves[3].move.name
        .charAt(0).toUpperCase()
        + pokemonQuery.data.moves[3].move.name
        .slice(1).toLowerCase()}</p>
      <PlaySound audioURL={pokemonQuery.data.cries.latest}/>
    </div>
  );
}
