import React, { useState } from "react";

// Definiere eine Liste der verfügbaren Pokémon-Typen
const types = [
  "BUG",
  "DARK",
  "DRAGON",
  "ELECTRIC",
  "FAIRY",
  "FIGHTING",
  "FIRE",
  "FLYING",
  "GHOST",
  "GRASS",
  "GROUND",
  "ICE",
  "NORMAL",
  "PLANT",
  "POISON",
  "PSYCHIC",
  "ROCK",
  "STEEL",
  "WATER",
];

export default function Types() {
  // useState Hook, um die ausgewählten Typen zu speichern
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Funktion, um den Typ zu toggeln (hinzufügen/entfernen)
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(
      (prevSelected) =>
        prevSelected.includes(type)
          ? prevSelected.filter((t) => t !== type) // Entfernt den Typ, wenn er bereits ausgewählt ist
          : [...prevSelected, type] // Fügt den Typ hinzu, wenn er nicht ausgewählt ist
    );
  };

  // Funktion, um die Auswahl zu bestätigen (z.B. um Pokémon zu filtern)
  const handleSearch = () => {
    console.log("Suche Pokémon mit diesen Typen:", selectedTypes);
    // Hier könntest du die Logik hinzufügen, um Pokémon anhand der ausgewählten Typen zu filtern
  };

  return (
    <>
      <div>
        {/* Buttons für jeden Typ */}
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            style={{
              margin: "10px",
              padding: "7px",
              backgroundColor: selectedTypes.includes(type)
                ? "lightblue"
                : "white", // Farbliche Hervorhebung ausgewählter Buttons
              border: "2px solid black",
              borderRadius: "5px",
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
          style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}
        >
          Suche Pokémon
        </button>
      </div>

      {/* Liste der aktuell ausgewählten Typen */}
      <div>
        <h3>Ausgewählte Typen:</h3>
        <p>
          {selectedTypes.length > 0
            ? selectedTypes.join(", ")
            : "Keine Typen ausgewählt"}
        </p>
      </div>
    </>
  );
}
