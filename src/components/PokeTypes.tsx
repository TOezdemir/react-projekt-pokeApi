import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callPokemon from "../lib/api";
import type { Pokemon } from "../lib/api";

function PokeTypes() {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [searchType, setSearchType] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const catchPokemon = async () => {
    const searchType = inputRef.current?.value;
    if (searchType) {
      try {
        const data = await callPokemon(searchType); // API-Aufruf
        setPokemonData(data);
        navigate(`/pokemon/${searchType}`);
        console.log(searchType);
      } catch (err) {
        console.error("Fehler:", err);
      }
      inputRef.current!.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await catchPokemon();
  };

  // Verwende useEffect, wenn nötig, um den API-Aufruf bei Mount zu triggern
  useEffect(() => {
    if (searchType) {
      catchPokemon();
    }
  }, [searchType]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Pokemon search field"
          placeholder="Pokemon"
          ref={inputRef}
          className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
          onChange={(event) => setSearchType(event.target.value)}
          value={searchType}
        />
        <button type="submit">Suche</button>
      </form>

      {/* Hier kannst du die gefundene Pokemon-Daten rendern */}
      {pokemonData && (
        <div>
          <h2>Gefundene Pokémon: {pokemonData.name}</h2>
          {/* Weitere Informationen anzeigen */}
        </div>
      )}
    </section>
  );
}

export default PokeTypes;
