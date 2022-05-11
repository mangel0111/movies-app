import {all} from 'redux-saga/effects';

import moviesSagas from './sagas/movies/movies.sagas';
import studiosSagas from './sagas/studios/studios.sagas';

export default function* rootSaga() {
  yield all([studiosSagas(), moviesSagas()]);
}
