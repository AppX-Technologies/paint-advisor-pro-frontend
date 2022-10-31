import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { createProcess, fetchProcess } from "../../features/process/processSlice";
import formReducer from "../DashboardTabs/reducers/formReducer";

const initialFormState = {
	description: ""
};
export default function FormDialog(props) {
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

	const { open, setOpen } = props;

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const formStateWithToken = {
			...formState,
			token: userDetail.token
		};
		dispatch(createProcess(formStateWithToken));
		dispatch(fetchProcess(userDetail.token));
	};

	const handleTextChange = (e) => {
		dispatchNew({
			type: "HANDLE_FORM_INPUT",
			field: "description",
			payload: e.target.value
		});
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6">Add New Process</Typography>
						{<CircularProgress color="primary" size={25} style={{ display: "none" }} />}
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="Process"
								required
								fullWidth
								variant="standard"
								id="process"
								label="Process"
								autoFocus
								value={formState.description}
								onChange={(e) => handleTextChange(e)}
							/>
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
