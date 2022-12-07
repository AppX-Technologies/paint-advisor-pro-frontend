import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { materialTabLists } from '../../common/Constants';
import TabsNavigation from '../../common/TabsNavigation';
import { fetchMaterial } from '../../features/materials/materialSlice';
import { fetchSingleOrg } from '../../features/org/orgSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { reset } from '../../features/usersFromCompany/usersFromCompanySlice';
import MaterialTable from './MaterialTable';

const Materials = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { org } = useSelector((state) => state.org);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isDeleted, materialList } = useSelector((state) => state.material);
  const { companyId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: 'Material Deleted successfully',
          variant: 'success',
          severity: 'info'
        })
      );
      setOpenDeleteModal(false);
      dispatch(reset());
    }
  }, [isDeleted]);

  useEffect(() => {
    dispatch(
      fetchMaterial({
        token: userDetail.token,
        id: companyId ? org.materials : undefined
      })
    );
  }, []);
  console.log(org, 'materials');
  useEffect(() => {
    dispatch(
      fetchSingleOrg({
        filter: {
          _id: companyId
        },
        token: userDetail.token
      })
    );
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsNavigation value={value} handleTabChange={handleChange} tabList={materialTabLists} />
      </Box>
      <div role='tabpanel' id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`}>
        <Box sx={{ p: 3 }}>
          <Typography>
            {value === 0 ? (
              <MaterialTable
                filterValue='Interior'
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ) : (
              <MaterialTable
                filterValue='Exterior'
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default Materials;
