import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isOtpModal: false,
  modalType: null,
  otp: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.isOtpModal = action.payload === "otp" && false ;
      state.modalType = "";
      state.otp =  action.payload === "otp" && ""
    },
    otpModal: (state, action) => {
      state.isOpen = false;
      state.isOtpModal = true;
    },
    fillOtp: (state,action)=>{
      state.otp = action.payload
    }
  },
});

export const { openModal, closeModal, otpModal, fillOtp } = modalSlice.actions;

export default modalSlice.reducer;