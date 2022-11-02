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

export default function FormDialog(props) {
	const { processList, isSuccess } = useSelector((state) => state.process);
	const { companyId } = useParams();
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const { open, setOpen, bidType, filteredProcesses, stageType, orgProcessId } = props;

	let stageCategory;
	if (stageType === 0) {
		stageCategory = "Presentation";
	} else if (stageType === 1) {
		stageCategory = "Painting";
	} else {
		stageCategory = "Clean up";
	}
	const initialFormState = {
		description: "",
		stage: stageCategory,
		bidtype: bidType
	};
	console.log(initialFormState);
	const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreate = (e) => {
		e.preventDefault();
		const formStateWithToken = {
			...formState,
			ID: processList[0]._id,
			previousProcesses: processList[0].processes,

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
			console.log(formStateWithToken, "valuessss");
			dispatch(createProcess(formStateWithToken));
		}

		setOpen(false);
	};
	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			dispatch(
				showMessage({
					message: "Process Updated successfully",
					variant: "success"
				})
			);
			companyId
				? dispatch(
						fetchProcess({
							token: userDetail.token,
							id: orgProcessId
						})
				  )
				: dispatch(fetchProcess({ token: userDetail.token }));
			dispatch(reset());
		}
	}, [isSuccess]);

	useEffect(() => {
		["stage", "description"].forEach((h, i) => {
			dispatchNew({
				type: "HANDLE_FORM_INPUT",
				field: h,
				payload: h === "stage" ? stageCategory : ""
			});
		});
	}, [stageType]);
	const handleTextChange = (e) => {
		dispatchNew({
			type: "HANDLE_FORM_INPUT",
			field: e.target.name,
			payload: e.target.value
		});
	};
	// React.useEffect(() => {
	// 	["stage", "description"].forEach((h, i) => {
	// 		dispatchNew({
	// 			type: "HANDLE_FORM_INPUT",
	// 			field: h,
	// 			payload: editFormData[i + 1]
	// 		});
	// 	});
	// }, [editFormData]);

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
					<Grid item xs={12} md={12}>
						<InputLabel id="demo-select-small">Description</InputLabel>

						<TextareaAutosize
							name="description"
							required
							fullWidth
							aria-label="minimum height"
							minRows={3}
							variant="standard"
							id="process"
							label="Description"
							autoFocus
							value={formState.description}
							onChange={(e) => handleTextChange(e)}
							style={{ width: "100%" }}
						/>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6} md={6}>
							<FormControl
								sx={{ m: 0, minWidth: 240, maxHeight: 30, marginTop: 3 }}
								size="small"
							>
								<InputLabel id="demo-select-small">stage</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									name="stage"
									value={formState.stage}
									label="stage"
									onChange={(e) => handleTextChange(e)}
								>
									<MenuItem value="Presentation">Presentation</MenuItem>
									<MenuItem value="Painting">Painting</MenuItem>
									<MenuItem value="Clean up">Clean up</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={6}>
							<FormControl
								sx={{ m: 0, minWidth: 240, maxHeight: 30, marginTop: 3 }}
								size="small"
							>
								<InputLabel id="demo-select-small">stage</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									name="bidType"
									value={formState.bidType}
									label="Bid Type"
									onChange={(e) => handleTextChange(e)}
								>
									<MenuItem value="Interior">Interior</MenuItem>
									<MenuItem value="Exterior">Exterior</MenuItem>
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
