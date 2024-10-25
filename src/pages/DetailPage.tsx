import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PlaySound from "../components/PlaySound";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";
import Header from "../components/Header";
import PokeSearchBar from "../components/PokeSearchBar";

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

  const pokemonName =
    pokemonQuery.data.name.charAt(0).toUpperCase() +
    pokemonQuery.data.name.slice(1).toLowerCase();

  return (
    <div className="flex flex-col  justify-center items-center  gap-8">
      <Header />
      <PokeSearchBar />

      <button className="relative">
        <div className="animate-pulse bg-gradient-to-r from-[#ffffff] to-[#ff4d00] rounded-full w-96 h-96"></div>
        <img
          className="object-contain w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data.id}.png`}
          alt={pokemonName}
        />
        <PlaySound audioURL={pokemonQuery.data.cries.latest} />
      </button>

      <div className="flex gap-8 text-4xl font-extrabold text-yellow-300 drop-shadow-[0_4px_4px_rgba(44,114,184,1)]">
        <h3 className="font-bold">#{id!.toString().padStart(3, "0")}</h3> {/*  Fetter Schriftschnitt */}
        <p>{pokemonName}</p>
      </div>

      <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-[0_4px_4px_rgba(44,114,184,1)] mb-6"> {/* Margin-Bottom */}
        ATTACKS AND MOVEMENTS
      </p>

      <div className="grid grid-cols-2  gap-8 text-center">
        <div className="bg-yellow-300 drop-shadow-[0_4px_4px_rgba(44,114,184,1)] text-slate-400">
          <p className="bg-slate-600 text-yellow-300 mb-2">Abbilities:</p>

          <p>
            {pokemonQuery.data.abilities[0].ability.name
              .charAt(0)
              .toUpperCase() +
              pokemonQuery.data.abilities[0].ability.name
                .slice(1)
                .toLowerCase()}
          </p>

          <p>
            {pokemonQuery.data.abilities[1]?.ability.name
              .charAt(0)
              .toUpperCase() +
              pokemonQuery.data.abilities[1]?.ability.name
                .slice(1)
                .toLowerCase()}
          </p>
        </div>

        <div className="bg-yellow-300 drop-shadow-[0_4px_4px_rgba(44,114,184,1)] text-slate-400">
          <p className="bg-slate-600 text-yellow-300 mb-2">Moves:</p>
          <p>
            {pokemonQuery.data.moves[0].move.name.charAt(0).toUpperCase() +
              pokemonQuery.data.moves[0].move.name.slice(1).toLowerCase()}
          </p>
          <p>
            {pokemonQuery.data.moves[1].move.name.charAt(0).toUpperCase() +
              pokemonQuery.data.moves[1].move.name.slice(1).toLowerCase()}
          </p>
          <p>
            {pokemonQuery.data.moves[2].move.name.charAt(0).toUpperCase() +
              pokemonQuery.data.moves[2].move.name.slice(1).toLowerCase()}
          </p>
          <p>
            {pokemonQuery.data.moves[3].move.name.charAt(0).toUpperCase() +
              pokemonQuery.data.moves[3].move.name.slice(1).toLowerCase()}
          </p>
        </div>
      </div>
      <PlaySound audioURL={pokemonQuery.data.cries.latest} />
    </div>
  );
}
