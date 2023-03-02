import { BASE_URL } from "./resources.js";

const getGenre = () =>
  fetch(`${BASE_URL}/genre`).then((response) => response.json());

export default getGenre;
