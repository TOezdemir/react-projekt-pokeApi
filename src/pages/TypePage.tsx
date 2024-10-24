import { useEffect, useState } from "react";
import { Pokemon } from "../lib/api";
import { fetchPokemonByType } from "../lib/api";


const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "plant",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export default function Types() {
  // Zustand für die ausgewählten Typen
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // Zustand für die gefilterten Pokémon
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // Funktion, um den Typ zu toggeln
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(
      (prevSelected) =>
        prevSelected.includes(type)
          ? prevSelected.filter((t) => t !== type) // Entferne Typ, wenn er bereits ausgewählt ist
          : [...prevSelected, type] // Füge Typ hinzu, wenn er nicht ausgewählt ist
    );
  };

  // Verstehe das Problem hier nicht!
  useEffect(()=>{
    fetchPokemonByType()
  },[])

  // Funktion, um alle Pokémon für die ausgewählten Typen zu fetchen und zu filtern
  const handleSearch = async () => {
    if (selectedTypes.length === 0) {
      alert("Bitte wähle mindestens einen Typ aus.");
      return;
    }

    try {
      // Fette Pokémon für alle ausgewählten Typen
      const promises = selectedTypes.map((type) => fetchPokemonByType(type));
      const results = await Promise.all(promises);

      // Logik zur Zusammenführung und Filterung der Pokémon hier einbauen
      const allPokemons = results.flatMap((result) =>
        result.map((p: any) => p.pokemon.name)
      );
      console.log("Gefundene Pokémon:", allPokemons);

      // Setzt die Pokémon in den Zustand, um sie anzuzeigen
      setPokemonList(allPokemons);
    } catch (error) {
      console.error("Fehler beim Abrufen der Pokémon:", error);
    }
  };

  return (
    <>
      <div>
        {/* Buttons für die Typen */}
        {types.map((type) => (
          <button
            className="text-slate-500"
            key={type}
            onClick={() => handleTypeToggle(type)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedTypes.includes(type)
                ? "lightgreen"
                : "white",
              border: "2px solid black",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Button zum Auslösen der Suche */}
      <div>
        <button
          onClick={handleSearch}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: "lightblue",
            border: "2px solid black",
            cursor: "pointer",
          }}
        >
          SEARCH
        </button>
      </div>

      {/* Liste der aktuell ausgewählten Typen */}
      <div>
        <h3>Picked Pokémon types:</h3>
        <p>
          {selectedTypes.length > 0
            ? selectedTypes.join(", ")
            : "No types picked..."}
        </p>
      </div>

      {/* Anzeige der gefundenen Pokémon */}
      <div>
        <h3>Caught Pokémon:</h3>
        <ul>
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon, index) => <li key={index}>{pokemon}</li>)
          ) : (
            <p>No Pokémon found.</p>
          )}
        </ul>
      </div>
    </>
  );
}
