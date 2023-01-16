import createSagaMiddleware from "@redux-saga/core"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/reducer";
import studiosReducer from "./studios/reducer";
import genresReducer from "./genres/reducer";
import moviesSaga from "./movies/saga";
import studiosSaga from "./studios/saga";
import genresSaga from "./genres/saga";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  movies: moviesReducer,
  studios: studiosReducer,
  genres: genresReducer,
});

function* rootSaga() {
  yield all([moviesSaga(), studiosSaga(), genresSaga()]);
}

export const setupStore = (preloadedState) => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).prepend(saga))
  });

  saga.run(rootSaga);

  return store;
};
