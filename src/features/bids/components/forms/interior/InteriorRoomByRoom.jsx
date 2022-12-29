import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';
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
import ChoosePainterModal from '../../ChoosePainterModal';

const painterDetailFields = [
  {
    name: 'name',
    label: 'Name',
    icon: <DriveFileRenameOutlineIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  },

  {
    name: 'email',
    label: 'Email',
    icon: <EmailIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  },
  {
    name: 'proficiency',
    label: 'Proficiency',
    icon: <StarBorderIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  }
];

const PainterDetail = ({ painter }) => {
  return (
    <Box sx={{ padding: '5px' }}>
      <Grid
        container
        sx={{
          padding: '5px',
          border: '1px solid lightgray',
          borderRadius: '10px'
        }}>
        {painterDetailFields.map((field) => {
          return (
            <Grid xs={12} md={12} lg={6}>
              {field.icon}
              <span style={{ fontSize: '14px' }}>
                {field.label}:{' '}
                <span style={{ fontWeight: '300' }}>
                  {painter?.[field.name]}{' '}
                  {field.name === 'proficiency' && (
                    <Chip
                      color='success'
                      sx={{ height: '16px', cursor: 'pointer', ml: 2 }}
                      label='$521'
                      size='small'
                    />
                  )}
                </span>
              </span>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

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
  setEquipmentListToPick,
  labourDetailedMode,
  setLabourDetailedMode,
  choosePainterModalData,
  setChoosePainterModalData,
  selectedPainter,
  setselectedPainter
}) => {
  const [addRoom, setAddRoom] = useState(false);

  const [materialListSectionwise, setMaterialListSectionwise] = useState(null);
  const [labourListSectionwise, setLabourListSectionwise] = useState(null);
  const [currentAddMore, setCurentAddMore] = useState('');
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBeDeleted, setitemToBeDeleted] = useState(null);
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

  const handleOpenPainterChooseModal = () => {
    setChoosePainterModalData(selectedPainter);
  };
  const handleClosePainterChooseModal = () => {
    setChoosePainterModalData(null);
  };
  const handleSelectPainter = () => {
    setselectedPainter(choosePainterModalData);
    setChoosePainterModalData(null);
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
            <Box sx={{ marginTop: '30px' }}>
              <FormGroup sx={{ float: 'right' }}>
                <FormControlLabel
                  control={
                    <Switch
                      size='small'
                      checked={labourDetailedMode}
                      onChange={() => setLabourDetailedMode(!labourDetailedMode)}
                    />
                  }
                  label='Summarized Mode'
                />
              </FormGroup>
              {labourDetailedMode ? (
                <Box sx={{}}>
                  <Button
                    type='submit'
                    color='info'
                    variant='contained'
                    onClick={handleOpenPainterChooseModal}>
                    Click here to view painter
                  </Button>
                  <Box sx={{ marginTop: '20px' }}>
                    <Typography sx={{ fontSize: '300', ml: 1 }}>Selected Painters:</Typography>
                    <Grid container>
                      {selectedPainter?.painter?.map((painter) => {
                        return (
                          <Grid xs={12} md={6} lg={6}>
                            <PainterDetail painter={painter} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Box>
              ) : (
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
              )}
            </Box>
            <Grid container sx={{ p: 1, mt: 2 }}>
              {GLOBAL_PICKERLIST.map((globalPicker) => {
                return (
                  <Grid md={6} xs={12} sx={{ p: 1 }}>
                    <GlobalPickers
                      globalPickerStatsToView={globalPickerStatsToView}
                      setGlobalPickerStatsToView={setGlobalPickerStatsToView}
                      pickerTitle={globalPicker.title}
                      filterOption={globalPicker.filterOption}
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
      <ChoosePainterModal
        handleClosePainterChooseModal={handleClosePainterChooseModal}
        choosePainterModalData={choosePainterModalData}
        setChoosePainterModalData={setChoosePainterModalData}
        painterList={companyMadeByUsers}
        selectedPainter={selectedPainter?.painter}
        handleSelectPainter={handleSelectPainter}
      />
    </Box>
  );
};

export default InteriorRoomByRoom;
