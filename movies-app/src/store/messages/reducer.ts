import { createSlice } from '@reduxjs/toolkit';

import { IMessage } from './interfaces';

const initialState: IMessage = { message: null, severity: null };
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
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
