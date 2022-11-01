/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Grid } from "@mui/material";
import formReducer from "../DashboardTabs/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
import { createProcess } from "../../features/process/processSlice";
import { showMessage } from "../../features/snackbar/snackbarSlice";

export default function Edit(props) {
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const { openEditForm, setOpenEditForm, editFormData, bidType, filteredProcesses } = props;

	const initialFormState = {
		description: editFormData[1] ? editFormData[1] : ""
	};
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
	const { processList } = useSelector((state) => state.process);

	const dispatch = useDispatch();

	const handleClose = () => {
		setOpenEditForm(false);
	};

	React.useEffect(() => {
		["description"].forEach((h, i) => {
			dispatchNew({
				type: "HANDLE_FORM_INPUT",
				field: h,
				payload: editFormData[i + 1]
			});
		});
	}, [editFormData]);

	const handleEdit = (e) => {
		e.preventDefault();
		const formStateWithToken = {
			...formState,
			ID: processList[0]._id,
			previousProcesses: processList[0].processes.filter(
				(previousProcess) => previousProcess._id !== editFormData[0]
			),
			bidType,
			add: true,
			token: userDetail.token
		};
		if (
			filteredProcesses.some((process) => {
				return (
					process.description.toLowerCase().trim() ===
					formState.description.toLowerCase().trim()
				);
			})
		) {
			dispatch(
				showMessage({
					message: "Process Already Exists",
					variant: "info",
					severity: "info"
				})
			);
		} else {
			dispatch(createProcess(formStateWithToken));
			setOpenEditForm(false);
		}
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
			<Dialog open={openEditForm} onClose={handleClose}>
				<DialogTitle>
					Edit Process
					<CircularProgress style={{ display: "none" }} size={25} />
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<label>Process</label>
							<TextField
								name="process"
								required
								fullWidth
								placeholder={editFormData[1]}
								id="process"
								autoFocus
								value={formState.description}
								onChange={(e) => handleTextChange(e)}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" variant="contained" onClick={(e) => handleEdit(e)}>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
