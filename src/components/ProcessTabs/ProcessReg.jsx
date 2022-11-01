import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { createProcess, fetchProcess, reset } from "../../features/process/processSlice";
import formReducer from "../DashboardTabs/reducers/formReducer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";

const initialFormState = {
	description: ""
};
export default function FormDialog(props) {
	const { processList, isSuccess } = useSelector((state) => state.process);
	const { companyId } = useParams();
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

	const { open, setOpen, bidType } = props;

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const formStateWithToken = {
			...formState,
			ID: processList[0]._id,
			previousProcesses: processList[0].processes,
			bidType,
			add: true,
			token: userDetail.token
		};
		dispatch(createProcess(formStateWithToken));

		setOpen(false);
	};
	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			dispatch(
				showMessage({
					message: "Process updated successfully",
					variant: "success"
				})
			);
			companyId
				? dispatch(
						fetchProcess({
							token: userDetail.token,
							id: "635f99daad6419b4ce22ae43"
						})
				  )
				: dispatch(fetchProcess({ token: userDetail.token }));
			dispatch(reset());
		}
	}, [isSuccess]);
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
