/* eslint-disable */
import { Button, Stack } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Link } from "react-router-dom";

export const companyColumns = ({
	setEditFormData,
	setOpenEditForm,
	setOpenDeleteModal,
	onDeleteBtnClick,
	editFormData
}) => {
	return [
		{
			name: "",
			label: "",
			options: {
				display: false
			}
		},
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: "email",
			label: "Email",
			options: {
				filter: true
			}
		},
		{
			name: "address",
			label: "Address",
			options: {
				filter: true
			}
		},
		{
			name: "phone",
			label: "Phone",
			options: {
				filter: true
			}
		},
		{
			name: "active",
			label: "Status",
			options: {
				filter: true,
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<Button
							variant="outlined"
							color="primary"
							style={{
								fontSize: "12px",
								textTransform: "none",
								fontWeight: 700,
								background: "#1565c0",
								color: "#fafafa",
								padding: "4px 8px",
								textTransform: "capitalize"
							}}
						>
							{value ? "Active" : "Inactive"}
						</Button>
					);
				}
			}
		},
		{
			label: "Action",
			name: "",
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					const getId = tableMeta.rowData[0];
					return (
						<>
							<Stack direction="row" spacing={2}>
								<EditOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={() => {
										setEditFormData(tableMeta.rowData);
										setOpenEditForm(true);
									}}
									editFormData={editFormData}
								/>
								<Link to={`/company/${getId}`} target="_blank">
									<RemoveRedEyeOutlinedIcon
										style={{ cursor: "pointer", color: "black" }}
									/>
								</Link>
								<DeleteOutlineOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={(e) => {
										setOpenDeleteModal(true);
										onDeleteBtnClick(e, getId);
									}}
								/>
							</Stack>
						</>
					);
				}
			}
		}
	];
};
export const userColumn = ({
	setEditFormData,
	setOpenEditForm,
	setOpenDeleteModal,
	onDeleteBtnClick,
	editFormData
}) => {
	return [
		{
			name: "",
			label: "",
			options: {
				display: false
			}
		},
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: "email",
			label: "Email",
			options: {
				filter: true
			}
		},
		{
			name: "phone",
			label: "Phone",
			options: {
				filter: true
			}
		},

		{
			name: "active",
			label: "Status",
			options: {
				filter: true,

				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<Button
							variant="outlined"
							color="primary"
							style={{
								fontSize: "12px",
								textTransform: "none",
								fontWeight: 700,
								background: "#1565c0",
								color: "#fafafa",
								padding: "4px 8px",
								textTransform: "capitalize"
							}}
						>
							{value ? "Active" : "Inactive"}
						</Button>
					);
				}
			}
		},
		{
			label: "Action",
			name: "",
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					const getEmail = tableMeta.rowData[2];
					return (
						<>
							<Stack direction="row" spacing={2}>
								<EditOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={() => {
										setEditFormData(tableMeta.rowData);
										setOpenEditForm(true);
									}}
									editFormData={editFormData}
								/>
								<DeleteOutlineOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={(e) => {
										setOpenDeleteModal(true);
										onDeleteBtnClick(e, getEmail);
									}}
								/>
							</Stack>
						</>
					);
				}
			}
		}
	];
};
export const companyUserColumns = ({
	setEditFormData,
	setOpenEditForm,
	setOpenDeleteModal,
	onDeleteBtnClick,
	editFormData
}) => {
	return [
		{
			name: "",
			label: "",
			options: {
				display: false
			}
		},
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: "email",
			label: "Email",
			options: {
				filter: true
			}
		},
		{
			name: "phone",
			label: "Phone",
			options: {
				filter: true
			}
		},
		{
			name: "role",
			label: "Role",
			options: {
				filter: true
			}
		},
		{
			name: "company",
			label: "Company",
			options: {
				filter: true
			}
		},
		{
			name: "active",
			label: "Status",
			options: {
				filter: true,

				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<Button
							variant="outlined"
							color="primary"
							style={{
								fontSize: "12px",
								textTransform: "none",
								fontWeight: 700,
								background: "#1565c0",
								color: "#fafafa",
								padding: "4px 8px",
								textTransform: "capitalize"
							}}
						>
							{value ? "Active" : "Inactive"}
						</Button>
					);
				}
			}
		},
		{
			label: "Action",
			name: "",
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					const getEmail = tableMeta.rowData[2];
					return (
						<>
							<Stack direction="row" spacing={2}>
								<EditOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={() => {
										setEditFormData(tableMeta.rowData);
										setOpenEditForm(true);
									}}
								/>
								<DeleteOutlineOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={(e) => {
										setOpenDeleteModal(true);
										onDeleteBtnClick(e, getEmail);
									}}
								/>
							</Stack>
						</>
					);
				}
			}
		}
	];
};
export const processColumn = ({
	setEditFormData,
	setOpenEditForm,
	setOpenDeleteModal,
	onDeleteBtnClick,
	editFormData
}) => {
	return [
		{
			name: "",
			label: "",
			options: {
				display: false
			}
		},
		{
			name: "process",
			label: "Process",
			options: {
				filter: true,
				sort: true
			}
		},

		{
			label: "Action",
			name: "",
			options: {
				filter: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					const getId = tableMeta.rowData[0];

					return (
						<>
							<Stack direction="row" spacing={2}>
								<EditOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={() => {
										setEditFormData(tableMeta.rowData);
										setOpenEditForm(true);
									}}
									editFormData={editFormData}
								/>
								<DeleteOutlineOutlinedIcon
									style={{ cursor: "pointer" }}
									onClick={(e) => {
										setOpenDeleteModal(true);
										onDeleteBtnClick(e, getId);
									}}
								/>
							</Stack>
						</>
					);
				}
			}
		}
	];
};
