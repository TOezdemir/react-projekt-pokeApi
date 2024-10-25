// import { useState } from "react";
// import { Type } from "../lib/api";
// import { fetchPokemonByType } from "../lib/api";
// import { Link } from "react-router-dom";
// import TypeHeader from "../components/TypeHeader";

// const typeNames: Type["type"]["name"][] = [
//   "bug",
//   "dark",
//   "dragon",
//   "electric",
//   "fairy",
//   "fighting",
//   "fire",
//   "flying",
//   "ghost",
//   "grass",
//   "ground",
//   "ice",
//   "normal",
//   "plant",
//   "poison",
//   "psychic",
//   "rock",
//   "steel",
//   "water",
// ];

// export default function Types() {
//   // Zustand für die ausgewählten Typen
//   const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
//   // Zustand für die gefilterten Pokémon
//   const [pokemonList, setPokemonList] = useState<
//     { name: string; id: number }[]
//   >([]);

//   // Funktion, um den Typ zu toggeln
//   const handleTypeToggle = (type: string) => {
//     setSelectedTypes(
//       (prevSelected) =>
//         prevSelected.includes(type)
//           ? prevSelected.filter((t) => t !== type) // Entferne Typ, wenn er bereits ausgewählt ist
//           : [...prevSelected, type] // Füge Typ hinzu, wenn er nicht ausgewählt ist
//     );
//   };

//   // Funktion, um alle Pokémon für die ausgewählten Typen zu fetchen und zu filtern
//   const handleSearch = async () => {
//     if (selectedTypes.length === 0) {
//       alert("Please, pick at least one type!");
//       return;
//     }

//     try {
//       // Fette Pokémon für alle ausgewählten Typen
//       const promises = selectedTypes.map((type) => fetchPokemonByType(type));
//       const results = await Promise.all(promises);

//       // Logik zur Zusammenführung und Filterung der Pokémon hier einbauen
//       const allPokemons = results.flatMap((result) => result);
//       console.log("Found Pokémon:", allPokemons);

//       // Setzt die Pokémon in den Zustand, um sie anzuzeigen
//       setPokemonList(allPokemons);
//     } catch (error) {
//       console.error("Team Rocket is at it again:", error);
//     }
//   };

//   return (
//     <>
//       <TypeHeader />
//       <div className="flex justify-center flex-wrap mt-8">
//         {/* Buttons für die Typen */}
//         {typeNames.map((type) => (
//           <button
//             key={type}
//             onClick={() => handleTypeToggle(type)}
//             className="w-40"
//             style={{
//               margin: "5px",
//               padding: "10px",
//               backgroundColor:
//                 // selectedTypes.includes(type)
//                 /*  ? "lightgreen" */
//                 /*  : "white", */
//                 type === "bug"
//                   ? "#3BB900"
//                   : type === "dragon"
//                   ? "#00458A"
//                   : type === "fairy"
//                   ? "#FFC2F9"
//                   : type === "fire"
//                   ? "#FF9900"
//                   : type === "ghost"
//                   ? "#5A1E64"
//                   : type === "ground"
//                   ? "#965A00"
//                   : type === "normal"
//                   ? "#B3B3B3"
//                   : type === "poison"
//                   ? "#AB00AE"
//                   : type === "rock"
//                   ? "#E1B237"
//                   : type === "water"
//                   ? "#00A0E4"
//                   : type === "dark"
//                   ? "#1C1C1C"
//                   : type === "electric"
//                   ? "#FFE600"
//                   : type === "fighting"
//                   ? "#E40000"
//                   : type === "flying"
//                   ? "#CCDADD"
//                   : type === "grass"
//                   ? "#57921C"
//                   : type === "ice"
//                   ? "#6AD2FF"
//                   : type === "plant"
//                   ? "#70DF00"
//                   : type === "psychic"
//                   ? "#FF81F2"
//                   : type === "steel"
//                   ? "#2A4950"
//                   : "whitesmoke",
//               border: "2px solid black",
//               cursor: "pointer",
//               borderRadius: "10px"
//             }}
//           >
//             {type.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Button zum Auslösen der Suche */}
//       <div className="flex justify-center flex-wrap mt-8">
//         <button
//           onClick={handleSearch}
//           className="border-8 rounded-lg text-blue-500 border-blue-500 w-60 text-3xl"
//           style={{
//             backgroundColor: "#FFE600",
//             margin: "5px",
//             padding: "10px",
//             cursor: "pointer",
//           }}
//         >
//           SEARCH
//         </button>
//       </div>

