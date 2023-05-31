"use client";
import Link from "next/link";
import Movie from "./Movie.jsx";
import { useState, useEffect } from "react";

export default function Results(props) {
  const [movies, setMovies] = useState(null);
  console.log(props);
  const { searchQuery, personalityTitle, personalityDescription } =
    props.searchParams;

  useEffect(() => {
    console.log(searchQuery);
    console.log(personalityTitle);
    console.log(personalityDescription);
    getMovieRecommendations(searchQuery);
    return () => {};
  }, []);

  async function getMovieRecommendations(query) {
    try {
      const response = await fetch("/api/recommendationAPI", {
        method: "POST",
        body: searchQuery,
      });
      const responseData = await response.json();

      let filteredMovies = [];
      let i = 0;
      const englishRegexp = /^[a-zA-Z0-9\s]+$/;
      while (filteredMovies.length != 5) {
        if (
          responseData[i].title &&
          englishRegexp.test(responseData[i].title) &&
          responseData[i].overview.trim()
        ) {
          filteredMovies.push(responseData[i]);
        }
        i++;
      }

      setMovies(filteredMovies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (!movies) {
    return;
  }
  // movieRecommendations.forEach((movie) => {
  //   console.log(movie.movieId);
  // });
  return (
    <main className="bg-gray-900">
      <div className="text-white text-xl p-5 w-3/4">
        <h2 className="text-4xl font-bold mb-4">
          {personalityTitle ? personalityTitle : "No Personality"}
        </h2>
        <p>
          {personalityDescription
            ? personalityDescription
            : "No personality description was provided."}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <Movie movieID={movie.movieId} key={movie.movieId} />
        ))}
      </div>
      <Link href="/" className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
    </main>
  );
}
