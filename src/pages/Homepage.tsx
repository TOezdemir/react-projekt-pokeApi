import { Link } from "react-router-dom";
import Header from "../components/Header";
import PokeSearchBar from "../components/PokeSearchBar";
// import { useThemeContext } from "../contexts/themeContext";
import { useQuery } from "@tanstack/react-query";
import callPokemon from "../lib/api";

const PokemonCard = ({ id }: { id: number }) => {
  const pokemonQuery = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => callPokemon(id),
  });

  const pokemonName = pokemonQuery.data!.name.charAt(0).toUpperCase() + pokemonQuery.data!.name.slice(1).toLowerCase()

  return (
    <div>
      <Link to={`/pokemon/${id}`}>
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonQuery.data?.id}.png`}
            alt={pokemonQuery.data!.name}
          />
          <h3>#{id.toString().padStart(3, '0')}</h3>
          <p>{pokemonName}</p>
        </div>
      </Link>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TypePage = () => (
  <div>
    <Link to={`/type`}>
      <h1>Types</h1>
    </Link>
  </div>
);
const emptyPokemonArray = Array(151).fill(1);

const Homepage = () => {
  return (
    <div className={`min-h-[100vh] dark:bg-black bg-[#ccdadd]`}>
      <div className="flex flex-col  justify-center items-center  gap-8">
        <Header />
        <PokeSearchBar />

        <div>
          {emptyPokemonArray.map((_id, index) => (
            <PokemonCard key={index} id={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
