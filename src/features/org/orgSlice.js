import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orgService from "./orgService";
import { showMessage, onClose } from "../snackbar/snackbarSlice";

// initial states

const initialState = {
  orgList:[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUpdated: false, 
  isDeleted: false,
  message:""
};

// get organizations

export const fetchOrgs = createAsyncThunk(
  "org/fetchOrgs",
  async (userData, thunkAPI) => {
    try {
      const response = await orgService.fetchOrgs(userData);
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

// create organization

export const createOrgs = createAsyncThunk(
  "auth/createOrgs",
  async (userData, thunkAPI) => {
    try {
      const response = await orgService.createOrgs(userData);
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

// update organization

export const updateOrg = createAsyncThunk(
  "auth/updateOrg",
  async (userData, thunkAPI) => {
    try {
      const response = await orgService.updateOrg(userData);
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

export const deleteOrg = createAsyncThunk(
  "auth/deleteOrg",
  async (userData, thunkAPI) => {
    try {
      const response = await orgService.deleteOrg(userData);
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

export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orgList = action.payload;
      })
      .addCase(fetchOrgs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createOrgs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrgs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createOrgs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrg.pending, (state) => {
        state.isLoading = true;
      }
      )
      .addCase(updateOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.message = action.payload;
      }
      )
      .addCase(updateOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
      )
      .addCase(deleteOrg.pending, (state) => {
        state.isLoading = true;
      }
      )
      .addCase(deleteOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.message = action.payload;
      }
      ) 
      .addCase(deleteOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orgSlice.actions;

export default orgSlice.reducer;
