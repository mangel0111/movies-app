import { buildQueryParams } from './utils';

const domain = 'http://localhost:3001'; //should use an env variable

export const fetcher = async (path, method = "GET", body) => {
    try {
      const res = await fetch(`${domain}${path}`, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

const getMovies = async (filters = {}) => {
    const queryParams = buildQueryParams(filters);
    const moviesData = await fetcher(`/movies?${queryParams}`);
    return moviesData;
};

const getStudios = async () => {
    const studiosData = await fetcher(`/studios`);
    return studiosData;
};

const getGenres = async () => {
    const genresData = await fetcher(`/genres`);
    return genresData;
};

const transferMovie = async (body) => {
    const response = await fetcher(`/transfer`, 'POST', body);
    return response;
};

export default {
    getMovies,
    getStudios,
    getGenres,
    transferMovie
}