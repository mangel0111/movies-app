import { createSlice, createAction } from '@reduxjs/toolkit';

const getSuccess = createAction('genres/getSuccess');
const getError = createAction('genres/getError');

export const genres = {
  getSuccess,
  getError,
};

const slice = createSlice({
  name: 'genres',
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
