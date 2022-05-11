import {call, put, takeEvery} from 'redux-saga/effects';
import {MoviesAPI} from '../../../services';
import {
  GET_MOVIES,
  GET_MOVIES_FAILURE,
  GET_MOVIES_GENRES,
  GET_MOVIES_GENRES_FAILURE,
  GET_MOVIES_GENRES_SUCCESS,
  GET_MOVIES_SUCCESS
} from './movies.actions';

function* fetchMovies() {
  const [hasError, response] = yield call(MoviesAPI.getMoviesAPI);
  if (hasError) {
    yield put({type: GET_MOVIES_FAILURE, payload: response});
  }
  yield put({type: GET_MOVIES_SUCCESS, payload: response});
}

function* fetchMoviesGenres() {
  const [hasError, response] = yield call(MoviesAPI.getMoviesGenresAPI);
  if (hasError) {
    yield put({type: GET_MOVIES_GENRES_FAILURE, payload: response});
  }
  yield put({type: GET_MOVIES_GENRES_SUCCESS, payload: response});
}

export default function* moviesSagas() {
  yield takeEvery(GET_MOVIES, fetchMovies);
  yield takeEvery(GET_MOVIES_GENRES, fetchMoviesGenres);
}
