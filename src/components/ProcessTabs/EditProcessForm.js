/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CircularProgress, Grid } from "@mui/material";
import formReducer from "../DashboardTabs/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
import { createProcess } from "../../features/process/processSlice";
import { showMessage } from "../../features/snackbar/snackbarSlice";

export default function Edit(props) {
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const { openEditForm, setOpenEditForm, editFormData, bidType, filteredProcesses } = props;

	const initialFormState = {
		stage: editFormData[1] ? editFormData[1] : "",
		description: editFormData[2] ? editFormData[2] : ""
	};

	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
	const { processList } = useSelector((state) => state.process);
	console.log(editFormData);
	const dispatch = useDispatch();

	React.useEffect(() => {
		["stage", "description"].forEach((h, i) => {
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
			ID: processList[0]._id,
			previousProcesses: processList[0].processes.filter(
				(previousProcess) => previousProcess._id !== editFormData[0]
			),
			bidType,
			add: true,
			token: userDetail.token
		};

		dispatch(createProcess(formStateWithToken));
		setOpenEditForm(false);
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
						<Grid item xs={12} md={12}>
							<FormControl sx={{ m: 0, minWidth: 200, maxHeight: 30 }} size="small">
								<InputLabel id="demo-select-small">stage</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									name="stage"
									value={formState.stage ? formState.stage : editFormData[1]}
									label="stage"
									onChange={(e) => handleTextChange(e)}
								>
									<MenuItem value="Presentation">Preparation</MenuItem>
									<MenuItem value="Painting">Painting</MenuItem>
									<MenuItem value="Clean up">Clean up</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<label>Process</label>
							<TextField
								name="description"
								required
								fullWidth
								placeholder={editFormData[2]}
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
