import { all, fork } from 'redux-saga/effects';
import watchInit from './init';

export default function* globalAppSagas() {
  yield all([
    fork(watchInit),
  ]);
}
