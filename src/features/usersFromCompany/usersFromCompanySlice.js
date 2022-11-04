import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../snackbar/snackbarSlice';
import usersFromCompanyService from './usersFromCompanyService';

// initial states

const initialState = {
  companyMadeByUsers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDeleting: false,
  isDeleted: false,
  isUpdating: false,
  isUpdated: false,
  message: ''
};

export const fetchUserMadeByCompany = createAsyncThunk(
  'usersFromCompany/fetchUserMadeByCompany',
  async (userData, thunkAPI) => {
    try {
      const response = await usersFromCompanyService.fetchUserMadeByCompany(userData);
      console.log(response);
      return response.filter((org) =>
        org.organization ? org.organization._id === userData.orgId : null
      );
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(showMessage({ message, severity: 'error' }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createUsersByCompany = createAsyncThunk(
  'usersFromCompany/createUsersByCompany',
  async (userData, thunkAPI) => {
    try {
      const response = await usersFromCompanyService.createUsersByCompany(userData);
      console.log(response);
      return response;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(showMessage({ message, severity: 'error' }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUserByCompany = createAsyncThunk(
  'usersFromCompany/deleteUserByCompany',
  async (userData, thunkAPI) => {
    try {
      const response = await usersFromCompanyService.deleteUserByCompany(userData);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({ message, severity: 'error' }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUserFromCompany = createAsyncThunk(
  'auth/updateUserFromCompany',
  async (userData, thunkAPI) => {
    try {
      const response = await usersFromCompanyService.updateUserFromCompany(userData);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({ message, severity: 'error' }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const usersFromCompanySlice = createSlice({
  name: 'usersFromCompany',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isDeleting = false;
      state.isDeleted = false;
      state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMadeByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserMadeByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyMadeByUsers = action.payload;
      })
      .addCase(fetchUserMadeByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUsersByCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUsersByCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createUsersByCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserByCompany.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteUserByCompany.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.message = action.payload;
      })
      .addCase(deleteUserByCompany.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserFromCompany.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUserFromCompany.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(updateUserFromCompany.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = usersFromCompanySlice.actions;

export default usersFromCompanySlice.reducer;
