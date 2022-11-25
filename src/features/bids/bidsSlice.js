import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrUpdateItemInArray } from '../../helpers/addRemoveUpdateListHelper';
import { showMessage } from '../snackbar/snackbarSlice';
import {
  createClientService,
  createACommentService,
  fetchAllClientsService,
  updateClientService,
  uploadAFileService,
  deleteFileService,
  updateClientStatusService
} from './bidsService';

// initial states

const initialState = {
  clientList: [],
  client: {},
  comments: [],
  files: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  response: null,
  isFileUploadLoading: false,
  fileDeletedSuccessfully: false,
  jobSuccessFullyCanceled: false,
  isJobCanceledLoading: false
};

// Fetch Client Info

export const fetchAllClients = createAsyncThunk('bids/fetchClients', async (userData, thunkAPI) => {
  try {
    const response = await fetchAllClientsService(userData);
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

//  Create Client

export const createClient = createAsyncThunk('bids/createClient', async (userData, thunkAPI) => {
  try {
    const response = await createClientService(userData);

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

//  Fetch Single Client

export const fetchSingleClient = createAsyncThunk(
  'bids/fetchSingleClient',
  async (userData, thunkAPI) => {
    try {
      //   const response = await processService.fetchProcess(userData);
      // return response;
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

export const updateClient = createAsyncThunk('bids/updateClient', async (userData, thunkAPI) => {
  try {
    const response = await updateClientService(userData);
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

//  Fetch ALl Comments

export const fetchAllComments = createAsyncThunk(
  'bids/fetchSingleClient',
  async (userData, thunkAPI) => {
    try {
      //   const response = await processService.fetchProcess(userData);
      // return response;
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

//  Create A Comment

export const createAComment = createAsyncThunk(
  'bids/createAComment',
  async (userData, thunkAPI) => {
    try {
      const response = await createACommentService(userData);
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

//  Create A Comment

export const uploadAFile = createAsyncThunk('bids/uploadAFile', async (userData, thunkAPI) => {
  try {
    const response = await uploadAFileService(userData);
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

export const deleteAFIle = createAsyncThunk('bids/deleteAFile', async (userData, thunkAPI) => {
  try {
    const response = await deleteFileService(userData);
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

export const updateClientStatus = createAsyncThunk(
  'bids/updateClientStatus',
  async (userData, thunkAPI) => {
    try {
      const response = await updateClientStatusService(userData);
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
export const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.fileDeletedSuccessfully = false;
      state.jobSuccessFullyCanceled = false;
      state.isJobCanceledLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientList = action.payload.data;
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateClientStatus.pending, (state) => {
        // state.isLoading = true;
        state.isJobCanceledLoading = true;
      })
      .addCase(updateClientStatus.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.jobSuccessFullyCanceled = true;
        state.isJobCanceledLoading = false;
        // state.clientList = action.payload.data;
        state.response = addOrUpdateItemInArray(state.clientList, payload.data);
      })
      .addCase(updateClientStatus.rejected, (state, action) => {
        state.jobSuccessFullyCanceled = false;
        state.isJobCanceledLoading = false;
      })
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClient.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = addOrUpdateItemInArray(state.clientList, payload.data);
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = addOrUpdateItemInArray(state.clientList, payload.data);
        state.isAdded = true;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(uploadAFile.pending, (state) => {
        state.isFileUploadLoading = true;
      })
      .addCase(uploadAFile.fulfilled, (state, { payload }) => {
        state.isFileUploadLoading = false;
        state.isSuccess = true;

        state.isLoading = false;
        state.response = addOrUpdateItemInArray(state.clientList, payload.data);
      })
      .addCase(uploadAFile.rejected, (state, action) => {
        state.isFileUploadLoading = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchSingleClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAFIle.pending, (state) => {
        state.isFileUploadLoading = true;
      })
      .addCase(deleteAFIle.fulfilled, (state, action) => {
        state.isFileUploadLoading = false;
        state.fileDeletedSuccessfully = true;
      })
      .addCase(deleteAFIle.rejected, (state, action) => {
        state.isFileUploadLoading = false;
        state.fileDeletedSuccessfully = false;
      })
      .addCase(createAComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAComment.fulfilled, (state, { payload }) => {
        state.response = addOrUpdateItemInArray(state.clientList, payload.data);
        state.isLoading = false;
      })
      .addCase(createAComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = bidsSlice.actions;

export default bidsSlice.reducer;
