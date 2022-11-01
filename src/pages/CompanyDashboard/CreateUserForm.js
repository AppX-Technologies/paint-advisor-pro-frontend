/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import formReducer from "../reducers/registerReducer";
import { CircularProgress, Grid, Slider, Stack, Typography } from "@mui/material";
import {
	createUsersByCompany,
	fetchUserMadeByCompany,
	reset
} from "../../features/usersFromCompany/usersFromCompanySlice";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";

const initialFormState = {
	name: "",
	email: "",
	phone: "",
	role: ""
};

export default function CreateUserForm(props) {
	const dispatch = useDispatch();
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
	const { open, setOpen } = props;
	const { isSuccess, isLoading } = useSelector((state) => state.usersFromCompany);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const param = window.location.href.split("/").reverse()[0];
	const getId =
		param === "company" ? userDetail._id : window.location.href.split("/").reverse()[0];
	const handleTextChange = (e) => {
		dispatchNew({
			type: "HANDLE_INPUT",
			field: e.target.name,
			payload: e.target.value
		});
	};
	const handleClose = () => {
		setOpen(false);
		Object.keys(formState).forEach((key) => {
			dispatchNew({
				type: "HANDLE_INPUT",
				field: key,
				payload: ""
			});
		});
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const formStateWithCompanyId = {
			...formState,
			organization: getId,
			token: JSON.parse(localStorage.getItem("user")).token
		};
		if (formState.role === "") {
			dispatch(
				showMessage({
					message: "Please select a role",
					severity: "error"
				})
			);
		} else {
			dispatch(createUsersByCompany(formStateWithCompanyId));
			reset();
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			dispatch(showMessage({ message: "User created successfully", variant: "success" }));
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
	}, [isSuccess]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6">Add New User</Typography>
						{
							<CircularProgress
								color="primary"
								size={25}
								style={{ display: isLoading ? "block" : "none" }}
							/>
						}
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								name="name"
								required
								fullWidth
								variant="standard"
								id="name"
								label="Name"
								autoFocus
								value={formState.name}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="email"
								required
								fullWidth
								variant="standard"
								id="email"
								label="Email"
								autoFocus
								value={formState.email}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="phone"
								required
								fullWidth
								variant="standard"
								id="phone"
								label="Phone Number"
								autoFocus
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
									value={formState.role}
									onChange={(e) => handleTextChange(e)}
									label="Role"
								>
									<MenuItem value="Org Admin">Org Admin</MenuItem>
									<MenuItem value="Estimator">Estimator</MenuItem>
									<MenuItem value="Painter">Painter</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid xs={7} sx={{ marginTop: "47px" }}>
							{formState.role === "Painter" && (
								<>
									<Typography
										variant="h6"
										sx={{ fontSize: "12px", marginLeft: "15px", color: "gray" }}
									>
										Proficiency ({formState.proficiency})
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
					<Button type="submit" variant="contained" onClick={(e) => handleCreate(e)}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
