import { BASE_URL } from "./resources.js";

const getMovies = () =>
  fetch(`${BASE_URL}/movies`).then((response) => response.json());

export default getMovies;
