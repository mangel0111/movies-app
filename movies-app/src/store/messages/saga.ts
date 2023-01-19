import { delay, put, takeEvery } from 'redux-saga/effects';

import { clearMessage } from './reducer';

function* clearAfter5Secs() {
  yield delay(5000);
  yield put(clearMessage());
}

function* messagesSaga() {
  yield takeEvery('messages/sendSuccess', clearAfter5Secs);
  yield takeEvery('messages/sendError', clearAfter5Secs);
}

export default messagesSaga;
