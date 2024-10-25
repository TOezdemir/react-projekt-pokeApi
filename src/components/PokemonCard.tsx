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
    return(
      <div className="border rounded-3xl">
      <Link to={`/pokemon/${id}`}>
        <div className="">
          {/* <img
            className="object-contain w-48 h-24 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-[#ffe1c6] to-[#ffcb05] rounded-t-3xl"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data.id}.png`}
            alt={}
          /> */}
        </div>
        <div className="bg-white text-slate-500 rounded-b-3xl p-2 flex justify-between px-4 sm:px-8">
          {/* <h3>#{id.toString().padStart(3, "0")}</h3> */}
          <p>{"Loading..."}</p>
        </div>
      </Link>
    </div>
    )
  }

  const pokemonName =
    pokemonQuery.data.name.charAt(0).toUpperCase() +
    pokemonQuery.data.name.slice(1).toLowerCase();

  return (
    <div className="border rounded-3xl">
      <Link to={`/pokemon/${id}`}>
        <div className="">
          <img
            className="object-contain w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-[#ffe1c6] to-[#ffcb05] rounded-t-3xl"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data.id}.png`}
            alt={pokemonName}
          />
        </div>
        <div className="bg-white text-slate-500 rounded-b-3xl p-2 flex justify-between px-4 sm:px-8">
          <h3>#{id.toString().padStart(3, "0")}</h3>
          <p>{pokemonName}</p>
        </div>
      </Link>
    </div>
  );
}
