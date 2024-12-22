import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: { username: localStorage.getItem('user'), token: localStorage.getItem('token') },
  reducers: {
    authUser: (state, action) => {
      const { username, token } = action.payload;
      localStorage.setItem('user', JSON.stringify({ token: response.data.token, username: response.data.username }));
      state.username = username;
      state.token = token;
    },
  },
});

export const { authUser } = AuthSlice.actions;

export default AuthSlice.reducer;