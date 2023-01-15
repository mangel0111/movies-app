import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: true,
  },
  reducers: {
    fetchMoviesRequest: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchMoviesRequest, fetchMoviesError, fetchMoviesSuccess } = moviesSlice.actions;

export default moviesSlice.reducer;
