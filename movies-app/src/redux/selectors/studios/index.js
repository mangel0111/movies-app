import { createSelector } from '@reduxjs/toolkit';

export const selectStudios = ({ studios }) => studios;
export const selectStudiosData = createSelector(selectStudios, (state) => state.data);
