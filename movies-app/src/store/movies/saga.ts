import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';
import { fetchMoviesError, fetchMoviesSuccess } from './reducer';

function* fetchMovies() {
  try {
    const { data } = yield call(() => api.get('movies'));
    yield put(fetchMoviesSuccess(data));
  } catch (error) {
    yield put(fetchMoviesError());
  }
}

function* moviesSaga() {
  yield takeEvery('movies/fetchMoviesRequest', fetchMovies);
}

export default moviesSaga;
