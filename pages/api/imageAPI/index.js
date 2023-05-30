async function callMovieAPI(movieID) {
  const key = process.env.TMDBKEY;
  const url = `https://api.themoviedb.org/3/movie/${movieID}`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWM0M2EzNDA5YzkwMWY3NzMwNWIwNDExMjFkNTg4MCIsInN1YiI6IjY0NzUxMmU5MWJmMjY2MDQ0MmE3MTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aaZL5TapHs4eiYHsbDyU6ekW2kZRa-i9lezMMB2Vpnc",
    },
  });
  const response = await apiResponse.json();
  return response;
}

export default async function handler(req, res) {
  let method = req.method;

  if (method === "POST") {
    callMovieAPI(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}
