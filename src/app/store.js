import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import orgReducer from "../features/org/orgSlice";
import userReducer from "../features/users/userSlice";
import usersFromCompanyReducer from "../features/usersFromCompany/usersFromCompanySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    snackbar: snackbarReducer,
    org: orgReducer,
    user: userReducer,
    usersFromCompany: usersFromCompanyReducer,
  },
});
