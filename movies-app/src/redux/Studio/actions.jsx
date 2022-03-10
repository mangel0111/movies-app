import * as studiosService from "../../services/Studios/service";

import * as types from "./actionTypes";

export const getStudios = () => async (dispatch) => {
  dispatch({ type: types.GET_STUDIOS });
  studiosService
    .getStudios()
    .then((response) => {
      dispatch({ type: types.GET_STUDIOS_SUCCESS, payload: response });
      return response;
    })
    .catch(() => {
      dispatch({ type: types.GET_STUDIOS_FAILURE });
      return false;
    });
};
