import { takeEvery, put, call } from 'redux-saga/effects';
import api from '../api';
import { fetchStudiosSuccess } from './reducer';

function* fetchStudios() {
  const { data } = yield call(() => api.get('studios'));
  yield put(fetchStudiosSuccess(data));
}

function* studiosSaga() {
  yield takeEvery('studios/fetchStudiosRequest', fetchStudios);
}

export default studiosSaga;
