import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "../lib/api";
import getPokemonById from "../lib/api";


export default function PokeSearchBar(){
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    // const [searchText, setSearchText] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

    const catchPokemon  = async () => {
        const searchText = inputRef.current?.value
        if(searchText){
            setPokemonData(await getPokemonById(searchText));
            inputRef.current!.value = ""
        }
    }

	useEffect(() => {
		catchPokemon();
	}, []);

    return(
        <section>
            <form action="">
            <input 
              				type="text" 
              				aria-label="Pokemon search field" 
              				placeholder="Pokemon"
							ref={inputRef}
              				className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
              				onChange={(event) => setSearchText(event.target.value)}
                            // value={searchText}
					/>
            </form>
        </section>
    )
}