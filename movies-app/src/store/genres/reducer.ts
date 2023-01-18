import { createSlice } from '@reduxjs/toolkit';

export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    loading: true,
  },
  reducers: {
    fetchGenresRequest: (state) => {
      state.loading = true;
    },
    fetchGenresSuccess: (state, action) => {
      state.genres = action.payload;
      state.loading = false;
    },
    fetchGenresError: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchGenresRequest, fetchGenresError, fetchGenresSuccess } = genresSlice.actions;

export default genresSlice.reducer;
