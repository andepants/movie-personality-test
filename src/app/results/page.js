"use client";
import Link from "next/link";
import Movie from "./Movie.jsx";
import moviesData from "./movies_data.json";

export default function Results(props) {
  // console.log("props: ", Object.keys(props.searchParams)[0])

  const searchQuery = Object.keys(props.searchParams)[0];

  function getMovieRecommendations(query) {
    const movies = moviesData.map((movie) => ({
      // Preprocess the movie data
      ...movie,
      genres: movie.genres,
      tags: movie.tags.toLowerCase(),
      storyline: movie.storyline,
    }));

    // Calculate cosine similarity
    function calculateCosineSimilarity(query, movies) {
      const queryVector = query.toLowerCase().split(" ");
      const similarities = movies.map((movie) => {
        const movieVector = movie.tags.split(" ");
        const intersection = queryVector.filter((tag) =>
          movieVector.includes(tag)
        );
        const cosineSimilarity =
          intersection.length /
          Math.sqrt(queryVector.length * movieVector.length);
        return cosineSimilarity;
      });
      return similarities;
    }

    // Get movie recommendations based on a search query
    function getMovieRecommendations(query, movies, topN = 5) {
      // Calculate cosine similarity
      const similarities = calculateCosineSimilarity(query, movies);

      // Sort by similarity
      const sortedIndices = similarities
        .map((similarity, index) => ({ index, similarity }))
        .sort((a, b) => b.similarity - a.similarity);

      // Get top indices based on similarity
      const topIndices = sortedIndices.slice(0, topN).map((item) => item.index);

      // Get final recommendations with genre and keywords
      const recommendations = topIndices.map((index) => ({
        movieId: movies[index].movie_id,
        title: movies[index].title,
        genres: movies[index].genres,
        keywords: movies[index].tags,
        overview: movies[index].storyline,
      }));

      return recommendations;
    }

    return getMovieRecommendations(query, movies);
  }
  const movieRecommendations = getMovieRecommendations(searchQuery);
  // console.log(movieRecommendations);
  // movieRecommendations.forEach((movie) => {
  //   console.log(movie.movieId);
  // });
  return (
    <main>
      {movieRecommendations.map((movie) => (
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
