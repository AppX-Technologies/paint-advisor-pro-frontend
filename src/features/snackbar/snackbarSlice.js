import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	message: "",
	severity: ""
};

const snackbarSlice = createSlice({
	name: "snackbar",
	initialState,
	reducers: {
		showMessage: (state, action) => {
			state.open = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
		onClose: (state) => {
			state.open = false;
			state.message = "";
			state.severity = "";
		}
	}
});

export const { showMessage, onClose } = snackbarSlice.actions;

export default snackbarSlice.reducer;
