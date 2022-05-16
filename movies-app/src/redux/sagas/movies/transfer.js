import {
  takeLatest, call, select, put,
} from 'redux-saga/effects';
import { transfer } from 'endpoints';
import { movies } from 'redux/reducers/movies';
import { selectSelectedStudio } from 'redux/selectors/global-app';
import { toast } from 'react-toastify';
import { globalApp } from 'redux/reducers/global-app';
import { ERROR_MESSAGE, TRANSFER_SUCCESS } from 'utils/constants';
import { studios } from 'redux/reducers/studios';
import { selectStudiosData } from 'redux/selectors/studios';
import { selectMoviesData } from 'redux/selectors/movies';
import { getUpdatedMovies, getUpdatedStudios } from 'utils/helpers';

export function* callTransfer({ payload: { id, studioId, price } }) {
  try {
    yield put(globalApp.showLoader());
    const buyerId = yield select(selectSelectedStudio);
    yield call(transfer, id, studioId, buyerId);
    const studiosData = yield select(selectStudiosData);
    const moviesData = yield select(selectMoviesData);
    yield put(studios.getSuccess(getUpdatedStudios(studiosData, studioId, buyerId, price)));
    yield put(movies.getSuccess(getUpdatedMovies(moviesData, id, buyerId)));
    yield call(toast.success, TRANSFER_SUCCESS);
    yield put(globalApp.clearSelectedMovie());
    yield put(globalApp.clearSelectedStudio());
  } catch {
    yield call(toast.error, ERROR_MESSAGE);
  } finally {
    yield put(globalApp.hideLoader());
  }
}

export default function* watchTransfer() {
  yield takeLatest(movies.transfer.type, callTransfer);
}
