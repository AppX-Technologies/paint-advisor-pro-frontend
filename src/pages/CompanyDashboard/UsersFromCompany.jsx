import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { companyUserColumns } from '../../common/tableHead';
import CustomButton from '../../components/Button';
import { DeleteModal } from '../../components/delete-model/DeleteModel';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {
  deleteUserByCompany,
  fetchUserMadeByCompany,
  reset
} from '../../features/usersFromCompany/usersFromCompanySlice';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

const UsersFromCompany = (props) => {
  const { getId } = props;
  const dispatch = useDispatch();
  const { companyMadeByUsers, isDeleting, isLoading, isDeleted } = useSelector(
    (state) => state.usersFromCompany
  );
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [emailId, setEmailId] = React.useState('');
  React.useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: 'User deleted successfully',
          variant: 'success'
        })
      );
      setOpenDeleteModal(false);
      if (userDetail.role === 'Org Admin' || userDetail.role === 'Admin') {
        dispatch(
          fetchUserMadeByCompany({
            token: userDetail.token,
            orgId: getId
          })
        );
      }
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

  // function DeleteModal() {
  // 	const handleClose = () => {
  // 		setOpenDeleteModal(false);
  // 	};
  // 	const handleDelete = () => {
  // 		dispatch(
  // 			deleteUserByCompany({
  // 				email: emailId,
  // 				token: JSON.parse(localStorage.getItem("user")).token
  // 			})
  // 		);
  // 	};

  // 	return (
  // 		<Dialog open={openDeleteModal} onClose={handleClose}>
  // 			<DialogTitle>
  // 				<Stack direction="row" spacing={2}>
  // 					<Typography variant="h6">Delete user</Typography>
  // 					{
  // 						<CircularProgress
  // 							color="primary"
  // 							size={25}
  // 							style={{ display: isDeleting ? "block" : "none" }}
  // 						/>
  // 					}
  // 				</Stack>
  // 			</DialogTitle>
  // 			<DialogContent>
  // 				<DialogContentText>
  // 					Are you sure you want to delete this user?
  // 				</DialogContentText>
  // 			</DialogContent>
  // 			<DialogActions>
  // 				<Button onClick={handleClose}>Cancel</Button>
  // 				<Button onClick={handleDelete} disabled={isDeleting}>
  // 					Delete
  // 				</Button>
  // 			</DialogActions>
  // 		</Dialog>
  // 	);
  // }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButton
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpen(true)}
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
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        deleteByEmail
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
