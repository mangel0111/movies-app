import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  studios: null,
  studiosLoading: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_STUDIOS:
      return state.merge({
        studiosLoading: true,
      });
    case types.GET_STUDIOS_SUCCESS:
      return state.merge({
        studios: action.payload,
        studiosLoading: false,
      });
    case types.GET_STUDIOS_FAILURE:
      return state.merge({
        studiosLoading: false,
      });
    default:
      return state;
  }
}
