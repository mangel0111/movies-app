import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchMoviesSuccess } from './reducer';

const url = `${process.env.REACT_APP_BACKEND_URL}/movies`;

function* fetchMovies() {
  const response = yield call(() => fetch(url));
  const movies = yield response.json();
  yield put(fetchMoviesSuccess(movies));
}

function* moviesSaga() {
  yield takeEvery('movies/fetchMoviesRequest', fetchMovies);
}

export default moviesSaga;
