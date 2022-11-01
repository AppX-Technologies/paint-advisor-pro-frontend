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
const ProcessTable = ({ filterValue }) => {
	const dispatch = useDispatch();
	const { processList, isDeleting, isLoading, isDeleted, isSuccess } = useSelector(
		(state) => state.process
	);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const [openEditForm, setOpenEditForm] = useState(false);
	const [editFormData, setEditFormData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [filteredProcesses, setFilteredProcesses] = useState([]);
	const [orgProcessId, setOrgProcessId] = useState("");
	const [processId, setProcessId] = useState("");
	const [open, setOpen] = useState(false);
	const { companyId } = useParams();

	React.useEffect(() => {
		setOrgProcessId(
			dispatch(
				fetchSingleOrg({
					filter: {
						_id: companyId
					},
					token: userDetail.token
				})
			)
		);
	}, [companyId]);

	useEffect(() => {
		if (isDeleted) {
			dispatch(
				showMessage({
					message: "Process Deleted successfully",
					variant: "success"
				})
			);
			setOpenDeleteModal(false);
			dispatch(reset());
		}
		companyId
			? dispatch(
					fetchProcess({
						token: userDetail.token,
						id: "635f99daad6419b4ce22ae43"
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
		setFilteredProcesses(filterProcessByBid(processList, filterValue));
	}, [processList, filterValue]);
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CustomButton
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={() => setOpen(true)}
				>
					Create
				</CustomButton>
			</Box>
			<div style={{ position: "relative" }}>
				<div style={{ position: "absolute", left: "50%", top: "20px" }}>
					{isLoading && (
						<CircularProgress
							color="primary"
							style={{
								display: isLoading ? "flex" : "none",
								margin: "0 auto"
							}}
						/>
					)}
				</div>
			</div>
			<DataTable
				datalist={
					filteredProcesses &&
					filteredProcesses.map((process) => {
						return [process._id, process.description];
					})
				}
				columns={columns}
				options={options}
				title={filterValue + " Process"}
			/>

			<FormDialog open={open} setOpen={setOpen} bidType={filterValue} />
			<DeleteModal />
			<Edit
				openEditForm={openEditForm}
				setOpenEditForm={setOpenEditForm}
				editFormData={editFormData}
			/>
		</>
	);
};

export default ProcessTable;
