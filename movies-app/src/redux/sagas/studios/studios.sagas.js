import {call, put, takeEvery} from 'redux-saga/effects';
import {StudiosAPI} from '../../../services';
import {
  GET_STUDIOS,
  GET_STUDIOS_FAILURE,
  GET_STUDIOS_SUCCESS,
  SELL_STUDIO_MOVIE,
  SELL_STUDIO_MOVIE_FAILURE,
  SELL_STUDIO_MOVIE_SUCCESS
} from './studios.actions';

function* fetchStudios() {
  const [hasError, response] = yield call(StudiosAPI.getStudiosAPI);
  if (hasError) {
    yield put({type: GET_STUDIOS_FAILURE, payload: response});
  }
  yield put({type: GET_STUDIOS_SUCCESS, payload: response});
}

function* sellStudioMovie(action) {
  const {movieId, studioId, buyerStudioId} = action.payload;
  const [hasError, response] = yield call(
    StudiosAPI.postTransferMovieAPI,
    movieId,
    studioId,
    buyerStudioId
  );
  if (hasError) {
    yield put({type: SELL_STUDIO_MOVIE_FAILURE, payload: response});
  }
  yield put({type: SELL_STUDIO_MOVIE_SUCCESS, payload: response});
}

export default function* studiosSagas() {
  yield takeEvery(GET_STUDIOS, fetchStudios);
  yield takeEvery(SELL_STUDIO_MOVIE, sellStudioMovie);
}
