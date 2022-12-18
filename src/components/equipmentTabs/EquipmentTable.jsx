import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableDataTable } from '../../common/DraggableDataTable';
import { equipmentColumn } from '../../common/tableHead';
import { createEquipment, reset } from '../../features/equipments/equipmentSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { filterEquipmentByBid } from '../../helpers/bidFilterHelpers';
import CustomButton from '../Button';
import { DeleteModal } from '../delete-model/DeleteModel';
import Edit from './EditEquipmentForm';
import FormDialog from './EquipmentReg';

const columns = equipmentColumn();

const EquipmentTable = ({ filterValue, setOpenDeleteModal, openDeleteModal }) => {
  const dispatch = useDispatch();
  const { equipmentList, isDeleting, isLoading, isSuccess } = useSelector(
    (state) => state.equipment
  );
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [equipmentDataList, setEquipmentDataList] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [equipmentId, setEquipmentId] = useState('');
  const [open, setOpen] = useState(false);
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setEquipmentId(getId);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setOpenDeleteModal(false);
      dispatch(
        showMessage({
          message: 'Equipment list updated successfully',
          variant: 'success'
        })
      );

      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    setFilteredEquipment(filterEquipmentByBid(equipmentList, filterValue));
  }, [filterValue, equipmentList]);

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
          filteredEquipment &&
          filteredEquipment.map((equipment) => {
            return {
              _id: equipment._id,
              description: equipment.description,
              bidType: equipment.bidType,
              appliesTo: equipment?.appliesTo
            };
          })
        }
        isLoading={isLoading}
        columns={columns}
        dataList={equipmentDataList}
        setDataList={setEquipmentDataList}
        title='Equipment List'
        setEditFormData={setEditFormData}
        setOpenEditForm={setOpenEditForm}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteBtnClick={onDeleteBtnClick}
        // onListSort={onListSort}
        draggable={false}
      />
      <FormDialog
        open={open}
        setOpen={setOpen}
        bidType={filterValue}
        filteredEquipment={filteredEquipment}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        isDeleting={isDeleting}
        payloadWithUserToken={{
          ID: equipmentList[0] && equipmentList[0]._id,
          previousEquipments: equipmentList[0] && equipmentList[0].equipments,
          add: false,
          token: userDetail.token,
          idToBeDeleted: equipmentId
        }}
        modalTitle='Equipments'
        deleteMethod={createEquipment}
      />

      <Edit
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
        bidType={filterValue}
        filteredEquipment={filteredEquipment}
      />
    </>
  );
};

export default EquipmentTable;
