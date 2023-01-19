import { createSlice } from '@reduxjs/toolkit';

import { IStudio } from '../studios/interfaces';
import { IMovie } from './interfaces';

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
    },
    fetchMoviesError: (state) => {
      state.loading = false;
    },
  },
});

export type Filter = { name?: string; minPrice?: number; maxPrice?: number; genreId?: number };
export type MovieExt = IMovie & { studio: string };
export const filterMovies = (movies: IMovie[], studios: IStudio[], filter: Filter = {}) => {
  const { name, minPrice, maxPrice, genreId } = filter;
  const moviesList: MovieExt[] = movies
    .filter(
      (movie) =>
        (!name || movie.name.toLowerCase().includes(name.toLowerCase())) &&
        (minPrice === undefined || movie.price > minPrice) &&
        (maxPrice === undefined || movie.price < maxPrice) &&
        (!genreId || movie.genre === genreId),
    )
    .map((movie) => ({
      ...movie,
      studio: studios.find((studio) => movie.studioId === studio.id)?.name as string,
    }));

  return moviesList;
};

export const { fetchMoviesRequest, fetchMoviesError, fetchMoviesSuccess } = moviesSlice.actions;

export default moviesSlice.reducer;
