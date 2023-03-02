import { buildQueryParams } from './utils';

const domain = 'http://localhost:3001'; //should use an env variable

const getMovies = async (filters = {}) => {
    const queryParams = buildQueryParams(filters);
    const moviesResponse = await fetch(`${domain}/movies?${queryParams}`);
    const moviesData = await moviesResponse.json();
    return moviesData;
};

const getStudios = async () => {
    const studiosResponse = await fetch(`${domain}/studios`);
    const studiosData = await studiosResponse.json();
    return studiosData;
};

const getGenres = async () => {
    const genresResponse = await fetch(`${domain}/genres`);
    const genresData = await genresResponse.json();
    return genresData;
};

export default {
    getMovies,
    getStudios,
    getGenres
}