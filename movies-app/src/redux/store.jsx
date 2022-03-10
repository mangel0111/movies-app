import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import movies from "./Movie/reducer";
import studios from "./Studio/reducer";

const reducers = {
  movies,
  studios,
};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
