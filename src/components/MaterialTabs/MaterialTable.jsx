import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { materialColumn, processColumn } from '../../common/tableHead';
import { createMaterial, deleteMaterial } from '../../features/materials/materialSlice';
import { createProcess, reset } from '../../features/process/processSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { filterMaterialByBid } from '../../helpers/bidFilterHelpers';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
import Edit from './EditMaterialForm';
import FormDialog from './MaterialReg';

const ProcessTable = ({ filterValue, setOpenDeleteModal, openDeleteModal }) => {
  const dispatch = useDispatch();
  const { materialList, isDeleting, isLoading, isDeleted, isSuccess } = useSelector(
    (state) => state.material
  );

  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [materialDataList, setMaterialDataList] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [materialId, setMateriaId] = useState('');
  const [open, setOpen] = useState(false);
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setMateriaId(getId);
  };
  const columns = materialColumn();

  const resortMaterials = (sortedList, originalMaterialList) => {
    if (!sortedList.length) return originalMaterialList;

    const currentBidTypeAndStageRemoved = originalMaterialList.filter(
      (item) => !sortedList.map((p) => p._id).includes(item._id)
    );
    return [...currentBidTypeAndStageRemoved, ...sortedList];
  };

  const onListSort = (dataList) => {
    const formState = {};
    const formStateWithToken = {
      ...formState,
      ID: materialList[0]._id,
      previousMaterials: resortMaterials(dataList, materialList[0].materials),
      add: false,
      token: userDetail.token
    };
    dispatch(createProcess(formStateWithToken));
    setFilteredMaterials(dataList);
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
    setFilteredMaterials(filterMaterialByBid(materialList, filterValue));
  }, [filterValue]);

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
        initialDataList={
          filteredMaterials &&
          filteredMaterials.map((material) => {
            return {
              _id: material._id,
              materialName: material.materialName,
              unit: material.unit,
              pricePerUnit: material.pricePerUnit,
              bidType: material.bidType
            };
          })
        }
        isLoading={isLoading}
        columns={columns}
        dataList={materialDataList}
        setDataList={setMaterialDataList}
        title='Materials List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        onListSort={onListSort}
        draggable={false}
      />

      <FormDialog
        open={open}
        setOpen={setOpen}
        bidType={filterValue}
        filteredMaterials={filteredMaterials}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{
          ID: materialList[0] && materialList[0]._id,
          previousMaterials: materialList[0] && materialList[0].materials,
          add: false,
          token: userDetail.token,
          idToBeDeleted: materialId
        }}
        deleteProcess
        modalTitle='Material'
        deleteMethod={createMaterial}
      />
      <Edit
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
        bidType={filterValue}
        filteredMaterials={filteredMaterials}
      />
    </>
  );
};

export default ProcessTable;
