import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';
import AddRoomForm from './AddRoomForm';
import { findPaintableAndNonPaintableArea, findSameTypeOfWall } from '../formHelper';
import RoomCard from '../../../../../common/RoomCard';

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
  clearWallStats
}) => {
  const [addRoom, setAddRoom] = useState(false);
  const [editRoom, setEditRoom] = useState(false);
  const onCardDelete = (name) => {
    allRoom.splice(
      allRoom.findIndex((room) => room.roomName === name),
      1
    );
    setAllRoom([...allRoom]);
  };
  const onCardEdit = (name) => {
    setEditRoom(true);
    console.log(name, editRoom);
  };
  return (
    <Box>
      {/* Main Form Body  */}
      <Typography mt={2}>Rooms({allRoom.length})</Typography>
      <Box>
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ marginTop: '10px', height: '30px', minWidth: '40px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon sx={{ ml: 1 }} />}
            color='info'
            onClick={() => setAddRoom(true)}
          />
        </Tooltip>
        <Grid container spacing={1} mt={2}>
          {allRoom.length !== 0 &&
            allRoom.map((room) => {
              return (
                <Grid xs={6} md={6} mt={1}>
                  <RoomCard
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
                        findPaintableAndNonPaintableArea([...room.walls, ...room.windows])
                          .nonPaintable
                      } sq.feet`
                    }}
                    title={room.roomName}
                    onCardDelete={onCardDelete}
                    onCardEdit={onCardEdit}
                    setAddRoom={setAddRoom}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {editRoom && (
        <AddRoomForm
          open={addRoom}
          setOpen={setAddRoom}
          roomStats={roomStats}
          setRoomStats={setRoomStats}
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
        />
      )}

      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
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
      />
    </Box>
  );
};

export default InteriorRoomByRoom;
