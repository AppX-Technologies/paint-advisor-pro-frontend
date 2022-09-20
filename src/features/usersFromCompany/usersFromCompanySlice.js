import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage, onClose } from "../snackbar/snackbarSlice";
import usersFromCompanyService from "./usersFromCompanyService";

// initial states

const initialState = {
  companyMadeByUsers:[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDeleting: false,
  isDeleted: false,
  isUpdating: false,
  isUpdated: false,
  message:""
};

export const fetchUserMadeByCompany = createAsyncThunk(
  "usersFromCompany/fetchUserMadeByCompany",
  async (userData, thunkAPI) => {
    try {
      const response = await usersFromCompanyService.fetchUserMadeByCompany(userData);
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

export const usersFromCompanySlice = createSlice({
  name: "usersFromCompany",
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
  }
});


export const { reset } = usersFromCompanySlice.actions;

export default usersFromCompanySlice.reducer;