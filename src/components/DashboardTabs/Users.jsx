import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CustomButton from "../Button";
import CreateUserForm from "./UserRegisterForm";
import EditUserForm from "./EditUserForm";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteUser, fetchUsers, reset } from "../../features/users/userSlice";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import DataTable from "../../Common/DataTable";
import { userColumn, usersColumns } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";

const Users = () => {
  const dispatch = useDispatch();
  const { userList, isDeleting, isLoading, isDeleted } = useSelector(
    (state) => state.user
  );
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [emailId, setEmailId] = React.useState("");
  const [options, setOptions] = React.useState({});
  React.useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: "User deleted successfully",
          variant: "success",
        })
      );
      setOpenDeleteModal(false);
      dispatch(fetchUsers(userDetail.token));
      dispatch(reset());
    }
  }, [isDeleted]);

  // set email on click
  const onDeleteBtnClick = (e, email) => {
    e.stopPropagation();
    setEmailId(email);
  };
  const columns = userColumn({
    setEditFormData,
    setOpenEditForm,
    setOpenDeleteModal,
    onDeleteBtnClick,
    editFormData,
  });
  function DeleteModal() {
    const handleClose = () => {
      setOpenDeleteModal(false);
    };
    const handleDelete = () => {
      dispatch(deleteUser({ email: emailId, token: userDetail.token }));
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

  useEffect(() => {
    setOptions(tableOptions(isLoading, userList));
  }, []);
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
        datalist={userList.map((userData) => {
          return [userData._id, userData.name, userData.email, userData.phone];
        })}
        columns={columns}
        options={options}
        title={"User List"}
      />

      <CreateUserForm open={open} setOpen={setOpen} />
      <EditUserForm
        editFormData={editFormData}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
      />
      <DeleteModal />
    </>
  );
};

export default Users;