//       {/* Liste der aktuell ausgewählten Typen */}
//       <div className="flex flex-col justify-center items-center text-white flex-wrap mt-8">
//         <h3 className="text-xl">Picked Pokémon types:</h3>
//         <div className="flex flex-wrap gap-2"> {/* Flexbox Container für Buttons */}
//           {selectedTypes.map((type) => (
//             <button
//               key={type}
//               onClick={() => handleTypeToggle(type)} // Entfernt den Typ beim Klick
//               className="w-44"
//               style={{
//                 margin: "5px",
//                 padding: "5px 10px", // Geringeres Padding
//                 backgroundColor:
//                   type === "bug"
//                     ? "#3BB900"
//                     : type === "dragon"
//                     ? "#00458A"
//                     : type === "fairy"
//                     ? "#FFC2F9"
//                     : type === "fire"
//                     ? "#FF9900"
//                     : type === "ghost"
//                     ? "#5A1E64"
//                     : type === "ground"
//                     ? "#965A00"
//                     : type === "normal"
//                     ? "#B3B3B3"
//                     : type === "poison"
//                     ? "#AB00AE"
//                     : type === "rock"
//                     ? "#E1B237"
//                     : type === "water"
//                     ? "#00A0E4"
//                     : type === "dark"
//                     ? "#1C1C1C"
//                     : type === "electric"
//                     ? "#FFE600"
//                     : type === "fighting"
//                     ? "#E40000"
//                     : type === "flying"
//                     ? "#CCDADD"
//                     : type === "grass"
//                     ? "#57921C"
//                     : type === "ice"
//                     ? "#6AD2FF"
//                     : type === "plant"
//                     ? "#70DF00"
//                     : type === "psychic"
//                     ? "#FF81F2"
//                     : type === "steel"
//                     ? "#2A4950"
//                     : "whitesmoke",
//                 border: "2px solid black",
//                 cursor: "pointer",
//                 borderRadius: "10px"
//               }}
//             >
//               {type.toUpperCase()}
//             </button>
//           ))}
//         </div>
//         {selectedTypes.length === 0 && ( // Anzeige, wenn keine Typen ausgewählt sind
//           <p className="border rounded-md  p-2 m-2  text-white mb-8">
//             Pick a Pokémon type!
//           </p>
//         )}
//       </div>

//       {/* Anzeige der gefundenen Pokémon */}
//       <div>
//         <h3 className="text-center text-slate-600 text-2xl mb-8">
//           Caught Pokémon:
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  text-center md:mx-24 lg:mx-36 xl:mx-48 gap-4 relative">
//           {pokemonList.length > 0 ? (
//             pokemonList.map((pokemon, index) => (
//               <div key={index} className="border rounded-3xl">
//                 <Link to={`/pokemon/${pokemon.name}`}>
//                   <div className="">
//                     <img
//                       className="object-contain w-48 h-24 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-r from-[#ffe1c6] to-[#ffcb05] rounded-t-3xl"
//                       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
//                       alt={pokemon.name}
//                     />
//                   </div>
//                   <div className="bg-white text-slate-500 rounded-b-3xl p-2 flex justify-between px-4 sm:px-8">
//                     <h3>#{pokemon.id.toString().padStart(3, "0")}</h3>
//                     <p>
//                       {pokemon.name.charAt(0).toUpperCase() +
//                         pokemon.name.slice(1).toLowerCase()}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="absolute inset-0 flex justify-center items-center">
//               <p className="text-slate-600 ">No Pokémon found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
