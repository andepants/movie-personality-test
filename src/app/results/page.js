"use client";
import Link from "next/link";
import Movie from "./Movie.jsx";
import { useState, useEffect } from "react";

export default function Results(props) {
  const [movies, setMovies] = useState(null);
  const { searchQuery, personalityTitle, personalityDescription } =
    props.searchParams;
  const keywords = Object.keys(props.searchParams)[0];
  const [personalityData, setPersonalityData] = useState(null);

  useEffect(() => {
    getMovieRecommendations(keywords); // Call getMovieRecommendations directly
    return () => {};
  }, [keywords]);

  async function getPersonalityType(filteredMovies) {
    let personalityData = await fetch("/api/personality", {
      method: "POST",
      body: JSON.stringify({
        keywords: Object.keys(props.searchParams)[0],
        filteredMovies,
      }),
    });
    personalityData = await personalityData.json();
    personalityData = await JSON.parse(personalityData.data);
    setPersonalityData(personalityData);
  }

  async function getMovieRecommendations(query) {
    try {
      const response = await fetch("/api/recommendationAPI", {
        method: "POST",
        body: query,
      });
      const responseData = await response.json();
      let filteredMovies = [];
      let i = 0;
      const englishRegexp = /^[a-zA-Z0-9\s]+$/;
      while (filteredMovies.length != 5) {
        // console.log('responseData[i].title: ', responseData[i].title);
        // console.log('filteredMovies: ', filteredMovies)
        if (
          true
          // responseData[i].title &&
          // englishRegexp.test(responseData[i].title) &&
          // responseData[i].overview.trim()
        ) {
          filteredMovies.push(responseData[i]);
        }
        i++;
      }
      setMovies(filteredMovies);
      getPersonalityType(filteredMovies); // Call getPersonalityType with filteredMovies
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (!personalityData || !movies) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin w-12 h-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div className="text-4xl m-4 text-white font-bold">
          Finding Movies Based on your Personality...
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900">
      <div className="text-white m-5 text-xl p-5 w-3/4">
        <h2 className="text-4xl font-bold mb-4">
          {personalityData
            ? personalityData?.title
            : "Loading personality title"}
        </h2>
        <p>
          {personalityData
            ? personalityData?.summary
            : "Loading personality description"}
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
