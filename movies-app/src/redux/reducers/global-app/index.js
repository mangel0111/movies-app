import { createSlice, createAction } from '@reduxjs/toolkit';
import { ALL_GENRES } from 'utils/constants';

const init = createAction('globalApp/init');
const showLoader = createAction('globalApp/showLoader');
const hideLoader = createAction('globalApp/hideLoader');
const setSelectedGenre = createAction('globalApp/setSelectedGenre');
const setTitleText = createAction('globalApp/setTitleText');
const setMinPrice = createAction('globalApp/setMinPrice');
const setMaxPrice = createAction('globalApp/setMaxPrice');
const resetFilters = createAction('globalApp/resetFilters');
const setSelectedMovie = createAction('globalApp/setSelectedMovie');
const clearSelectedMovie = createAction('globalApp/clearSelectedMovie');
const setSelectedStudio = createAction('globalApp/setSelectedStudio');
const clearSelectedStudio = createAction('globalApp/clearSelectedStudio');

export const globalApp = {
  init,
  showLoader,
  hideLoader,
  setSelectedGenre,
  setTitleText,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  setSelectedMovie,
  clearSelectedMovie,
  setSelectedStudio,
  clearSelectedStudio,
};

const initialState = {
  isLoading: false,
  selectedGenre: ALL_GENRES,
  titleText: '',
  minPrice: 0,
  maxPrice: 0,
  selectedMovie: null,
  selectedStudio: '',
};

const slice = createSlice({
  name: 'globalApp',
  initialState,
  reducers: {
    showLoader: (state) => ({
      ...state,
      isLoading: true,
    }),
    hideLoader: (state) => ({
      ...state,
      isLoading: false,
    }),
    setSelectedGenre: (state, { payload }) => ({
      ...state,
      selectedGenre: payload,
    }),
    setTitleText: (state, { payload }) => ({
      ...state,
      titleText: payload,
    }),
    setMinPrice: (state, { payload }) => ({
      ...state,
      minPrice: payload,
    }),
    setMaxPrice: (state, { payload }) => ({
      ...state,
      maxPrice: payload,
    }),
    resetFilters: () => initialState,
    setSelectedMovie: (state, { payload }) => ({
      ...state,
      selectedMovie: payload,
    }),
    clearSelectedMovie: (state) => ({
      ...state,
      selectedMovie: null,
    }),
    setSelectedStudio: (state, { payload }) => ({
      ...state,
      selectedStudio: payload,
    }),
    clearSelectedStudio: (state) => ({
      ...state,
      selectedStudio: '',
    }),
  },
});

export default slice.reducer;
