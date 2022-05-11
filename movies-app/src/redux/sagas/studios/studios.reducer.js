import {
  GET_STUDIOS,
  GET_STUDIOS_FAILURE,
  GET_STUDIOS_SUCCESS,
  SELL_STUDIO_MOVIE,
  SELL_STUDIO_MOVIE_CLEAN,
  SELL_STUDIO_MOVIE_FAILURE,
  SELL_STUDIO_MOVIE_SUCCESS
} from './studios.actions';

const initialState = {
  error: false,
  fetched: false,
  fetching: false,
  errorTransaction: false,
  fetchedTransaction: false,
  fetchingTransaction: false,
  studios: []
};

export default function studios(state = initialState, action) {
  switch (action.type) {
    case GET_STUDIOS:
      return {
        ...state,
        fetching: true
      };
    case GET_STUDIOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        studios: action.payload || []
      };
    case GET_STUDIOS_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload || true
      };
    case SELL_STUDIO_MOVIE:
      return {
        ...state,
        fetchingTransaction: true
      };
    case SELL_STUDIO_MOVIE_SUCCESS:
      return {
        ...state,
        errorTransaction: false,
        fetchedTransaction: true,
        fetchingTransaction: false
      };
    case SELL_STUDIO_MOVIE_FAILURE:
      return {
        ...state,
        fetchedTransaction: true,
        fetchingTransaction: false,
        errorTransaction: action.payload || true
      };
    case SELL_STUDIO_MOVIE_CLEAN:
      return {
        ...state,
        fetchedTransaction: false,
        fetchingTransaction: false,
        errorTransaction: false
      };
    default:
      return state;
  }
}
