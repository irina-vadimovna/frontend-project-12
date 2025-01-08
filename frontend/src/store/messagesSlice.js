import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addServerMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  }
});

export const selectMessages = (state) => state.messages.messages;
export const { addServerMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;