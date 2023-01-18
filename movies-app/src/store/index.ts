import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';

import genresReducer from './genres/reducer';
import genresSaga from './genres/saga';
import messagesReducer from './messages/reducer';
import messagesSaga from './messages/saga';
import moviesReducer from './movies/reducer';
import moviesSaga from './movies/saga';
import studiosReducer from './studios/reducer';
import studiosSaga from './studios/saga';

const rootReducer = combineReducers({
  movies: moviesReducer,
  studios: studiosReducer,
  genres: genresReducer,
  messages: messagesReducer,
});

function* rootSaga() {
  yield all([moviesSaga(), studiosSaga(), genresSaga(), messagesSaga()]);
}

export const setupStore = <T>(preloadedState?: PreloadedState<T>) => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).prepend(saga),
  });

  saga.run(rootSaga);

  return store;
};
