import { BASE_URL } from "./resources.js";

const getMovies = () =>
  fetch(`${BASE_URL}/movies`).then((response) => response.json());

export const sellMovie = (movieId, studioId) =>
  fetch(`${BASE_URL}/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ movieId, studioId })
  }).then((response) => response.json());

export default getMovies;
