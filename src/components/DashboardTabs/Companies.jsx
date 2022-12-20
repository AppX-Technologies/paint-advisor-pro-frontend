import { Box } from '@mui/material';
import React, { useState } from 'react';
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
  const [companiesRegistrationAndEditStats, setCompaniesRegistrationAndEditStats] = useState(null);
  const { orgList, isDeleting, isLoading, isDeleted } = useSelector((state) => state.org);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [userId, setUserId] = React.useState('');

  const dispatch = useDispatch();
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

  const onCompanyFormClose = () => {
    setCompaniesRegistrationAndEditStats(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButton
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() => setCompaniesRegistrationAndEditStats({})}
          disabled={isLoading}>
          Create
        </CustomButton>
      </Box>

      <DraggableDataTable
        initialDataList={orgList}
        isLoading={isLoading}
        columns={columns}
        setProcessRegistrationAndEditStats={setCompaniesRegistrationAndEditStats}
        title='Company List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        viewCompany
      />

      <FormDialog
        companiesRegistrationAndEditStats={companiesRegistrationAndEditStats}
        setCompaniesRegistrationAndEditStats={setCompaniesRegistrationAndEditStats}
        onCompanyFormClose={onCompanyFormClose}
      />
      <EditOrgForm
        companiesRegistrationAndEditStats={companiesRegistrationAndEditStats}
        setCompaniesRegistrationAndEditStats={setCompaniesRegistrationAndEditStats}
        onCompanyFormClose={onCompanyFormClose}
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
