import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addServerChannels(state, action) {
      state.channels = action.payload;
    },
    // addChannels: (state) => {

    // },
    // removeChannels: (state, action) => {  // удаление каналов
    //   state.value -= action.payload;
    // },
  }
});

export const selectChannels = (state) => state.channels.channels;
export const { addServerChannels } = channelsSlice.actions;
export default channelsSlice.reducer;