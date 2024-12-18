// import { Link } from "react-router-dom";
import Header from "../components/Header";
import PokeSearchBar from "../components/PokeSearchBar";
// import { useThemeContext } from "../contexts/themeContext";
import PokemonCard from "../components/PokemonCard";

// const TypePage = () => (
//   <div>
//     <Link to={`/type`}>
//       <h1>Types</h1>
//     </Link>
//   </div>
// );

const emptyPokemonArray = Array(151).fill(1);

const Homepage = () => {
  return (
    <div className={`min-h-[100vh] dark:bg-black bg-[#ccdadd]`}>
      <div className="flex flex-col  justify-center items-center  gap-8">
        <Header />
        <PokeSearchBar />

        <div className="grid grid-cols-2 text-center md:mx-24 lg:mx-36 xl:mx-48 gap-4">
          {emptyPokemonArray.map((_id, index) => (
            <PokemonCard key={index} id={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
