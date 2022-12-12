import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../snackbar/snackbarSlice';
import { addOrUpdateItemInArray } from '../../helpers/addRemoveUpdateListHelper';
import equipmentService from './equipmentService';

const initialState = {
  equipmentList: [],
  equipment: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isDeleting: false,
  isDeleted: false,
  isUpdating: false,
  isUpdated: false,
  message: '',
  response: null,
  deletedId: ''
};

// get


export const fetchEquipment = createAsyncThunk(
  'equipment/fetchEquipment',
  async (userData, thunkAPI) => {
    try {
      const response = await equipmentService.fetchEquipment(userData);
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
export const fetchSingleEquipment = createAsyncThunk(
  'equipment/fetchSingleEquipment',
  async (userData, thunkAPI) => {
    try {
      const response = await equipmentService.fetchSingleEquipment(userData);
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

export const createEquipment = createAsyncThunk(
  'equipment/createEquipment',
  async (userData, thunkAPI) => {
    console.log(userData, 'userDatauserData');
    try {
      const response = await equipmentService.createEquipment(userData);
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

export const updateEquipment = createAsyncThunk(
  'equipment/updateEquipment',
  async (userData, thunkAPI) => {
    try {
      const response = await equipmentService.updateEquipment(userData);
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

export const deleteEquipment = createAsyncThunk(
  'equipment/deleteEquipment',
  async (userData, thunkAPI) => {
    try {
      const response = await equipmentService.deleteEquipment(userData);
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

export const equipmentSlice = createSlice({
  name: 'equipment',
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
      .addCase(fetchEquipment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.equipmentList = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createEquipment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEquipment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = addOrUpdateItemInArray(state.equipmentList, payload);
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEquipment.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.isUpdating = false;
        state.message = action.payload;
        state.response = addOrUpdateItemInArray(state.equipmentList, action.payload);
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEquipment.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.response = addOrUpdateItemInArray(state.equipmentList, action.payload);
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSingleEquipment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleEquipment.fulfilled, (state, action) => {
        state.equipment = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleEquipment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = equipmentSlice.actions;

export default equipmentSlice.reducer;
