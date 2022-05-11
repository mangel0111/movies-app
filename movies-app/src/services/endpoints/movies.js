import {GET} from '../../httpClient'
const BASE_URL = 'http://localhost:3000';

const endpoints = {
  v1: {
    movies: `${BASE_URL}/movies`,
    moviesGenres: `${BASE_URL}/movies/genres`
  }
};

const MoviesAPI = {
  getMoviesAPI: () => GET(endpoints.v1.movies),
  getMoviesGenresAPI: () => GET(endpoints.v1.moviesGenres)
};

export default MoviesAPI;
