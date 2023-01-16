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

export const filterMovies = (movies, studios, filter = {}) => {
  const { name, minPrice, maxPrice, genreId } = filter;
  const moviesList = movies
    .filter(movie =>
      (!name || movie.name.toLowerCase().includes(name.toLowerCase())) &&
      (minPrice === undefined || movie.price > minPrice) &&
      (maxPrice === undefined || movie.price < maxPrice) &&
      (!genreId || movie.genre === genreId))
    .map(movie => ({
      ...movie,
      studio: studios.find(studio => movie.studioId === studio.id)?.name,
    }));

    return moviesList;
};

export const { fetchMoviesRequest, fetchMoviesError, fetchMoviesSuccess } = moviesSlice.actions;

export default moviesSlice.reducer;
