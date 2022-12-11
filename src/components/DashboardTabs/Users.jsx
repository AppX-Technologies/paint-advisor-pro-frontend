import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from '../Button';
import CreateUserForm from './UserRegisterForm';
import EditUserForm from './EditUserForm';
import { deleteUser, fetchUsers, reset } from '../../features/users/userSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { userColumn } from '../../common/tableHead';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { DeleteModal } from '../delete-model/DeleteModel';

const Users = () => {
  const dispatch = useDispatch();
  const { userList, isDeleting, isLoading, isDeleted } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [emailId, setEmailId] = React.useState('');
  React.useEffect(() => {
    dispatch(fetchUsers(userDetail.token));
  }, []);

  React.useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: 'User deleted successfully',
          variant: 'success'
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
  const columns = userColumn();



  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButton
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() => setOpen(true)}
          disabled={isLoading}>
          Create
        </CustomButton>
      </Box>

      <DraggableDataTable
        initialDataList={userList.map((userData) => {
          return {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          };
        })}
        isLoading={isLoading}
        columns={columns}
        title='Users List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        deleteByEmail
      />

      <CreateUserForm open={open} setOpen={setOpen} />
      <EditUserForm
        editFormData={editFormData}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{ email: emailId, token: userDetail.token }}
        modalTitle='User'
        deleteMethod={deleteUser}
      />
    </>
  );
};

export default Users;
