import { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

// Liste der Pokémon-Typen
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
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  // Funktion, um den Typ zu toggeln
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(
      (prevSelected) =>
        prevSelected.includes(type)
          ? prevSelected.filter((t) => t !== type) // Entferne Typ, wenn er bereits ausgewählt ist
          : [...prevSelected, type] // Füge Typ hinzu, wenn er nicht ausgewählt ist
    );
  };

  // Funktion, um die Pokémon für einen bestimmten Typ zu fetchen
  const fetchPokemonByType = async (type: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.pokemon; // Dies gibt eine Liste der Pokémon für den Typ zurück
  };

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
        <NavLink
          to="/"
          className="flex justify-center items-center dark:bg-black pt-8 pb-8"
        >
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="grid grid-cols-3 mx-[20%]">
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
      <div className="flex justify-center items-center text-slate-600">
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
          Suche Pokémon
        </button>
      </div>

      {/* Liste der aktuell ausgewählten Typen */}
      <div className="flex flex-col justify-center items-center text-slate-600">
        <h3>Ausgewählte Typen:</h3>
        <p className="text-center">
          {selectedTypes.length > 0
            ? selectedTypes.join(", ")
            : "Keine Typen ausgewählt"}
        </p>
      </div>

      {/* Anzeige der gefundenen Pokémon */}
      <div className="flex flex-col justify-center items-center text-slate-600">
        <h3 className="">Gefundene Pokémon:</h3>
        <ul className="flex flex-col justify-center items-center">
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon, index) => <li key={index}>{pokemon}</li>)
          ) : (
            <p>Keine Pokémon gefunden.</p>
          )}
        </ul>
      </div>
    </>
  );
}
