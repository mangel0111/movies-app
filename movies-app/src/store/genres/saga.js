import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../api';
import { fetchGenresError, fetchGenresSuccess } from './reducer';

function* fetchGenres() {
  try {
    const { data } = yield call(() => api.get('genres'));
    yield put(fetchGenresSuccess(data));
  } catch (error) {
    yield put(fetchGenresError());
  }
}

function* genresSaga() {
  yield takeEvery('genres/fetchGenresRequest', fetchGenres);
}

export default genresSaga;
