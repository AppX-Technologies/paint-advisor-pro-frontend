import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    snackbar: snackbarReducer,
  },
});
