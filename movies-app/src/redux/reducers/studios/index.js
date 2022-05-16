import { createSlice, createAction } from '@reduxjs/toolkit';

const getSuccess = createAction('studios/getSuccess');
const getError = createAction('studios/getError');

export const studios = {
  getSuccess,
  getError,
};

const slice = createSlice({
  name: 'studios',
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
