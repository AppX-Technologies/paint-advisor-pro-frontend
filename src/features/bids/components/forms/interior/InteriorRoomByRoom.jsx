import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import MaterialsPickerCard from '../../../../../common/MaterialsPickerCard';
import RoomCard from '../../../../../common/RoomCard';
import Button from '../../../../../components/Button';
import { initialRoomState } from '../../../common/roomsInitialStats';
import MaterialsPicker from '../../MaterialsPicker';
import { DeleteItemModel } from '../DeleteModel';
import { findPaintableAndNonPaintableArea, findSameTypeOfWall } from '../formHelper';
import AddRoomForm from './AddRoomForm';

const InteriorRoomByRoom = ({
  roomStats,
  setRoomStats,
  allRoom,
  setAllRoom,
  openAddMoreDetails,
  setOpenAddMoreDetails,
  onRoomDetailsReset,
  wallStats,
  setWallStats,
  windowStats,
  setWindowStats,
  clearWallStats,
  doorsStats,
  setDoorStats,
  nonPaintableAreaStats,
  setNonPaintableAreaStats,
  openEditForm,
  setOpenEditForm,
  roomRelatedInfo
}) => {
  const [addRoom, setAddRoom] = useState(false);
  const [editRoom, setEditRoom] = useState(false);
  const [currentAddMore, setCurentAddMore] = useState('');
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBEDeleted, setItemToBeDeleted] = useState({
    _id: '',
    field: ''
  });

  const onCardDelete = (id) => {
    allRoom.splice(
      allRoom.findIndex((room) => room._id === id),
      1
    );
    setAllRoom([...allRoom]);
  };
  const onCardEdit = () => {
    setEditRoom(true);
  };

  const onSelectedRoomInfoChange = (value) => {
    setSelectedRoomInfo(value);
  };

  return (
    <Box>
      {/* Main Form Body  */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mt={2} mr={1}>
          Rooms({allRoom.length})
        </Typography>
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ mt: 2, height: '30px', minWidth: '40px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon sx={{ ml: 1 }} />}
            color='info'
            onClick={() => {
              setAddRoom(true);
              setRoomStats(cloneDeep(initialRoomState));
            }}
          />
        </Tooltip>
      </Box>
      <Box>
        <Grid container spacing={1} mt={2}>
          {allRoom.length !== 0 &&
            allRoom.map((room) => {
              return (
                <Grid xs={6} md={6} mt={1}>
                  <RoomCard
                    onSelectedRoomInfoChange={onSelectedRoomInfoChange}
                    completeRoomInfo={room}
                    setOpenDeleteModal={setOpenDeleteModal}
                    items={{
                      roomName: room.roomName,
                      WallDetail:
                        room.walls.length !== 0 ? findSameTypeOfWall(room.walls) : 'No Walls',
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
                    onCardEdit={onCardEdit}
                    setAddRoom={setAddRoom}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>

      {openDeleteModal && (
        <DeleteItemModel
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          roomRelatedInfo={roomStats[currentAddMore]}
          id={itemToBEDeleted._id}
          roomStats={roomStats}
          setRoomStats={setRoomStats}
          selectedRoomInfo={selectedRoomInfo}
          onCardDelete={onCardDelete}
          setSelectedRoomInfo={setSelectedRoomInfo}
        />
      )}

      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
        initialRoomState={initialRoomState}
        allRoom={allRoom}
        setAllRoom={setAllRoom}
        openAddMoreDetails={openAddMoreDetails}
        wallStats={wallStats}
        setWallStats={setWallStats}
        setOpenAddMoreDetails={setOpenAddMoreDetails}
        clearWallStats={clearWallStats}
        windowStats={windowStats}
        setWindowStats={setWindowStats}
        onRoomDetailsReset={onRoomDetailsReset}
        doorsStats={doorsStats}
        setDoorStats={setDoorStats}
        nonPaintableAreaStats={nonPaintableAreaStats}
        setNonPaintableAreaStats={setNonPaintableAreaStats}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        roomRelatedInfo={roomRelatedInfo}
        selectedRoomInfo={selectedRoomInfo}
        onSelectedRoomInfoChange={onSelectedRoomInfoChange}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        currentAddMore={currentAddMore}
        itemToBEDeleted={itemToBEDeleted}
        setItemToBeDeleted={setItemToBeDeleted}
        setCurentAddMore={setCurentAddMore}
      />
      <MaterialsPicker />
    </Box>
  );
};

export default InteriorRoomByRoom;
