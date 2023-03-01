const BASE_URL = 'http://localhost:4000';

export const getMovies = () => fetch(`${BASE_URL}/movies`).then(response => response.json())

export const getStudios = () => fetch(`${BASE_URL}/studios`).then(response => response.json())