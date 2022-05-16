import watchInit, { callInit } from 'redux/sagas/global-app/init';
import { takeLatest } from 'redux-saga/effects';
import { globalApp } from 'redux/reducers/global-app';
import { getGenres, getMovies, getStudios } from 'endpoints';
import { movies } from 'redux/reducers/movies';
import { run } from 'utils/helpers';
import { genres } from 'redux/reducers/genres';
import { studios } from 'redux/reducers/studios';
import { getGenresMock, getMoviesMock, getStudiosMock } from 'mocks';

jest.mock('endpoints');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Global app sagas', () => {
  it('should call init saga', () => {
    const iterator = watchInit();
    const actualYield = iterator.next().value;
    const expectedYield = takeLatest(globalApp.init.type, callInit);
    expect(actualYield).toStrictEqual(expectedYield);
  });

  it('should call getGenres, getMovies and getStudios and store responses in store', async () => {
    getMovies.mockResolvedValue(getMoviesMock);
    getGenres.mockResolvedValue(getGenresMock);
    getStudios.mockResolvedValue(getStudiosMock);

    const dispatchedActions = [];

    await run({
      getState: () => null,
      payload: {},
      saga: callInit,
      dispatchedActions,
    }).toPromise();

    expect(getGenres).toHaveBeenCalledTimes(1);
    expect(getMovies).toHaveBeenCalledTimes(1);
    expect(getStudios).toHaveBeenCalledTimes(1);
    expect(dispatchedActions[0]).toStrictEqual(globalApp.showLoader());
    expect(dispatchedActions[1]).toStrictEqual(movies.getSuccess(getMoviesMock.data));
    expect(dispatchedActions[2]).toStrictEqual(genres.getSuccess(getGenresMock.data));
    expect(dispatchedActions[3]).toStrictEqual(studios.getSuccess(getStudiosMock.data));
    expect(dispatchedActions[4]).toStrictEqual(globalApp.hideLoader());
    expect(dispatchedActions).toHaveLength(5);
  });
});
