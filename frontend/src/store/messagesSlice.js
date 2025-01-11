import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getServerMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  }
});

export const selectMessages = (state) => state.messages.messages;
export const { getServerMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
