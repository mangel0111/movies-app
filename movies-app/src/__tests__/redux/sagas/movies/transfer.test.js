import watchTransfer, { callTransfer } from 'redux/sagas/movies/transfer';
import { takeLatest } from 'redux-saga/effects';
import { globalApp } from 'redux/reducers/global-app';
import { transfer } from 'endpoints';
import { getUpdatedMovies, getUpdatedStudios, run } from 'utils/helpers';
import { movies } from 'redux/reducers/movies';
import { getMoviesMock, getStudiosMock } from 'mocks';
import { studios } from 'redux/reducers/studios';
import { toast } from 'react-toastify';
import { TRANSFER_SUCCESS } from 'utils/constants';

jest.mock('endpoints');
jest.mock('react-toastify');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Movies sagas', () => {
  it('should call transfer saga', () => {
    const iterator = watchTransfer();
    const actualYield = iterator.next().value;
    const expectedYield = takeLatest(movies.transfer.type, callTransfer);
    expect(actualYield).toStrictEqual(expectedYield);
  });

  it('should call transfer endpoint, update store and clean selected values', async () => {
    transfer.mockResolvedValue({
      status: 204,
    });

    const payload = {
      id: '1', studioId: '1', price: 500,
    };
    const state = {
      globalApp: {
        selectedStudio: 2,
      },
      studios: {
        data: getStudiosMock.data,
      },
      movies: {
        data: getMoviesMock.data,
      },
    };
    const dispatchedActions = [];

    await run({
      getState: () => state,
      payload,
      saga: callTransfer,
      dispatchedActions,
    }).toPromise();

    expect(transfer).toHaveBeenCalledTimes(1);
    expect(transfer).toHaveBeenCalledWith(
      payload.id,
      payload.studioId,
      state.globalApp.selectedStudio,
    );
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(TRANSFER_SUCCESS);
    expect(dispatchedActions[0]).toStrictEqual(globalApp.showLoader());
    expect(dispatchedActions[1]).toStrictEqual(
      studios.getSuccess(
        getUpdatedStudios(
          getStudiosMock.data,
          payload.studioId,
          state.globalApp.selectedStudio,
          payload.price,
        ),
      ),
    );
    expect(dispatchedActions[2]).toStrictEqual(
      movies.getSuccess(
        getUpdatedMovies(
          getMoviesMock.data,
          payload.studioId,
          state.globalApp.selectedStudio,
        ),
      ),
    );
    expect(dispatchedActions[3]).toStrictEqual(globalApp.clearSelectedMovie());
    expect(dispatchedActions[4]).toStrictEqual(globalApp.clearSelectedStudio());
    expect(dispatchedActions[5]).toStrictEqual(globalApp.hideLoader());
    expect(dispatchedActions).toHaveLength(6);
  });
});
