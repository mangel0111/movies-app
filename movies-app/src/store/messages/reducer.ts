import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    message: null,
    severity: null,
  },
  reducers: {
    sendSuccess: (state, action) => {
      state.message = action.payload;
      state.severity = 'success';
    },
    sendError: (state, action) => {
      if (state.message) return; // display just once
      state.message = action.payload;
      state.severity = 'error';
    },
    clearMessage: (state) => {
      state.message = null;
      state.severity = null;
    },
  },
});

export const { sendSuccess, sendError, clearMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
