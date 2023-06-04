import moviesData from "./movies_data.json";

function getMovieRecommendations(query) {
  return new Promise((resolve, reject) => {
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
    function getMovieRecommendations(query, movies, topN = 11) {
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
        popularity: movies[index].popularity,
      }));

      recommendations.sort((b, a) => b.popularity - a.popularity);
      return recommendations;
    }

    const recommendations = getMovieRecommendations(query, movies);
    resolve(recommendations);
  });
}

export default async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    try {
      const data = await getMovieRecommendations(req.body);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
