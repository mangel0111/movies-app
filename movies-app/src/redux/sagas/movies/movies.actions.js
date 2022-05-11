export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';

export const GET_MOVIES_GENRES = 'GET_MOVIES_GENRES';
export const GET_MOVIES_GENRES_FAILURE = 'GET_MOVIES_GENRES_FAILURE';
export const GET_MOVIES_GENRES_SUCCESS = 'GET_MOVIES_GENRES_SUCCESS';

export const FILTER_MOVIES = 'FILTER_MOVIES';
export const FILTER_MOVIES_CLEAR = 'FILTER_MOVIES_CLEAR';
export const RESET_FILTER_STATUS = 'RESET_FILTER_STATUS';

export const getMovies = () => ({
  type: GET_MOVIES
});

export const getMoviesGenres = () => ({
  type: GET_MOVIES_GENRES
});

export const filterMoviesAction = (filteredMovies) => ({
  type: FILTER_MOVIES,
  payload: filteredMovies
});

export const clearFilterMovies = () => ({
  type: FILTER_MOVIES_CLEAR
});

export const resetFilterStatus = () => ({
  type: RESET_FILTER_STATUS
});
