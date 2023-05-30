import React, { useEffect, useState } from "react";
import moviesData from "./movies_data.json";

const Recommendation = ({ searchQuery }) => {
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    // Preprocess the movie data
    const movies = moviesData.map((movie) => ({
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
    
      // Calculate popularity scores
      const popularityScores = topIndices.map((index) => movies[index].popularity);
    
      // Normalize popularity scores
      const maxPopularity = Math.max(...popularityScores);
      const normalizedPopularityScores = popularityScores.map((score) => score / maxPopularity);
    
      // Combine similarity and popularity scores
      const combinedScores = topIndices.map((index, i) => ({
        index,
        score: similarities[index] * normalizedPopularityScores[i],
      }));
    
      // Sort by combined scores
      const sortedRecommendations = combinedScores.sort((a, b) => b.score - a.score);
    
      // Get final recommendations with genre and keywords
      const recommendations = sortedRecommendations.map(({ index }) => ({
        title: movies[index].title,
        genres: movies[index].genres,
        keywords: movies[index].tags,
        overview: movies[index].storyline,
      }));
    
      return recommendations;
    }
   
    const movieRecommendations = getMovieRecommendations(searchQuery, movies);
    setRecommendations(movieRecommendations);
  }, [searchQuery]);
  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>Movie Recommendations</h2>
      <ol>
        {recommendations.map((recommendation, index) => (
          <li key={index}>
            <strong>{index + 1}. </strong>
            <span>{recommendation.title}</span>
            <br />
            <span>Genre: {recommendation.genres}</span>
            <br />
            <span>Overview: {recommendation.overview}</span>
            <br />
            {/* <span>Keywords: {recommendation.keywords}</span> */}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Recommendation;
