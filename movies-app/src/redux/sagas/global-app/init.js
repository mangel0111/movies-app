import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { globalApp } from 'redux/reducers/global-app';
import { getGenres, getMovies, getStudios } from 'endpoints';
import { movies } from 'redux/reducers/movies';
import { genres } from 'redux/reducers/genres';
import { studios } from 'redux/reducers/studios';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE } from 'utils/constants';

export function* callInit() {
  try {
    yield put(globalApp.showLoader());
    const [moviesResponse, genresResponse, studiosResponse] = yield all([
      call(getMovies),
      call(getGenres),
      call(getStudios),
    ]);
    yield put(movies.getSuccess(moviesResponse.data));
    yield put(genres.getSuccess(genresResponse.data));
    yield put(studios.getSuccess(studiosResponse.data));
  } catch {
    yield call(toast.error, ERROR_MESSAGE);
  } finally {
    yield put(globalApp.hideLoader());
  }
}

export default function* watchInit() {
  yield takeLatest(globalApp.init.type, callInit);
}
