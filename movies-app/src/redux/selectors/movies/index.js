import { createSelector } from '@reduxjs/toolkit';

export const selectMovies = ({ movies }) => movies;
export const selectMoviesData = createSelector(selectMovies, (state) => state.data);
export const selectFilteredMoviesData = createSelector(selectMovies, (state) => state.filtered);
