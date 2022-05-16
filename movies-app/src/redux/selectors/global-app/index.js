import { createSelector } from '@reduxjs/toolkit';

export const selectGlobalApp = ({ globalApp }) => globalApp;
export const selectIsLoading = createSelector(selectGlobalApp, (state) => state.isLoading);
export const selectSelectedGenre = createSelector(selectGlobalApp, (state) => state.selectedGenre);
export const selectTitleText = createSelector(selectGlobalApp, (state) => state.titleText);
export const selectMinPrice = createSelector(selectGlobalApp, (state) => state.minPrice);
export const selectMaxPrice = createSelector(selectGlobalApp, (state) => state.maxPrice);
export const selectSelectedMovie = createSelector(selectGlobalApp, (state) => state.selectedMovie);
export const selectSelectedStudio = createSelector(
  selectGlobalApp,
  (state) => state.selectedStudio,
);
