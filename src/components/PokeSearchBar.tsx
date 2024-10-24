import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";
import { useNavigate } from "react-router-dom";
import themebild from "../assets/theme.png";
import menu from "../assets/menu.png";
import { useThemeContext } from "../contexts/themeContext";
import { NavLink } from "react-router-dom";

export default function PokeSearchBar() {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const catchPokemon = async () => {
    const searchText = inputRef.current?.value;
    if (searchText) {
      try {
        const pokemon = await callPokemon(searchText);
        navigate(`/pokemon/${pokemon.name}`);
      } catch (err) {
        console.error("Fehler:", err);
      }
      setPokemonData(await callPokemon(searchText));
      inputRef.current!.value = "";
      console.log(searchText);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await catchPokemon();
  };

  useEffect(() => {
    catchPokemon();
  }, []);

  const { toggleTheme } = useThemeContext();
  return (
    <section>
      <div className="flex justify-between gap-8 items-center">
        <NavLink to="/type">
          <img src={menu} alt="menu" />
        </NavLink>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            aria-label="Pokemon search field"
            placeholder="Pokemon"
            ref={inputRef}
            className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
            onChange={(event) => setSearchText(event.target.value)}
            value={searchText}
          />
        </form>
        <button onClick={toggleTheme}>
          <img src={themebild} alt="theme" className="" />
        </button>
      </div>
    </section>
  );
}
