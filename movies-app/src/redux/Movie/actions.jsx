import * as moviesService from "../../services/Movies/service";

import * as types from "./actionTypes";

export const getMovies = () => async (dispatch) => {
  dispatch({ type: types.GET_MOVIES });
  moviesService
    .getMovies()
    .then((response) => {
      dispatch({ type: types.GET_MOVIES_SUCCESS, payload: response });
      return response;
    })
    .catch(() => {
      dispatch({ type: types.GET_MOVIES_FAILURE });
      return false;
    });
};
