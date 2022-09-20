import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isOtpModal: false,
  resetEmail:'',
  modalType: null,
  otp: '',
  newPassword:"",
  confirmPassword: "",
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
    closeOtpModal: (state, action) => {
      state.isOtpModal = false;
      state.newPassword = "";
      state.confirmPassword = "";
    },
    fillEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    fillOtp: (state,action)=>{
      state.otp = action.payload
    },
    setNewPassword: (state,action)=>{
      state.newPassword = action.payload
    },
    confirmNewPassword: (state,action)=>{
      state.confirmPassword = action.payload
    }
  },
});

export const { openModal, closeModal, otpModal, fillOtp,fillEmail,confirmNewPassword,setNewPassword } = modalSlice.actions;

export default modalSlice.reducer;