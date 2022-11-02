/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
	Box,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	Typography,
	Button,
	Grid
} from "@mui/material";

import CustomButton from "../Button";
import { processColumn } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import { createProcess, fetchProcess, reset } from "../../features/process/processSlice";
import DataTable from "../../Common/DataTable";
import FormDialog from "./ProcessReg";
import Edit from "./EditProcessForm";
import { useParams } from "react-router-dom";
import { filterProcessByBid } from "../../Helpers/bidFilterHelpers";
import { fetchSingleOrg } from "../../features/org/orgSlice";
import StageTab from "./StageTab";
const ProcessTable = ({ filterValue }) => {
	const dispatch = useDispatch();
	const { processList, isDeleting, isLoading, isDeleted, isSuccess } = useSelector(
		(state) => state.process
	);
	const [stage, setStage] = React.useState(0);

	const handleChange = (event, newValue) => {
		setStage(newValue);
	};
	const { org } = useSelector((state) => state.org);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const [openEditForm, setOpenEditForm] = useState(false);
	const [editFormData, setEditFormData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [filteredProcesses, setFilteredProcesses] = useState([]);
	const [processId, setProcessId] = useState("");
	const [open, setOpen] = useState(false);
	const { companyId } = useParams();

	useEffect(() => {
		if (isDeleted) {
			dispatch(
				showMessage({
					message: "Process Deleted successfully",
					variant: "success",
					severity: "info"
				})
			);
			setOpenDeleteModal(false);
			dispatch(reset());
		}
		companyId
			? dispatch(
					fetchProcess({
						token: userDetail.token,
						id: org.processes
					})
			  )
			: dispatch(fetchProcess({ token: userDetail.token }));
	}, [isDeleted, filterValue]);

	const onDeleteBtnClick = (e, getId) => {
		e.stopPropagation();
		setProcessId(getId);
	};
	const columns = processColumn({
		setEditFormData,
		setOpenEditForm,
		setOpenDeleteModal,
		onDeleteBtnClick,
		editFormData
	});
	const options = tableOptions(processList, isLoading);

	useEffect(() => {
		if (isSuccess) {
			setOpenDeleteModal(false);
		}
	}, [isSuccess]);

	//Delete popup menu
	function DeleteModal() {
		const handleClose = () => {
			setOpenDeleteModal(false);
		};
		const handleDelete = () => {
			setOpenDeleteModal(false);
			dispatch(
				createProcess({
					ID: processList[0]._id,
					previousProcesses: processList[0].processes,
					add: false,
					token: userDetail.token,
					idToBeDeleted: processId
				})
			);
		};

		return (
			<Dialog open={openDeleteModal} onClose={handleClose}>
				<DialogTitle>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6">Delete Process</Typography>
						{
							<CircularProgress
								color="primary"
								size={25}
								style={{ display: isDeleting ? "block" : "none" }}
							/>
						}
					</Stack>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this Process?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} disabled={isDeleting}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	useEffect(() => {
		if (stage === 0) {
			setFilteredProcesses(filterProcessByBid(processList, filterValue, "Presentation"));
		} else if (stage === 1) {
			setFilteredProcesses(filterProcessByBid(processList, filterValue, "Painting"));
		} else if (stage === 2) {
			setFilteredProcesses(filterProcessByBid(processList, filterValue, "Clean up"));
		}
	}, [processList, filterValue, stage]);

	React.useEffect(() => {
		dispatch(
			fetchSingleOrg({
				filter: {
					_id: companyId
				},
				token: userDetail.token
			})
		);
	}, [companyId]);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					margin: "0 0 20px 0"
				}}
			>
				<StageTab stage={stage} onTabChange={handleChange} />
				<Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "9px" }}>
					<CustomButton
						variant="contained"
						onClick={() => setOpen(true)}
						sx={{ height: "47px" }}
					>
						Create
					</CustomButton>
				</Box>
			</Box>
			<div style={{ position: "relative" }}>
				<div style={{ zIndex: "100", position: "absolute", left: "18%", top: "0px" }}></div>
			</div>
			<DataTable
				datalist={
					filteredProcesses &&
					filteredProcesses.map((process) => {
						return [process._id, process.stage, process.description];
					})
				}
				columns={columns}
				options={options}
				title={filterValue + " Process"}
			/>

			<FormDialog
				open={open}
				setOpen={setOpen}
				bidType={filterValue}
				filteredProcesses={filteredProcesses}
				orgProcessId={org.processes}
			/>
			<DeleteModal />
			<Edit
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				editFormData={editFormData}
				bidType={filterValue}
				filteredProcesses={filteredProcesses}
			/>
		</>
	);
};

export default ProcessTable;
