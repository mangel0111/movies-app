import { BASE_URL } from "./resources.js";

const getStudios = () =>
  fetch(`${BASE_URL}/studios`).then((response) => response.json());

export default getStudios;
