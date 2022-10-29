import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import processService from "./processService";
import { showMessage, onClose } from "../snackbar/snackbarSlice";

// initial states

const initialState = {
  processList: [],
  process: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDeleting: false,
  isDeleted: false,
  isUpdating: false,
  isUpdated: false,
  message: "",
};

// get

export const fetchProcess = createAsyncThunk(
  "process/fetchProcess",
  async (userData, thunkAPI) => {
    try {
      const response = await processService.fetchProcess(userData);
      console.log(userData, response);
      return response;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchSingleProcess = createAsyncThunk(
  "process/fetchSingleProcess",
  async (userData, thunkAPI) => {
    try {
      const response = await processService.fetchSingleProcess(userData);
      return response;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// create

export const createProcess = createAsyncThunk(
  "process/createProcess",
  async (userData, thunkAPI) => {
    try {
      const response = await processService.createProcess(userData);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProcess = createAsyncThunk(
  "process/updateProcess",
  async (userData, thunkAPI) => {
    try {
      const response = await processService.updateProcess(userData);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProcess = createAsyncThunk(
  "process/deleteProcess",
  async (userData, thunkAPI) => {
    try {
      const response = await processService.deleteProcess(userData);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isDeleting = false;
      state.isDeleted = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processList = action.payload;
      })
      .addCase(fetchProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProcess.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateProcess.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.isUpdating = false;
        state.message = action.payload;
      })
      .addCase(updateProcess.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProcess.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteProcess.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.message = action.payload;
      })
      .addCase(deleteProcess.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSingleProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProcess.fulfilled, (state, action) => {
        state.process = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = processSlice.actions;

export default processSlice.reducer;
