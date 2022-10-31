import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "../../components/Button";
import EditUserForm from "./EditUserForm";
import {
	fetchUserMadeByCompany,
	reset,
	deleteUserByCompany
} from "../../features/usersFromCompany/usersFromCompanySlice";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import CreateUserForm from "./CreateUserForm";
import { companyUserColumns } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";
import DataTable from "../../Common/DataTable";

const UsersFromCompany = (props) => {
	const { getId } = props;
	const dispatch = useDispatch();
	const { companyMadeByUsers, isDeleting, isLoading, isDeleted } = useSelector(
		(state) => state.usersFromCompany
	);
	const [open, setOpen] = React.useState(false);
	const [openEditForm, setOpenEditForm] = React.useState(false);
	const [editFormData, setEditFormData] = React.useState([]);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
	const [emailId, setEmailId] = React.useState("");
	const [options, setOptions] = React.useState({});
	console.log(getId);
	React.useEffect(() => {
		if (isDeleted) {
			dispatch(
				showMessage({
					message: "User deleted successfully",
					variant: "success"
				})
			);
			setOpenDeleteModal(false);
			if (userDetail.role === "Org Admin" || userDetail.role === "Admin") {
				dispatch(
					fetchUserMadeByCompany({
						filter: {
							role: ["Painter", "Org Admin"],
							organization: getId
						},
						token: userDetail.token
					})
				);
			}
			dispatch(reset());
		}
	}, [isDeleted]);

	useEffect(() => {
		setOptions(tableOptions(isLoading, companyMadeByUsers));
	}, []);
	// set email on click
	const onDeleteBtnClick = (e, email) => {
		e.stopPropagation();
		setEmailId(email);
	};
	const columns = companyUserColumns({
		setEditFormData,
		setOpenEditForm,
		setOpenDeleteModal,
		onDeleteBtnClick,
		editFormData
	});

	function DeleteModal() {
		const handleClose = () => {
			setOpenDeleteModal(false);
		};
		const handleDelete = () => {
			dispatch(
				deleteUserByCompany({
					email: emailId,
					token: JSON.parse(localStorage.getItem("user")).token
				})
			);
		};

		return (
			<Dialog open={openDeleteModal} onClose={handleClose}>
				<DialogTitle>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6">Delete user</Typography>
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
						Are you sure you want to delete this user?
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
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CustomButton
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={() => setOpen(true)}
					disabled={isLoading}
				>
					Create
				</CustomButton>
			</Box>
			<DataTable
				datalist={companyMadeByUsers.map((org) => {
					return [
						org._id,
						org.name,
						org.email,
						org.phone,
						org.role,
						org.organization ? org.organization.name : "",
						org.active
					];
				})}
				columns={columns}
				options={options}
				title={"User List"}
			/>
			<CreateUserForm open={open} setOpen={setOpen} />
			{openEditForm && (
				<EditUserForm
					editFormData={editFormData}
					openEditForm={openEditForm}
					setOpenEditForm={setOpenEditForm}
					getId={getId}
				/>
			)}
			<DeleteModal />
		</>
	);
};

export default UsersFromCompany;
