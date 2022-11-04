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
	Button
} from "@mui/material";

import CustomButton from "../Button";
import { processColumn } from "../../Common/tableHead";
import { useDispatch, useSelector } from "react-redux";
import { createProcess, reset } from "../../features/process/processSlice";
import DataTable from "../../Common/DataTable";
import FormDialog from "./ProcessReg";
import Edit from "./EditProcessForm";
import { useParams } from "react-router-dom";
import { filterProcessByBid } from "../../Helpers/bidFilterHelpers";
import { fetchSingleOrg } from "../../features/org/orgSlice";
import StageTab from "./StageTab";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import { DraggableDataTable } from "../../Common/DraggableDataTable";
const ProcessTable = ({ filterValue, setOpenDeleteModal, openDeleteModal }) => {
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
	const [dataList, setDataList] = useState([]);
	const [openEditForm, setOpenEditForm] = useState(false);
	const [editFormData, setEditFormData] = useState([]);
	const [filteredProcesses, setFilteredProcesses] = useState([]);
	const [processId, setProcessId] = useState("");
	const [open, setOpen] = useState(false);

	const onDeleteBtnClick = (e, getId) => {
		e.stopPropagation();
		setProcessId(getId);
	};
	const columns = processColumn();
	const initialDataList =
		filteredProcesses &&
		filteredProcesses.map((process) => {
			return {
				id: process._id,
				stage: process.stage,
				description: process.description,
				bidType: process.bidType
			};
		});

	useEffect(() => {
		if (isSuccess) {
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			setOpenDeleteModal(false);
			dispatch(
				showMessage({
					message: "Process list updated successfully",
					variant: "success"
				})
			);

			dispatch(reset());
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
		console.log(editFormData);

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
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CustomButton
						variant="contained"
						onClick={() => setOpen(true)}
						disabled={true}
						sx={{ height: "47px", marginRight: "10px" }}
					>
						Sort
					</CustomButton>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CustomButton
						variant="contained"
						onClick={() => setOpen(true)}
						sx={{ height: "47px" }}
					>
						Create
					</CustomButton>
				</Box>
			</Box>

			<DraggableDataTable
				initialDataList={initialDataList}
				isLoading={isLoading}
				columns={columns}
				dataList={dataList}
				setDataList={setDataList}
				title={"Processes List"}
				setEditFormData={setEditFormData}
				setOpenEditForm={setOpenEditForm}
				setOpenDeleteModal={setOpenDeleteModal}
				onDeleteBtnClick={onDeleteBtnClick}
			/>

			<FormDialog
				open={open}
				setOpen={setOpen}
				stageType={stage}
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
