import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoomCard from '../../../../../common/RoomCard';
import Button from '../../../../../components/Button';
import { GLOBAL_PICKERLIST, ROLE_PAINTER } from '../../../../../helpers/contants';
import { isCompanyAdmin, isSystemUser } from '../../../../../helpers/roles';
import { authSelector } from '../../../../auth/authSlice';
import { fetchMaterial } from '../../../../materials/materialSlice';
import { fetchUserMadeByCompany } from '../../../../usersFromCompany/usersFromCompanySlice';
import { initialRoomState } from '../../../common/roomsInitialStats';
import {
  setLabourAccordingToSection,
  setMaterialsAccordingToSection
} from '../../../helpers/generalHepers';
import GlobalPickers from '../../GlobalPickers';
import Picker from '../../Picker';
import { DeleteItemModel } from '../DeleteModel';
import { findPaintableAndNonPaintableArea, findSameTypeOfWall } from '../formHelper';
import AddRoomForm from './AddRoomForm';

const InteriorRoomByRoom = ({
  roomFormValue,
  setRoomFormValue,
  initialBidInfo,
  currentClientInfo,
  openAddMoreDetails,
  setOpenAddMoreDetails,
  onRoomDetailsReset,
  allSectionsInfoOfARoom,
  setCurrentClientInfo,
  materialListToPick,
  setMaterialListToPick,
  equipmentListToPick,
  setEquipmentListToPick
}) => {
  const [addRoom, setAddRoom] = useState(false);

  const [materialListSectionwise, setMaterialListSectionwise] = useState(null);
  const [labourListSectionwise, setLabourListSectionwise] = useState(null);
  const [currentAddMore, setCurentAddMore] = useState('');
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBeDeleted, setitemToBeDeleted] = useState(null);
  const [expandGlobalPickers, setExpandGlobalPickers] = useState({
    materials: true,
    equipments: true
  });
  const [globalPickerStatsToView, setGlobalPickerStatsToView] = useState({
    materials: [],
    equipments: []
  });

  const { user } = useSelector(authSelector);
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const { org } = useSelector((state) => state.org);
  const [orgId] = useState(isSystemUser(user) ? companyId : user.organization._id);
  const { materialList } = useSelector((state) => state.material);
  const { equipmentList } = useSelector((state) => state.equipment);
  const { companyMadeByUsers } = useSelector((state) => state.usersFromCompany);

  const onSelectedRoomInfoChange = (value) => {
    setSelectedRoomInfo(value);
  };

  useEffect(() => {
    setMaterialListSectionwise(setMaterialsAccordingToSection(materialList));
  }, [materialList]);

  useEffect(() => {
    setLabourListSectionwise(setLabourAccordingToSection(companyMadeByUsers));
  }, [companyMadeByUsers]);

  useEffect(() => {
    dispatch(
      fetchMaterial({
        token: user.token,
        id: companyId ? org.materials : undefined
      })
    );
  }, []);
  useEffect(() => {
    if (isSystemUser(user) || isCompanyAdmin(user)) {
      dispatch(
        fetchUserMadeByCompany({
          token: user.token,
          orgId,
          filterValue: { role: ROLE_PAINTER }
        })
      );
    }
  }, []);

  return (
    <Box>
      {/* Main Form Body  */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mt={2} mr={1}>
          Rooms({currentClientInfo?.bid?.rooms.length})
        </Typography>
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ mt: 2, height: '30px', minWidth: '40px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon sx={{ ml: 1 }} />}
            color='info'
            onClick={() => {
              setAddRoom(true);
              setRoomFormValue(cloneDeep(initialRoomState));
            }}
          />
        </Tooltip>
      </Box>
      <Box>
        <Grid container spacing={1} mt={2}>
          {currentClientInfo &&
            currentClientInfo?.bid?.rooms.length !== 0 &&
            currentClientInfo?.bid?.rooms.map((room) => {
              return (
                <Grid xs={6} md={6} mt={1}>
                  <RoomCard
                    onSelectedRoomInfoChange={onSelectedRoomInfoChange}
                    completeRoomInfo={room}
                    setOpenDeleteModal={setOpenDeleteModal}
                    items={{
                      roomName: room.roomName,
                      WallDetail:
                        room?.walls?.length !== 0 ? findSameTypeOfWall(room.walls) : 'No Walls',
                      WindowDetail:
                        room.windows.length !== 0 ? findSameTypeOfWall(room.windows) : 'No Windows',
                      PaintableArea: `${
                        findPaintableAndNonPaintableArea([...room.walls, ...room.windows]).paintable
                      } sq.feet`,
                      NonPaintableArea: `${
                        findPaintableAndNonPaintableArea([...room.windows]).nonPaintable
                      } sq.feet`
                    }}
                    title={room.roomName}
                    setAddRoom={setAddRoom}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>

      {openDeleteModal && (
        <DeleteItemModel
          onSelectedRoomInfoChange={onSelectedRoomInfoChange}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          itemToBeDeleted={itemToBeDeleted}
          roomFormValue={roomFormValue}
          setRoomFormValue={setRoomFormValue}
          selectedRoomInfo={selectedRoomInfo}
          setSelectedRoomInfo={setSelectedRoomInfo}
          setCurrentClientInfo={setCurrentClientInfo}
          currentClientInfo={currentClientInfo}
          setitemToBeDeleted={setitemToBeDeleted}
        />
      )}

      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomFormValue={roomFormValue}
        setRoomFormValue={setRoomFormValue}
        currentClientInfo={currentClientInfo}
        openAddMoreDetails={openAddMoreDetails}
        setOpenAddMoreDetails={setOpenAddMoreDetails}
        onRoomDetailsReset={onRoomDetailsReset}
        allSectionsInfoOfARoom={allSectionsInfoOfARoom}
        selectedRoomInfo={selectedRoomInfo}
        onSelectedRoomInfoChange={onSelectedRoomInfoChange}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        currentAddMore={currentAddMore}
        itemToBeDeleted={itemToBeDeleted}
        setitemToBeDeleted={setitemToBeDeleted}
        setCurentAddMore={setCurentAddMore}
        setCurrentClientInfo={setCurrentClientInfo}
      />
      {initialBidInfo.isMaterialProvidedByCustomer === 'No' &&
        currentClientInfo?.bid?.rooms.length !== 0 && (
          <>
            <Picker
              pickerTitle='Paints'
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
              pickerList={materialList}
              informationToRender={materialListSectionwise}
              filterOption='description'
              secondaryValuesToRender={['unit', 'unitPrice']}
              filteredPickerList={materialList && materialList[0] && materialList[0]?.materials}
            />
            <Picker
              pickerTitle='Labours'
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
              pickerList={companyMadeByUsers}
              informationToRender={labourListSectionwise}
              filterOption='name'
              secondaryValuesToRender={['proficiency']}
              showPrimaryAutocomplete
              filteredPickerList={companyMadeByUsers}
            />
            <Grid container sx={{ p: 1, mt: 2 }}>
              {GLOBAL_PICKERLIST.map((globalPicker) => {
                return (
                  <Grid md={6} xs={12} sx={{ p: 1 }}>
                    <GlobalPickers
                      currentClientInfo={currentClientInfo}
                      globalPickerStatsToView={globalPickerStatsToView}
                      setGlobalPickerStatsToView={setGlobalPickerStatsToView}
                      pickerTitle={globalPicker.title}
                      filterOption={globalPicker.filterOption}
                      expandGlobalPickers={expandGlobalPickers}
                      setExpandGlobalPickers={setExpandGlobalPickers}
                      informationToRender={
                        globalPicker.title === 'Materials'
                          ? equipmentList &&
                            equipmentList[0] &&
                            equipmentList[0]?.equipments.filter(
                              (equipment) => !equipment.isRentable
                            )
                          : equipmentList &&
                            equipmentList[0] &&
                            equipmentList[0]?.equipments.filter((equipment) => equipment.isRentable)
                      }
                      secondaryValuesToRender={globalPicker.secondaryValuesToRender}
                      listOfItems={
                        globalPicker.title === 'Materials'
                          ? materialListToPick
                          : equipmentListToPick
                      }
                      setListOfItems={
                        globalPicker.title === 'Materials'
                          ? setMaterialListToPick
                          : setEquipmentListToPick
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
    </Box>
  );
};

export default InteriorRoomByRoom;
