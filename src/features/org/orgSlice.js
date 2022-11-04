/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orgService from "./orgService";
import { showMessage, onClose } from "../snackbar/snackbarSlice";

// initial states

const initialState = {
	orgList: [],
	org: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	isDeleting: false,
	isDeleted: false,
	isUpdating: false,
	isUpdated: false,
	message: ""
};

// get organizations

export const fetchOrgs = createAsyncThunk("org/fetchOrgs", async (userData, thunkAPI) => {
	try {
		const response = await orgService.fetchOrgs(userData);
		return response;
	} catch (err) {
		const message =
			(err.response && err.response.data && err.response.data.message) ||
			err.message ||
			err.toString();
		thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
		return thunkAPI.rejectWithValue(message);
	}
});

export const fetchSingleOrg = createAsyncThunk("org/fetchSingleOrg", async (userData, thunkAPI) => {
	try {
		const response = await orgService.fetchSingleOrg(userData);
		return response;
	} catch (err) {
		const message =
			(err.response && err.response.data && err.response.data.message) ||
			err.message ||
			err.toString();
		thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
		return thunkAPI.rejectWithValue(message);
	}
});
// create organization

export const createOrgs = createAsyncThunk("auth/createOrgs", async (userData, thunkAPI) => {
	try {
		const response = await orgService.createOrgs(userData);
		console.log(response);
		return response;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
		return thunkAPI.rejectWithValue(message);
	}
});

// update organization

export const updateOrg = createAsyncThunk("auth/updateOrg", async (userData, thunkAPI) => {
	try {
		const response = await orgService.updateOrg(userData);
		console.log(response);
		return response;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
		return thunkAPI.rejectWithValue(message);
	}
});

export const deleteOrg = createAsyncThunk("auth/deleteOrg", async (userData, thunkAPI) => {
	try {
		const response = await orgService.deleteOrg(userData);
		console.log(response);
		return response;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(showMessage({ message: message, severity: "error" }));
		return thunkAPI.rejectWithValue(message);
	}
});

export const orgSlice = createSlice({
	name: "org",
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
				state.isUpdating = true;
			})
			.addCase(updateOrg.fulfilled, (state, action) => {
				state.isUpdated = true;
				state.isUpdating = false;
				state.message = action.payload;
			})
			.addCase(updateOrg.rejected, (state, action) => {
				state.isUpdating = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteOrg.pending, (state) => {
				state.isDeleting = true;
			})
			.addCase(deleteOrg.fulfilled, (state, action) => {
				state.isDeleting = false;
				state.isDeleted = true;
				state.message = action.payload;
			})
			.addCase(deleteOrg.rejected, (state, action) => {
				state.isDeleting = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchSingleOrg.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchSingleOrg.fulfilled, (state, action) => {
				state.org = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchSingleOrg.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	}
});

export const { reset } = orgSlice.actions;

export default orgSlice.reducer;
