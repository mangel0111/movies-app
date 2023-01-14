import { createSlice } from "@reduxjs/toolkit";

// error not handled for now (as in source app), will be added later as an improvement

export const studiosSlice = createSlice({
  name: 'studios',
  initialState: {
    studios: [],
    loading: false,
  },
  reducers: {
    fetchStudiosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudiosSuccess: (state, action) => {
      state.studios = action.payload;
      state.loading = false;
    },
    fetchStudiosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchStudiosRequest, fetchStudiosError, fetchStudiosSuccess } = studiosSlice.actions;

export default studiosSlice.reducer;
