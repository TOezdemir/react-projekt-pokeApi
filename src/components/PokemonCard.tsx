import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import callPokemon from "../lib/api";

export default function PokemonCard({ id }: { id: number }) {
    const pokemonQuery = useQuery({
      queryKey: ["pokemon", id],
      queryFn: () => callPokemon(id),
    });
  
    if (pokemonQuery.isError) {
      return "Team Rocket was here - no Pokémons to show!";
    }
  
    if (pokemonQuery.isPending) {
      return "Pokédex is loading...";
    }
    const pokemonName = pokemonQuery.data.name.charAt(0).toUpperCase() + pokemonQuery.data.name.slice(1).toLowerCase()
  
    return (
      <div>
        <Link to={`/pokemon/${id}`}>
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data.id}.png`}
              alt={pokemonName}
            />
          </div>
          <div>
            <h3>#{id.toString().padStart(3, '0')}</h3>
            <p>{pokemonName}</p>
          </div>
        </Link>
      </div>
    );
  };