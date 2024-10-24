import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "../lib/api";
import callPokemon from "../lib/api";
import { useNavigate } from "react-router-dom";


export default function PokeSearchBar(){
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [searchText, setSearchText] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const catchPokemon  = async () => {
        const searchText = inputRef.current?.value
        if(searchText){
            try{
                await callPokemon(searchText)
                navigate (`/pokemon/${searchText}`)
            } catch (err){
                console.error("Fehler:", err)
            }
            setPokemonData(await callPokemon(searchText))
            inputRef.current!.value = ""
            console.log(searchText)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await catchPokemon();
    }

	useEffect(() => {
		catchPokemon();
	}, []);

    return(
        <section>
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
        </section>
    )
}