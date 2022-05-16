import { createSelector } from '@reduxjs/toolkit';

export const selectGenres = ({ genres }) => genres;
export const selectGenresData = createSelector(selectGenres, (state) => state.data);
