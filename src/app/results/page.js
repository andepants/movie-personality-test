import Link from "next/link";
import Movie from "./Movie.jsx";

const testData = {
  movies: [
    {
      title: "Batman Begins",
      tmdb_id: 272,
    },
    {
      title: "The Dark Knight",
      tmdb_id: 155,
    },
    {
      title: "Pulp Fiction",
      tmdb_id: 680,
    },
    {
      title: "The Shawshank Redemption",
      tmdb_id: 278,
    },
    {
      title: "Fight Club",
      tmdb_id: 550,
    },
  ],
};

export default function Results() {
  return (
    <main>
      {testData.movies.map((movie) => (
        <Movie movieID={movie.tmdb_id} />
      ))}

      <Link href="/" className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
    </main>
  );
}
