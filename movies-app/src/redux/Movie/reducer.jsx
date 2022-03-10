import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  movies: null,
  moviesLoading: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_MOVIES:
      return state.merge({
        moviesLoading: true,
      });
    case types.GET_MOVIES_SUCCESS:
      return state.merge({
        movies: action.payload,
        moviesLoading: false,
      });
    case types.GET_MOVIES_FAILURE:
      return state.merge({
        moviesLoading: false,
      });
    case types.TRANSFER_MOVIE:
      return state.merge({
        moviesLoading: true,
      });
    case types.TRANSFER_MOVIE_SUCCESS:
      return state.merge({
        movies: action.payload,
        moviesLoading: false,
      });
    case types.TRANSFER_MOVIE_FAILURE:
      return state.merge({
        moviesLoading: false,
      });
    default:
      return state;
  }
}
