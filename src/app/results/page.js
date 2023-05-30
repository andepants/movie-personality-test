"use client";
import Link from "next/link";
import Movie from "./Movie.jsx";
import { useState } from "react";

export default function Results(props) {
  const [movies, setMovies] = useState(null);
  // console.log("props: ", Object.keys(props.searchParams)[0])

  const searchQuery = Object.keys(props.searchParams)[0];

  async function getMovieRecommendations(query) {
    try {
      const response = await fetch("/api/recommendationAPI", {
        method: "POST",
        body: searchQuery,
      });
      const responseData = await response.json();
      setMovies(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getMovieRecommendations(searchQuery);
  if (!movies) {
    return;
  }
  console.log("movie recommendations:" + movies);
  // movieRecommendations.forEach((movie) => {
  //   console.log(movie.movieId);
  // });
  return (
    <main>
      {movies.map((movie) => (
        <Movie movieID={movie.movieId} key={movie.movieId} />
      ))}
      <Link href="/" className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
    </main>
  );
}
