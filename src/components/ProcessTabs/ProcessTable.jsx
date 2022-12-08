import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { processColumn } from '../../common/tableHead';
import { createProcess, reset } from '../../features/process/processSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { filterProcessByBid } from '../../helpers/bidFilterHelpers';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
import Edit from './EditProcessForm';
import FormDialog from './ProcessReg';
import StageTab from './StageTab';

const ProcessTable = ({ filterValue, setOpenDeleteModal, openDeleteModal }) => {
  const dispatch = useDispatch();
  const { processList, isDeleting, isLoading, isDeleted, isSuccess } = useSelector(
    (state) => state.process
  );
  const [stageValue, setStageValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setStageValue(newValue);
  };
  const { org } = useSelector((state) => state.org);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [processDataList, setProcessDataList] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [filteredProcesses, setFilteredProcesses] = useState([]);
  const [processId, setProcessId] = useState('');
  const [open, setOpen] = useState(false);

  console.log(processList);
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setProcessId(getId);
  };
  const columns = processColumn();
  const resortProcesses = (sortedList, originalProcessList) => {
    if (!sortedList.length) return originalProcessList;

    const currentBidTypeAndStageRemoved = originalProcessList.filter(
      (item) => !sortedList.map((p) => p._id).includes(item._id)
    );
    return [...currentBidTypeAndStageRemoved, ...sortedList];
  };

  const onListSort = (dataList) => {
    const formState = {};
    const formStateWithToken = {
      ...formState,
      ID: processList[0]._id,
      previousProcesses: resortProcesses(dataList, processList[0].processes),
      add: false,
      token: userDetail.token
    };
    dispatch(createProcess(formStateWithToken));
    setFilteredProcesses(dataList);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setOpenDeleteModal(false);
      dispatch(
        showMessage({
          message: 'Process list updated successfully',
          variant: 'success'
        })
      );

      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (stageValue === 0) {
      setFilteredProcesses(filterProcessByBid(processList, filterValue, 'Preparation'));
    } else if (stageValue === 1) {
      setFilteredProcesses(filterProcessByBid(processList, filterValue, 'Painting'));
    } else if (stageValue === 2) {
      setFilteredProcesses(filterProcessByBid(processList, filterValue, 'Cleanup'));
    }
  }, [processList, filterValue, stageValue]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '0 0 20px 0'
        }}>
        <StageTab stage={stageValue} onTabChange={handleChange} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CustomButton variant='contained' onClick={() => setOpen(true)} sx={{ height: '47px' }}>
            Create
          </CustomButton>
        </Box>
      </Box>

      <DraggableDataTable
        initialDataList={
          filteredProcesses &&
          filteredProcesses.map((process) => {
            return {
              _id: process._id,
              stage: process.stage,
              description: process.description,
              bidType: process.bidType
            };
          })
        }
        isLoading={isLoading}
        columns={columns}
        dataList={processDataList}
        setDataList={setProcessDataList}
        title='Processes List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        onListSort={onListSort}
        draggable
      />

      <FormDialog
        open={open}
        setOpen={setOpen}
        stageType={stageValue}
        bidType={filterValue}
        filteredProcesses={filteredProcesses}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{
          ID: processList[0] && processList[0]._id,
          previousProcesses: processList[0] && processList[0].processes,
          add: false,
          token: userDetail.token,
          idToBeDeleted: processId
        }}
        deleteProcess
        modalTitle='Process'
        deleteMethod={createProcess}
      />
      <Edit
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
        bidType={filterValue}
        filteredProcesses={filteredProcesses}
      />
    </>
  );
};

export default ProcessTable;
