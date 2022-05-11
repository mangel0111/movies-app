import {
  GET_MOVIES,
  GET_MOVIES_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_GENRES,
  GET_MOVIES_GENRES_FAILURE,
  GET_MOVIES_GENRES_SUCCESS,
  FILTER_MOVIES,
  FILTER_MOVIES_CLEAR,
  RESET_FILTER_STATUS
} from './movies.actions';

const initialState = {
  error: false,
  errorGenres: false,
  fetched: false,
  fetchedGenres: false,
  fetching: false,
  fetchingGenres: false,
  resetFilter: false,
  genres: [],
  movies: [],
  filteredMovies: []
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        fetching: true
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        movies: action.payload || [],
        filteredMovies: action.payload || []
      };
    case FILTER_MOVIES_CLEAR:
      return {
        ...state,
        fetching: false,
        resetFilter: true,
        filteredMovies: state.movies
      };
    case FILTER_MOVIES:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        filteredMovies: action.payload || []
      };
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload || true
      };
    case GET_MOVIES_GENRES:
      return {
        ...state,
        fetchingGenres: true
      };
    case GET_MOVIES_GENRES_SUCCESS:
      return {
        ...state,
        fetchingGenres: false,
        fetchedGenres: true,
        errorGenres: false,
        genres: action.payload || {}
      };
    case GET_MOVIES_GENRES_FAILURE:
      return {
        ...state,
        fetchingGenres: false,
        fetchedGenres: true,
        errorGenres: action.payload || true
      };
    case RESET_FILTER_STATUS:
      return {
        ...state,
        resetFilter: false
      };
    default:
      return state;
  }
}
