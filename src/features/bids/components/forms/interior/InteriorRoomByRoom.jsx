import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
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
  initialBidInfo,
  currentClientInfo,
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
  roomRelatedInfo,
  setCurrentClientInfo
}) => {
  const [addRoom, setAddRoom] = useState(false);
  const [editRoom, setEditRoom] = useState(false);
  const [currentAddMore, setCurentAddMore] = useState('');
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBeDeleted, setitemToBeDeleted] = useState(null);

  const onSelectedRoomInfoChange = (value) => {
    setSelectedRoomInfo(value);
  };

  const onCardDelete = (roomName) => {
    setCurrentClientInfo({
      ...currentClientInfo,
      bid: {
        ...currentClientInfo.bid,
        rooms: [...currentClientInfo.bid.rooms.filter((room) => room.roomName !== roomName)]
      }
    });
    onSelectedRoomInfoChange(null);
  };
  const onCardEdit = () => {
    setEditRoom(true);
  };

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
              setRoomStats(cloneDeep(initialRoomState));
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
          itemToBeDeleted={itemToBeDeleted}
          roomStats={roomStats}
          setRoomStats={setRoomStats}
          selectedRoomInfo={selectedRoomInfo}
          onCardDelete={onCardDelete}
          setSelectedRoomInfo={setSelectedRoomInfo}
          setCurrentClientInfo={setCurrentClientInfo}
          currentClientInfo={currentClientInfo}
          setitemToBeDeleted={setitemToBeDeleted}
        />
      )}

      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
        initialRoomState={initialRoomState}
        currentClientInfo={currentClientInfo}
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
        itemToBeDeleted={itemToBeDeleted}
        setitemToBeDeleted={setitemToBeDeleted}
        setCurentAddMore={setCurentAddMore}
        setCurrentClientInfo={setCurrentClientInfo}
      />
      {initialBidInfo.isMaterialProvidedByCustomer === 'No' &&
        currentClientInfo?.bid?.rooms.length !== 0 && (
          <MaterialsPicker currentClientInfo={currentClientInfo} />
        )}
    </Box>
  );
};

export default InteriorRoomByRoom;
