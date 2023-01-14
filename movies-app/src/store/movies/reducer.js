import { createSlice } from "@reduxjs/toolkit";

// error not handled for now (as in source app), will be added later as an improvement

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
  },
  reducers: {
    fetchMoviesRequest: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    },
    fetchMoviesError: (state, action) => {
      state.loading = false;
    }
  }
});

export const { fetchMoviesRequest, fetchMoviesError, fetchMoviesSuccess } = moviesSlice.actions;

export default moviesSlice.reducer;
