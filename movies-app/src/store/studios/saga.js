import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchStudiosSuccess } from './reducer';

const url = `${process.env.REACT_APP_BACKEND_URL}/studios`;

function* fetchStudios() {
  const response = yield call(() => fetch(url));
  const studios = yield response.json();
  yield put(fetchStudiosSuccess(studios));
}

function* studiosSaga() {
  yield takeEvery('studios/fetchStudiosRequest', fetchStudios);
}

export default studiosSaga;
