import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { materialColumn } from '../../common/tableHead';
import { createMaterial, reset } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { filterMaterialByBid } from '../../helpers/bidFilterHelpers';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
// import Edit from './EditPaintForm';
import FormDialog from './MaterialReg';

const MaterialTable = ({ filterValue, setOpenDeleteModal, openDeleteModal }) => {
  const [materialRegistrationAndEditStats, setMaterialRegistrationAndEditStats] = useState(null);
  const dispatch = useDispatch();
  const { materialList, isDeleting, isLoading, isSuccess } = useSelector((state) => state.material);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [materialDataList, setMaterialDataList] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [materialId, setMateriaId] = useState('');
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setMateriaId(getId);
  };
  const columns = materialColumn();

  const onMaterialFormClose = () => {
    setMaterialRegistrationAndEditStats(null);
  };
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
    dispatch(createMaterial(formStateWithToken));
    setFilteredMaterials(dataList);
  };

  useEffect(() => {
    if (isSuccess) {
      onMaterialFormClose();
      setOpenDeleteModal(false);
      dispatch(
        showMessage({
          message: 'Material list updated successfully',
          variant: 'success'
        })
      );

      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    setFilteredMaterials(filterMaterialByBid(materialList, filterValue));
  }, [filterValue, materialList]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButton
          variant='contained'
          sx={{ mb: 2 }}
          onClick={() =>
            setMaterialRegistrationAndEditStats({
              bidType: filterValue,
              appliesTo: [],
              unit: '',
              unitPrice: ''
            })
          }
          disabled={isLoading}>
          Create
        </CustomButton>
      </Box>
      <DraggableDataTable
        initialDataList={
          [] &&
          [].map((material) => {
            return {
              _id: material._id,
              description: material.description,
              unit: material.unit,
              unitPrice: material.unitPrice,
              bidType: material.bidType,
              appliesTo: material?.appliesTo
            };
          })
        }
        setProcessRegistrationAndEditStats={setMaterialRegistrationAndEditStats}
        isLoading={isLoading}
        columns={columns}
        dataList={materialDataList}
        setDataList={setMaterialDataList}
        title='Materials List'
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        onListSort={onListSort}
        draggable={false}
      />
      <FormDialog
        filteredMaterials={filteredMaterials}
        materialRegistrationAndEditStats={materialRegistrationAndEditStats}
        setMaterialRegistrationAndEditStats={setMaterialRegistrationAndEditStats}
        onMaterialFormClose={onMaterialFormClose}
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
        modalTitle='Material'
        deleteMethod={createMaterial}
      />

      {/* <Edit
        filteredMaterials={filteredMaterials}
        materialRegistrationAndEditStats={materialRegistrationAndEditStats}
        setMaterialRegistrationAndEditStats={setMaterialRegistrationAndEditStats}
        onMaterialFormClose={onMaterialFormClose}
      /> */}
    </>
  );
};

export default MaterialTable;
