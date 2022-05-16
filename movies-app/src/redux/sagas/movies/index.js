import { all, fork } from 'redux-saga/effects';
import watchTransfer from './transfer';

export default function* moviesSagas() {
  yield all([
    fork(watchTransfer),
  ]);
}
