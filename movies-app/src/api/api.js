import { buildQueryParams } from './utils';
import axios from 'axios';

const domain = 'http://localhost:3001'; //should use an env variable

const get = (path) => {
    return axios.get(`${domain}${path}`)
      .then(function (response) {
        return response.data
    })
  };

const post = (path, body) => {
  return axios.post(`${domain}${path}`, body)
    .then(function (response) {
      return response.data
  })
};

const getMovies = async (filters = {}) => {
    const queryParams = buildQueryParams(filters);
    const moviesData = await get(`/movies?${queryParams}`);
    return moviesData;
};

const getStudios = async () => {
    const studiosData = await get(`/studios`);
    return studiosData;
};

const getGenres = async () => {
    const genresData = await get(`/genres`);
    return genresData;
};

const transferMovie = async (body) => {
    const response = await post(`/transfer`, body);
    return response;
};

export default {
    getMovies,
    getStudios,
    getGenres,
    transferMovie
}