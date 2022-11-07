import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { processesTabLists } from '../../common/Constants';
import { fetchSingleOrg } from '../../features/org/orgSlice';
import { fetchProcess } from '../../features/process/processSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { reset } from '../../features/usersFromCompany/usersFromCompanySlice';
import ProcessTable from './ProcessTable';

const Processes = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { org } = useSelector((state) => state.org);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isDeleted } = useSelector((state) => state.process);
  const { companyId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: 'Process Deleted successfully',
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
      fetchProcess({
        token: userDetail.token,
        id: companyId ? org.processes : undefined
      })
    );
  }, []);
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
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          {processesTabLists.map((processTab) => {
            return <Tab label={processTab} key={processTab} />;
          })}
        </Tabs>
      </Box>
      <div role='tabpanel' id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`}>
        <Box sx={{ p: 3 }}>
          <Typography>
            {value === 0 ? (
              <ProcessTable
                filterValue='Interior'
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ) : (
              <ProcessTable
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

export default Processes;
