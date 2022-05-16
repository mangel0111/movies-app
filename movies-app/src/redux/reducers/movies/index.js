import { createSlice, createAction } from '@reduxjs/toolkit';

const get = createAction('movies/get');
const getSuccess = createAction('movies/getSuccess');
const getError = createAction('movies/getError');
const transfer = createAction('movies/transfer');

export const movies = {
  get,
  getSuccess,
  getError,
  transfer,
};

const slice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
  },
  reducers: {
    getSuccess: (state, { payload }) => ({
      ...state,
      data: payload,
    }),
  },
});

export default slice.reducer;
