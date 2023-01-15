import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../api';
import { fetchMoviesSuccess } from './reducer';

function* fetchMovies() {
  const { data } = yield call(() => api.get('movies'));
  yield put(fetchMoviesSuccess(data));
}

function* moviesSaga() {
  yield takeEvery('movies/fetchMoviesRequest', fetchMovies);
}

export default moviesSaga;
