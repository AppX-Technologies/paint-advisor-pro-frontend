import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../snackbar/snackbarSlice';
import userService from './userService';

// initial states

const initialState = {
  userList: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDeleting: false,
  isDeleted: false,
  isUpdating: false,
  isUpdated: false,
  message: ''
};

// get users

export const fetchUsers = createAsyncThunk('org/fetchUsers', async (userData, thunkAPI) => {
  try {
    const response = await userService.fetchUsers(userData);
    return response;
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    thunkAPI.dispatch(showMessage({ message, severity: 'error' }));
    return thunkAPI.rejectWithValue(message);
  }
});

// create users

export const createUsers = createAsyncThunk('auth/createUsers', async (userData, thunkAPI) => {
  try {
    const response = await userService.createUsers(userData);
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
});

export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
  try {
    const response = await userService.updateUser(userData);
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
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (userData, thunkAPI) => {
  try {
    const response = await userService.deleteUser(userData);
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
});
export const userSlice = createSlice({
  name: 'user',
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
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isUpdating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.isUpdating = false;
        state.message = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isDeleting = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
