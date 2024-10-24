import { Link } from "react-router-dom";
import Header from "../components/Header";
import PokeSearchBar from "../components/PokeSearchBar";
import { useThemeContext } from "../contexts/themeContext";

const PokemonCard = ({ id }: { id: number }) => (
  <div>
    <Link to={`/pokemon/${id}`}>
    <div>
      <img src="" alt="" />
      <h3>#00{id}</h3>
      <p>{id}</p>
    </div>
      
    </Link>
  </div>
);

const TypePage = () => (
  <div>
    <Link to={`/type`}>
      <h1>Types</h1>
    </Link>
  </div>
);

// mit Array(number) koennen wir einen Array mit einer bestimmten laenge erzeugen:
// const array151 = Array(151)
// dieser wird allerdings leere Eintraege haben.
// Also nicht [undefined, undefined, undefined,...]
// sondern [empty x 151] (es handelt sich um einen sogenannten "sparse array")
// Manche Operationen funktionieren damit, manche aber auch nicht.
// array.map z.B. funktioniert nicht, [...array] oder Array.fill() aber schon.
// Bevor wir mappen koennen, muessen wir den array also erst in eine Form zwingen,
// in der seine Eintraege nicht mehr empty, sondern zumindest undefined sind.
// Das geht z.B. so: Array(151).fill(1)
// (Hier sind alle Eintraege 1)
// oder auch so: [...Array(151)]
// (hier sind alle Eintraege undefined) 
// Erst dann koennen wir mappen.

const emptyPokemonArray = Array(151).fill(1);

const Homepage = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`${
        theme == "dark" ? "xxxxx" : "sss"
      }  min-h-[100vh] dark:bg-black bg-[#ccdadd]`}
    >
      <div className="flex flex-col  justify-center items-center ">
        <div>
          <TypePage />
        </div>
        <h1>Pokemon</h1>
        <Header />
        <PokeSearchBar />

        <div>
          {emptyPokemonArray.map((_id, index) => (
            // da alle eintraege des Arrays 1 sind, verwenden wir den index um hochzuzaehlen.
            // da der index bei 0 anfaengt, addieren wir jeweils 1
            <PokemonCard key={index} id={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
