"use client";
import Link from "next/link";
import Movie from "./Movie.jsx";
import { useState, useEffect } from "react";

export default function Results(props) {
  const [movies, setMovies] = useState(null);
  const [personalityData, setPersonalityData] = useState(null);

  useEffect(() => {
    async function getPersonalityType(movieTitles) {
      let personalityData = await fetch("/api/personality", {
        method: "POST",
        body: JSON.stringify({
          keywords: Object.keys(props.searchParams)[0],
        }),
      });
      personalityData = await personalityData.json();
      personalityData = await JSON.parse(personalityData.data);
      setPersonalityData(personalityData);
    }

    async function getMovieRecommendations(query) {
      console.log('query', query);
      try {
        const response = await fetch("/api/recommendationAPI", {
          method: "POST",
          body: query,
          headers: {
            "Cache-Control": "no-store",
          },
        });
        const responseData = await response.json();
        console.log('responseData', responseData);
        let filteredMovies = [];
        let i = 0;
        const englishRegexp = /^[a-zA-Z0-9\s]+$/;
        while (filteredMovies.length != 10) {
          if (
            true
            // responseData[i]?.title &&
            // englishRegexp.test(responseData[i]?.title) &&
            // responseData[i]?.overview.trim()
          ) {
            filteredMovies.push(responseData[i]);
          }
          i++;
        }
        console.log('filteredMovies', filteredMovies)
        setMovies(filteredMovies);
        let movieTitles = '';
        for (let i = 0; i < filteredMovies.length; i++) {
          movieTitles += filteredMovies[i].title + " ";
        }
        getPersonalityType();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const keywords = Object.keys(props.searchParams)[0];
    getMovieRecommendations(keywords);
    return () => {};
  }, [ props.searchParams ]);

  if (!personalityData || !movies) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-2xl m-4 text-white font-bold text-center">
          Unveiling Movie Matches: Determining Movie Recommendations based on your Personality...
        </div>
        <div className="animate-spin w-12 h-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900">
      <div className="text-white text-xl p-5 w-full mx-auto md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          {personalityData ? personalityData?.title : "Loading personality title"}
        </h2>
        <p>
          {personalityData ? personalityData?.summary : "Loading personality description"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
        {movies.map((movie) => (
          <Movie movieID={movie.movieId} key={movie.movieId} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/quiz">
          <button className="px-4 m-2 mb-8 py-2 rounded bg-blue-500 text-white font-bold">
            Take the Quiz Again!
          </button>
        </Link>
      </div>
    </main>
  );
}
