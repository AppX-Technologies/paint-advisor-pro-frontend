/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
	const { processList } = useSelector((state) => state.process);
	const { companyId } = useParams();
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const [category, setCategory] = React.useState("");

	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

	const { open, setOpen, bidType, filteredProcesses, orgProcessId } = props;

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
		}

		setOpen(false);
	};

	const handleChange = (event) => {
		setCategory(event.target.value);
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
			<Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "40%" } }}>
				<DialogTitle>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6">Add New Process</Typography>
						{<CircularProgress color="primary" size={25} style={{ display: "none" }} />}
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} md={12}>
							<InputLabel id="demo-simple-select-standard-label">
								Description
							</InputLabel>
							<TextareaAutosize
								name="Process"
								required
								fullWidth
								aria-label="minimum height"
								minRows={3}
								variant="standard"
								id="process"
								label="Process"
								autoFocus
								value={formState.description}
								onChange={(e) => handleTextChange(e)}
								style={{ width: "100%" }}
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<FormControl sx={{ m: 0, minWidth: 200, maxHeight: 30 }} size="small">
								<InputLabel id="demo-select-small">Category</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									value={category}
									label="category"
									onChange={handleChange}
								>
									<MenuItem value={10}>Presentation</MenuItem>
									<MenuItem value={20}>Clean up</MenuItem>
									<MenuItem value={30}>Brush</MenuItem>
								</Select>
							</FormControl>
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
