const domain = "http://localhost:8080";

export const movieServices = {
  fetchStudios: () => {
    return fetch(`${domain}/studios`).then((response) => response.json());
  },
  fetchMovies: () => {
    return fetch(`${domain}/movies`).then((response) => response.json());
  },
  fetchGenres: () => {
    return fetch(`${domain}/genres`).then((response) => response.json());
  },
  transferMovie: (from, to, movieId) => {
    return fetch(`${domain}/transfer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        movieId,
      }),
    }).then((response) => response.json());
  },
};
