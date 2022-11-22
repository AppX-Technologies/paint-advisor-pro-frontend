import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { companyColumns } from '../../common/tableHead';
import { deleteOrg, fetchOrgs, reset } from '../../features/org/orgSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
import EditOrgForm from './EditOrgForm';
import FormDialog from './OrgRegisterForm';

const Companies = () => {
  const dispatch = useDispatch();
  const { orgList, isDeleting, isLoading, isDeleted } = useSelector((state) => state.org);
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchOrgs(userDetail.token));
  }, []);

  React.useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: 'Company deleted successfully',
          variant: 'success'
        })
      );
      setOpenDeleteModal(false);
      dispatch(fetchOrgs(userDetail.token));
      dispatch(reset());
    }
  }, [isDeleted]);

  // set email on click
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setUserId(getId);
  };
  const columns = companyColumns();

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
        initialDataList={orgList}
        isLoading={isLoading}
        columns={columns}
        title='Company List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        viewCompany
      />

      <FormDialog open={open} setOpen={setOpen} />
      <EditOrgForm
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{ id: userId, token: userDetail.token }}
        modalTitle='Company'
        deleteMethod={deleteOrg}
      />
    </>
  );
};

export default Companies;
