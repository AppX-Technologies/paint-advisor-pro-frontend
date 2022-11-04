import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import formReducer from "../reducers/registerReducer";
import {
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Typography
} from "@mui/material";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import {
	updateUserFromCompany,
	fetchUserMadeByCompany,
	reset
} from "../../features/usersFromCompany/usersFromCompanySlice";

export default function Edit(props) {
	const dispatch = useDispatch();
	console.log("sadsad");
	const { openEditForm, setOpenEditForm, editFormData, getId } = props;
	const initialFormState = {
		name: editFormData[1] ? editFormData[1] : "",
		email: editFormData[2] ? editFormData[2] : "",
		phone: editFormData[3] ? editFormData[3] : "",
		role: editFormData[4] ? editFormData[4] : "",
		proficiency: editFormData[5] ? editFormData[5] : 1
	};
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

	const userDetail = JSON.parse(localStorage.getItem("user"));
	const { isUpdated, isUpdating } = useSelector((state) => state.usersFromCompany);

	useEffect(() => {
		["name", "email", "phone", "role"].forEach((h, i) => {
			dispatchNew({
				type: "HANDLE_FORM_INPUT",
				field: h,
				payload: editFormData[i + 1]
			});
		});
	}, [editFormData]);

	const handleTextChange = (e) => {
		dispatchNew({
			type: "HANDLE_INPUT",
			field: e.target.name,
			payload: e.target.value
		});
	};
	const handleClose = () => {
		setOpenEditForm(false);
		Object.keys(formState).forEach((key) => {
			formState[key] = "";
		});
	};

	const handleEdit = (e) => {
		e.preventDefault();
		const formStateWithToken = {
			...formState,
			token: userDetail.token
		};
		if (formState.role === "") {
			dispatch(
				showMessage({
					message: "Please select a role",
					severity: "error"
				})
			);
		} else {
			dispatch(updateUserFromCompany(formStateWithToken));
			dispatch(reset());
		}
	};

	useEffect(() => {
		if (isUpdated) {
			setOpenEditForm(false);
			dispatch(
				showMessage({
					message: "User updated successfully",
					variant: "success"
				})
			);

			if (userDetail.role === "Org Admin" || userDetail.role === "Admin") {
				dispatch(
					fetchUserMadeByCompany({
						token: userDetail.token,
						orgId: getId
					})
				);
			}

			dispatch(reset());
		}
	}, [isUpdated]);

	return (
		<div>
			<Dialog open={openEditForm} onClose={handleClose}>
				<DialogTitle>
					Edit User
					<CircularProgress
						style={{ display: isUpdating ? "block" : "none" }}
						size={25}
					/>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<label>Name *</label>
							<TextField
								name="name"
								required
								fullWidth
								id="name"
								autoFocus
								placeholder={editFormData[1]}
								value={formState.name}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>Phone Number</label>
							<TextField
								name="phone"
								required
								fullWidth
								id="phone"
								autoFocus
								placeholder={editFormData[3]}
								value={formState.phone}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>

						<Grid item xs={5}>
							<FormControl variant="standard" sx={{ mt: 2, minWidth: "100%" }}>
								<InputLabel id="demo-simple-select-standard-label">
									Role *
								</InputLabel>
								<Select
									fullWidth
									name="role"
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={formState.role ? formState.role : editFormData[4]}
									onChange={(e) => handleTextChange(e)}
									label="Role"
								>
									<MenuItem value="Org Admin">Org Admin</MenuItem>
									<MenuItem value="Estimator">Estimator</MenuItem>
									<MenuItem value="Painter">Painter</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid xs={7} sx={{ marginTop: "44px" }}>
							{formState.role === "Painter" && (
								<>
									<Typography
										variant="h6"
										sx={{ fontSize: "12px", marginLeft: "25px", color: "gray" }}
									>
										Proficiency{" "}
										{formState.proficiency
											? `(${formState.proficiency})`
											: null}
									</Typography>
									<Slider
										sx={{ width: "93%", marginLeft: "25px" }}
										name="proficiency"
										aria-label="Default"
										valueLabelDisplay="auto"
										min={1}
										max={5}
										value={formState.proficiency}
										onChange={(e) => handleTextChange(e)}
									/>
								</>
							)}
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
