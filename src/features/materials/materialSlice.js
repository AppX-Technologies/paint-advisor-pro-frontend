import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../snackbar/snackbarSlice';
import { addOrUpdateItemInArray } from '../../helpers/addRemoveUpdateListHelper';
import materialService from './materialService';


const initialState = {
  materialList: [
    {
      _id: '1111',
      global: true,
      materials: [
        {
          _id: '123',
          bidType: 'Interior',
          materialName: 'Blue paint',
          unit: 'KG',
          pricePerUnit: '940'
        },
        {
          _id: '1233',
          bidType: 'Exterior',
          materialName: 'Red paint',
          unit: 'KG',
          pricePerUnit: '700'
        },
        {
          _id: '1234',
          bidType: 'Interior',
          materialName: 'White paint',
          unit: 'KG',
          pricePerUnit: '3050'
        }
      ]
    },
    {
      _id: '2222',
      global: false,
      materials: [
        {
          _id: '123',
          bidType: 'Interior',
          materialName: 'Orange paint',
          unit: 'KG',
          pricePerUnit: '340'
        },
        {
          _id: '1233',
          bidType: 'Exterior',
          materialName: 'Pink paint',
          unit: 'KG',
          pricePerUnit: '340'
        },
        {
          _id: '1234',
          bidType: 'Interior',
          materialName: 'Purple paint',
          unit: 'KG',
          pricePerUnit: '340'
        }
      ]
    }
  ],
  material: [],
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

export const fetchMaterial = createAsyncThunk(
  'material/fetchMaterial',
  async (userData, thunkAPI) => {
    try {
      const response = await materialService.fetchMaterial(userData);
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

export const fetchSingleMaterial = createAsyncThunk(
  'material/fetchSingleMaterial',
  async (userData, thunkAPI) => {
    try {
      const response = await materialService.fetchSingleMaterial(userData);
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

export const createMaterial = createAsyncThunk(
  'material/createMaterial',
  async (userData, thunkAPI) => {
    try {
      const response = await materialService.createMaterial(userData);
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

export const updateMaterial = createAsyncThunk(
  'material/updateMaterial',
  async (userData, thunkAPI) => {
    try {
      const response = await materialService.updateMaterial(userData);
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

export const deleteMaterial = createAsyncThunk(
  'material/deleteMaterial',
  async (userData, thunkAPI) => {
    try {
      const response = await materialService.deleteMaterial(userData);
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

export const materialSlice = createSlice({
  name: 'material',
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
      .addCase(fetchMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.materialList = action.payload;
      })
      .addCase(fetchMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMaterial.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = addOrUpdateItemInArray(state.materialList, payload);
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMaterial.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.isUpdating = false;
        state.message = action.payload;
        state.response = addOrUpdateItemInArray(state.materialList, action.payload);
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMaterial.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isDeleted = true;
        state.response = addOrUpdateItemInArray(state.materialList, action.payload);
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSingleMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleMaterial.fulfilled, (state, action) => {
        state.material = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = materialSlice.actions;

export default materialSlice.reducer;
