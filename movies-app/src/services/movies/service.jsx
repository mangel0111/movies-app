export const getMovies = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/movies`).then((response) => {
    return response.json();
  });
};

export const transferMovie = (movieId, movieStudioId, transferStudioId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/transfer`, {
    method: "POST",
    body: JSON.stringify({
      movieId: movieId,
      movieStudioId: movieStudioId,
      transferStudioId: transferStudioId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    return response.json();
  });
};
