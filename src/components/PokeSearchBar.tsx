import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import themebild from "../assets/theme.svg";
import menu from "../assets/menu.svg";
import { useThemeContext } from "../contexts/themeContext";
import { NavLink } from "react-router-dom";
import zurueck from "../assets/zurueck.svg";

export default function PokeSearchBar() {
  const [, /*pokemonData*/ setPokemonData] = useState<Pokemon | null>(null);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const catchPokemon = async () => {
    const searchText = inputRef.current?.value.toLocaleLowerCase();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { toggleTheme } = useThemeContext();

  const currentLink = useLocation();
  console.log(currentLink.pathname);

  return (
    <section>
      <div className="flex justify-between gap-8 items-center">
        {currentLink.pathname === "/" ? (
          <NavLink to="/type">
            <img src={menu} alt="menu" />
          </NavLink>
        ) : (
          <NavLink to="/">
            <img src={zurueck} alt="zurück" />
          </NavLink>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            aria-label="Pokemon search field"
            placeholder="Catch Pokémon..."
            ref={inputRef}
            className="border border-gray-400 px-3 py-2 rounded-lg mr-2 text-slate-500"
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
