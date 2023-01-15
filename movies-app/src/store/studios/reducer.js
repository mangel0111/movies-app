import { createSlice } from "@reduxjs/toolkit";

export const studiosSlice = createSlice({
  name: 'studios',
  initialState: {
    studios: [],
    loading: true,
  },
  reducers: {
    fetchStudiosRequest: (state) => {
      state.loading = true;
    },
    fetchStudiosSuccess: (state, action) => {
      state.studios = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchStudiosRequest, fetchStudiosError, fetchStudiosSuccess } = studiosSlice.actions;

export default studiosSlice.reducer;
