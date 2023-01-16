import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../api';
import { fetchGenresSuccess } from './reducer';

function* fetchGenres() {
  const { data } = yield call(() => api.get('genres'));
  yield put(fetchGenresSuccess(data));
}

function* genresSaga() {
  yield takeEvery('genres/fetchGenresRequest', fetchGenres);
}

export default genresSaga;
