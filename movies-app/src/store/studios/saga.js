import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../api';
import { fetchStudiosError, fetchStudiosSuccess } from './reducer';

function* fetchStudios() {
  try {
    const { data } = yield call(() => api.get('studios'));
    yield put(fetchStudiosSuccess(data));
  } catch (error) {
    yield put(fetchStudiosError());
  }
}

function* studiosSaga() {
  yield takeEvery('studios/fetchStudiosRequest', fetchStudios);
}

export default studiosSaga;
