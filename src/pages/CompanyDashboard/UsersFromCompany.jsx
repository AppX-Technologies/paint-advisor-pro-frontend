import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { companyUserColumns } from '../../common/tableHead';
import CustomButton from '../../components/Button';
import { DeleteModal } from '../../components/delete-model/DeleteModel';
import { authSelector } from '../../features/auth/authSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {
  deleteUserByCompany,
  fetchUserMadeByCompany,
  reset
} from '../../features/usersFromCompany/usersFromCompanySlice';
import { isCompanyAdmin, isSystemUser } from '../../helpers/roles';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

const UsersFromCompany = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { companyId } = useParams();
  const { companyMadeByUsers, isDeleting, isLoading, isDeleted } = useSelector(
    (state) => state.usersFromCompany
  );
  const [userRegistrationAndEditStats, setUserRegistrationAndEditStats] = useState(null);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [emailId, setEmailId] = React.useState('');
  const [orgId] = useState(isSystemUser(user) ? companyId : user.organization._id);

  useEffect(() => {
    if (isSystemUser(user) || isCompanyAdmin(user)) {
      dispatch(
        fetchUserMadeByCompany({
          token: user.token,
          orgId
        })
      );
    }
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
      dispatch(reset());
    }
  }, [isDeleted]);

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

  const onUserFormClose = () => {
    setUserRegistrationAndEditStats(null);
  };

  return (
    <>
      <Box sx={{ p: '24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CustomButton
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setUserRegistrationAndEditStats({});
            }}
            disabled={isLoading}>
            Create
          </CustomButton>
        </Box>

        <DraggableDataTable
          initialDataList={companyMadeByUsers.map((org) => {
            return {
              _id: org._id,
              name: org.name,
              email: org.email,
              phone: org.phone,
              role: org.role,
              proficiency: org.proficiency,
              organization: org.organization ? org.organization.name : '',
              status: org.active
            };
          })}
          isLoading={isLoading}
          columns={columns}
          title='Users List'
          setProcessRegistrationAndEditStats={setUserRegistrationAndEditStats}
          setOpenDeleteModal={setOpenDeleteModal}
          onDeleteBtnClick={onDeleteBtnClick}
          deleteByEmail
        />
      </Box>
      <CreateUserForm
        orgId={orgId}
        userRegistrationAndEditStats={userRegistrationAndEditStats}
        setUserRegistrationAndEditStats={setUserRegistrationAndEditStats}
        onUserFormClose={onUserFormClose}
      />

      <EditUserForm
        orgId={orgId}
        userRegistrationAndEditStats={userRegistrationAndEditStats}
        setUserRegistrationAndEditStats={setUserRegistrationAndEditStats}
        onUserFormClose={onUserFormClose}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{
          email: emailId,
          token: JSON.parse(localStorage.getItem('user')).token
        }}
        modalTitle='User'
        deleteMethod={deleteUserByCompany}
      />
    </>
  );
};

export default UsersFromCompany;
