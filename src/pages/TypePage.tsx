import { useState } from "react";
import { Type } from "../lib/api";
import { fetchPokemonByType } from "../lib/api";
import { Link } from "react-router-dom";

const typeNames: Type["type"]["name"][] = [
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
  const [pokemonList, setPokemonList] = useState<{name: string, id: number}[]>([]);

  // Funktion, um den Typ zu toggeln
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(
      (prevSelected) =>
        prevSelected.includes(type)
          ? prevSelected.filter((t) => t !== type) // Entferne Typ, wenn er bereits ausgewählt ist
          : [...prevSelected, type] // Füge Typ hinzu, wenn er nicht ausgewählt ist
    );
  };

  // Funktion, um alle Pokémon für die ausgewählten Typen zu fetchen und zu filtern
  const handleSearch = async () => {
    if (selectedTypes.length === 0) {
      alert("Please, pick at least one type!");
      return;
    }

    try {
      // Fette Pokémon für alle ausgewählten Typen
      const promises = selectedTypes.map((type) => fetchPokemonByType(type));
      const results = await Promise.all(promises);

      // Logik zur Zusammenführung und Filterung der Pokémon hier einbauen
      const allPokemons = results.flatMap((result) => result)
      console.log("Found Pokémon:", allPokemons);

      // Setzt die Pokémon in den Zustand, um sie anzuzeigen
      setPokemonList(allPokemons);
    } catch (error) {
      console.error("Team Rocket is at it again:", error);
    }
  };

  return (
  <>
    <div>
        {/* Buttons für die Typen */}
        {typeNames.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: 
              // selectedTypes.includes(type)
              /*  ? "lightgreen" */
              /*  : "white", */
              type === "bug" ? "green" :
              type === "dragon" ? "darkblue" :
              type === "fairy" ? "pink" :
              type === "fire" ? "orange" :
              type === "ghost" ? "purple" :
              type === "ground" ? "brown" :
              type === "normal" ? "grey" :
              type === "poison" ? "violet" :
              type === "rock" ? "beige" :
              type === "water" ? "teal" :
              type === "dark" ? "black" :
              type === "electric" ? "yellow" :
              type === "fighting" ? "red" :
              type === "flying" ? "" : 
              type === "grass" ? "darkgreen" :
              type === "ice" ? "lightblue" :
              type === "plant" ? "lightgreen" :
              type === "psychic" ? "lightpink" :
              type === "steel" ? "darkgray" :
              "whitesmoke",
              border: "2px solid black",
              cursor: "pointer",
            }}
          >
            {type.toUpperCase()}
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
            backgroundColor: "yellow",
            border: "2px solid blue",
            color: "blue",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon, index) => (
          <div key={index} className="border rounded-3xl">
            <Link to={`/pokemon/${pokemon.name}`}>
              <div className="">
                <img
                className="object-contain w-48 h-24 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-[#ffe1c6] to-[#ffcb05] rounded-t-3xl"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`} 
                alt={pokemon.name}/>
              </div>
              <div className="bg-white text-slate-500 rounded-b-3xl p-2 flex justify-between px-4 sm:px-8">
              <h3>#{(pokemon.id).toString().padStart(3, "0")}</h3>
              <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</p>
              </div>
            </Link>
          </div>
        ))
        ) : (
        <p>No Pokémon found.</p>
        )}
      </div>
    </div>
  </>
  );
}
