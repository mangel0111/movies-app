import createSagaMiddleware from "@redux-saga/core"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/reducer";
import studiosReducer from "./studios/reducer";
import moviesSaga from "./movies/saga";
import studiosSaga from "./studios/saga";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  movies: moviesReducer,
  studios: studiosReducer
});

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).prepend(saga))
});

function* rootSaga() {
  yield all([moviesSaga(), studiosSaga()]);
}

saga.run(rootSaga);

export default store;
