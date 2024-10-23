import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../lib/api";
import PlaySound from "../components/PlaySound";


interface PokemonData {
  name: string;
  cries: {
    latest: string;
  };
}

export default function DetailPage() {
  // https://pokeapi.co/api/v2/pokemon/12
  // wir wollen basierend auf der id daten von der api holen

  // mit useParams kriegen wir alle Routenparameter die wir im Router definiert haben.
  // Da unser path in der Routendefinition "/pokemon/:id" ist
  // Wuerde ein Aufruf von   "localhost:5173/pokemon/12"
  // uns hier dieses objekt geben:              {id: 12}
  // via destructuring holen wir uns da nun direkt die id raus.
  const { id } = useParams();

  const pokemonQuery = useQuery<PokemonData>({
    // der queryKey ist ein Array, der unsere Query eindeutig identifizieren soll
    // wichtig ist das fuer caching, aber auch um zu wissen wann neu gefetcht werden soll
    // (aehnlich wie beim dependency array mit useEffect)
    queryKey: ["pokemon", id],
    // queryFn stellt unsere eigentliche Query dar und muss ein Promise (mit den gewuenschten Daten) zurueckgeben
    // in diesem Fall ist die Funktion selbst synchron, allerdings gibt getPokemonById ein Promise zurueck,
    queryFn: () => getPokemonById(id!),
  });

  // mit isError koennen wir abfragen ob es einen Fehler gab
  // spannend: wenn es fehler gibt, wird react-query es erst noch ein paar mal neu versuchen,
  // bevor wirklich ein Fehler ausgegeben wird. bis dahin gilt die Query als "pending"
  if (pokemonQuery.isError) {
    return "Sorry, kaputt";
  }

  // mit isPending koennen wir abfragen ob der Request gerade laedt
  if (pokemonQuery.isPending) {
    return "Loading...";
  }

  // Wenn wir isLoading und isError ausgeschlossen haben,
  // wissen wir dass isSuccess true ist, und unsere Daten (unter .data) da sind.


  return (
    <div>
      <h2>Details zu Pokemon #{id}</h2>
      <h1>{pokemonQuery.data.name}</h1>
      <PlaySound audioURL={pokemonQuery.data.cries.latest}/>
    </div>
  );
}
