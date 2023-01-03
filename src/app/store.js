import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bidsReducer from '../features/bids/bidsSlice';
import modalReducer from '../features/modal/modalSlice';
import orgReducer from '../features/org/orgSlice';
import processReducer from '../features/process/processSlice';
import snackbarReducer from '../features/snackbar/snackbarSlice';
import userReducer from '../features/users/userSlice';
import materialReducer from '../features/materials/materialSlice';
import equipmentReducer from '../features/equipments/equipmentSlice';
import usersFromCompanyReducer from '../features/usersFromCompany/usersFromCompanySlice';
import productionRateReducer from '../features/productionRate/productionRateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    snackbar: snackbarReducer,
    org: orgReducer,
    user: userReducer,
    process: processReducer,
    usersFromCompany: usersFromCompanyReducer,
    bids: bidsReducer,
    material: materialReducer,
    productionRate: productionRateReducer,
    equipment: equipmentReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
