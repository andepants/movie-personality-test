import Link from "next/link";
import Movie from "./Movie.jsx";

const testData = {
  movies: [
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
    "The Dark Knight",
    "Fight Club",
  ],
};

export default function Results() {
  return (
    <main>
      {testData.movies.map((movie) => (
        <Movie movieTitle={movie} />
      ))}

      <Link href="/" className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
    </main>
  );
}
