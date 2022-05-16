import { all, fork } from 'redux-saga/effects';
import moviesSagas from './movies';
import globalAppSagas from './global-app';

export default function* rootSaga() {
  yield all([
    fork(moviesSagas),
    fork(globalAppSagas),
  ]);
}
