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
            <PokemonCard key={index} id={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
