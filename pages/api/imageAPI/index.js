async function callMovieAPI(movieID) {
  const key = process.env.TMDBKEY;
  const url = `https://api.themoviedb.org/3/movie/${movieID}`;

  console.log(url);
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWM0M2EzNDA5YzkwMWY3NzMwNWIwNDExMjFkNTg4MCIsInN1YiI6IjY0NzUxMmU5MWJmMjY2MDQ0MmE3MTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaZL5TapHs4eiYHsbDyU6ekW2kZRa-i9lezMMB2Vpnc",
    },
  });
  const response = await apiResponse.json();
  return `https://image.tmdb.org/t/p/original${response.poster_path}`;
}

export default async function handler(req, res) {
  let method = req.method;
  if (method === "GET") {
    console.log("image request received");
    res.status(200);
  }

  if (method === "POST") {
    callMovieAPI(req.body)
      .then((posterUrl) => {
        res.status(200).json(posterUrl);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}
