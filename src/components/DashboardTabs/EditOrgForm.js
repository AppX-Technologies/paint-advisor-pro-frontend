import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import formReducer from "./reducers/formReducer";
import { Checkbox, CircularProgress, FormControlLabel, Grid } from "@mui/material";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import { updateOrg, fetchOrgs, reset } from "../../features/org/orgSlice";

export default function Edit(props) {
	const dispatch = useDispatch();
	const { openEditForm, setOpenEditForm, editFormData } = props;
	const initialFormState = {
		name: editFormData[1] ? editFormData[1] : "",
		email: editFormData[2] ? editFormData[2] : "",
		address: editFormData[3] ? editFormData[3] : "",
		phone: editFormData[4] ? editFormData[4] : "",
		active: editFormData[5] ? editFormData[5] : false
	};

	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const { isUpdated, isUpdating } = useSelector((state) => state.org);

	useEffect(() => {
		["name", "email", "address", "phone", "active"].forEach((h, i) => {
			dispatchNew({
				type: "HANDLE_FORM_INPUT",
				field: h,
				payload: editFormData[i + 1]
			});
		});
	}, [editFormData]);

	const handleTextChange = (e) => {
		dispatchNew({
			type: "HANDLE_FORM_INPUT",
			field: e.target.name,
			payload: e.target.name === "active" ? e.target.checked : e.target.value
		});
	};

	const handleClose = () => {
		setOpenEditForm(false);
		Object.keys(formState).forEach((key) => {
			formState[key] = "";
		});
	};

	const formStateWithToken = {
		...formState,
		id: editFormData[0],
		token: userDetail.token
	};
	const handleEdit = (e) => {
		e.preventDefault();
		dispatch(updateOrg(formStateWithToken));
		// dispatch(reset());
	};

	useEffect(() => {
		if (isUpdated) {
			setOpenEditForm(false);
			dispatch(
				showMessage({
					message: "Organization updated successfully",
					variant: "success"
				})
			);
			dispatch(fetchOrgs(userDetail.token));
			dispatch(reset());
		}
	}, [isUpdated]);
	return (
		<div>
			<Dialog open={openEditForm} onClose={handleClose}>
				<DialogTitle>
					Edit Organization
					<CircularProgress
						style={{ display: isUpdating ? "block" : "none" }}
						size={25}
					/>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<label>Name</label>
							<TextField
								name="name"
								required
								fullWidth
								id="name"
								autoFocus
								value={formState.name}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>Email</label>
							<TextField
								name="email"
								required
								fullWidth
								placeholder={editFormData[2]}
								id="email"
								autoFocus
								value={formState.email}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>Address</label>
							<TextField
								name="address"
								required
								fullWidth
								placeholder={editFormData[3]}
								id="address"
								autoFocus
								value={formState.address}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>Phone</label>
							<TextField
								name="phone"
								required
								fullWidth
								placeholder={editFormData[4]}
								id="phone"
								autoFocus
								value={formState.phone}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										name="active"
										checked={formState.active}
										onChange={(e) => handleTextChange(e)}
									/>
								}
								label="Is organization active?"
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						disabled={isUpdating}
						type="submit"
						variant="contained"
						onClick={(e) => handleEdit(e)}
					>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
