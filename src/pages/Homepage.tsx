import { Link } from "react-router-dom";

const PokemonCard = ({ id }: { id: number }) => (
  <div>
    <Link to={`/pokemon/${id}`}>
      <h3>#{id}</h3>
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

const Homepage = () => (
  <div>
    <h1>Pokemon</h1>
    <div>
      {emptyPokemonArray.map((_id, index) => (
        // da alle eintraege des Arrays 1 sind, verwenden wir den index um hochzuzaehlen.
        // da der index bei 0 anfaengt, addieren wir jeweils 1
        <PokemonCard key={index} id={index + 1} />
      ))}
    </div>
  </div>
);

export default Homepage;
