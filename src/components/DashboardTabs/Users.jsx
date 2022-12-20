import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { userColumn } from '../../common/tableHead';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { deleteUser, fetchUsers, reset } from '../../features/users/userSlice';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
import EditUserForm from './EditUserForm';
import CreateUserForm from './UserRegisterForm';

const Users = () => {
  const [userRegistrationAndEditStats, setUserRegistrationAndEditStats] = useState(null);
  const { userList, isDeleting, isLoading, isDeleted } = useSelector((state) => state.user);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [emailId, setEmailId] = React.useState('');

  const dispatch = useDispatch();
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
  console.log(userList, 'userList');
  // set email on click
  const onDeleteBtnClick = (e, email) => {
    e.stopPropagation();
    setEmailId(email);
  };
  const columns = userColumn();

  const onUserFormClose = () => {
    setUserRegistrationAndEditStats(null);
  };

  return (
    <>
      <Box
        className='abcdefgh'
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
        <CustomButton
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() => setUserRegistrationAndEditStats({})}
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
        setProcessRegistrationAndEditStats={setUserRegistrationAndEditStats}
        isLoading={isLoading}
        columns={columns}
        title='Users List'
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        deleteByEmail
      />

      <CreateUserForm
        userRegistrationAndEditStats={userRegistrationAndEditStats}
        setUserRegistrationAndEditStats={setUserRegistrationAndEditStats}
        onUserFormClose={onUserFormClose}
      />
      <EditUserForm
        userRegistrationAndEditStats={userRegistrationAndEditStats}
        setUserRegistrationAndEditStats={setUserRegistrationAndEditStats}
        onUserFormClose={onUserFormClose}
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
