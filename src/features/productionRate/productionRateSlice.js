import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productionRateService from './productionRateService';
import { showMessage } from '../snackbar/snackbarSlice';
import { addOrUpdateItemInArray } from '../../helpers/addRemoveUpdateListHelper';

// initial states

const initialState = {
  productionRateList: [],
  productionRate: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isUpdating: false,
  isUpdated: false,
  message: '',
  response: null,
  deletedId: ''
};

export const fetchProductionRate = createAsyncThunk(
  'productionRate/fetchProductionRate',
  async (userData, thunkAPI) => {
    try {
      const response = await productionRateService.fetchProductionRate(userData);
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

export const fetchSingleProductionRate = createAsyncThunk(
  'productionRate/fetchSingleProductionRate',
  async (userData, thunkAPI) => {
    try {
      const response = await productionRateService.fetchSingleProductionRate(userData);
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
// create

export const createProductionRate = createAsyncThunk(
  'productionRate/createProductionRate',
  async (userData, thunkAPI) => {
    try {
      const response = await productionRateService.createProductionRate(userData);
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

export const productionRateSlice = createSlice({
  name: 'productionRate',
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
      .addCase(fetchProductionRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductionRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productionRateList = action.payload;
      })
      .addCase(fetchProductionRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProductionRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductionRate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = addOrUpdateItemInArray(state.productionRateList, payload);
      })
      .addCase(createProductionRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(fetchSingleProductionRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProductionRate.fulfilled, (state, action) => {
        state.productionRate = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleProductionRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = productionRateSlice.actions;

export default productionRateSlice.reducer;
