import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { showMessage, onClose } from "../snackbar/snackbarSlice";

// initial states

const initialState = {
  user: null,
  userType: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessOtp: false,
  isResetSuccess:false,
  message: "",
};

export const generateRegistrationOtp = createAsyncThunk(
  "auth/generateRegistrationOtp",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.generateRegistrationOtp(userData);
      console.log(response);
      return response;
    } catch (err) {
      const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
      thunkAPI.dispatch(showMessage({message: message, severity: 'error'}))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  for register

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({message: message, severity: 'error'}))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for login

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const sendForgotPasswordLink = createAsyncThunk(
  "auth/sendForgotPasswordLink",
  async (user, thunkAPI) => {
    try {
      const response = await authService.sendForgotPasswordLink(user);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({message: message, severity: 'error'}))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (user, thunkAPI) => {
    try {
      const response = await authService.resetPassword(user);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({message: message, severity: 'error'}))
      return thunkAPI.rejectWithValue(message);
        }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isSuccessOtp = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateRegistrationOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateRegistrationOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessOtp = true;
        state.message = action.payload.data;
      })
      .addCase(generateRegistrationOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(sendForgotPasswordLink.pending, (state) => {
        state.isLoading = true;
      }
      )
      .addCase(sendForgotPasswordLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessOtp  = true;
        state.message = action.payload;
      })
      .addCase(sendForgotPasswordLink.rejected, (state,action)=>{
        state.isLoading= false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      }
      )
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isResetSuccess = true;
        state.message = action.payload;
      }
      )
      .addCase(resetPassword.rejected, (state,action)=>{
        state.isLoading= false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
