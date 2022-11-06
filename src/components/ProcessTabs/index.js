import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BasicTabs from '../../common/BasicTabs';
import { processesTabLists } from '../../common/Constants';
import { fetchSingleOrg } from '../../features/org/orgSlice';
import { fetchProcess } from '../../features/process/processSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { reset } from '../../features/usersFromCompany/usersFromCompanySlice';
import ProcessTable from './ProcessTable';

const index = () => {
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
      fetchProcess(
        companyId
          ? {
              token: userDetail.token,
              id: org.processes
            }
          : { token: userDetail.token }
      )
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
    <BasicTabs
      tabList={processesTabLists}
      categoryLists={processesTabLists.map((processTab) => {
        return (
          <ProcessTable
            filterValue={processTab}
            key={processTab}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        );
      })}
    />
  );
};

export default index;
