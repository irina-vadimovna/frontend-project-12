import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channel: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      // eslint-disable no-param-reassign
      state.modalType = action.payload.type;
      state.channel = action.payload.channel;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.channel = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
