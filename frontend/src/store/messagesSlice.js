import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  }
});

const fetchMessages = (token) => {
  return (dispatch) => {
    dispatch(setLoading());
    axios
      .get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setMessages(response.data)); // Успешно получили сообщения
      })
      .catch((error) => {
        dispatch(setError(error.message)); // Обработка ошибок
      });
  };
};

export { fetchMessages };
export const selectMessages = (state) => state.messages.messages;
export const { addServerMessages } = messagesSlice.actions;
export default messagesSlice.reducer;