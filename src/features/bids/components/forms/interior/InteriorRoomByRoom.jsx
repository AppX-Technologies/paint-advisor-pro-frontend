import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';
import AddRoomForm from './AddRoomForm';
import Card from '../../../../../common/Card';
import { findSameTypeOfWall } from '../formHelper';

const InteriorRoomByRoom = ({
  roomStats,
  setRoomStats,
  allRoom,
  setAllRoom,
  addWall,
  setAddWall,
  onAddWallsChange,
  wallStats,
  setWallStats,
  windowStats,
  setWindowStats
}) => {
  const [addRoom, setAddRoom] = useState(false);

  const handleDelete = (name) => {
    setAllRoom(allRoom.filter((room) => room.roomName !== name));
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
          {allRoom.map((room) => {
            return (
              <Card
                items={{
                  PaintWall: room.paintWall ? 'Yes' : 'No',
                  WallNumber: room.walls.length,
                  WallDetails: findSameTypeOfWall(room.walls)
                }}
                title={room.roomName}
              />
            );
          })}
        </Grid>
      </Box>
      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
        allRoom={allRoom}
        setAllRoom={setAllRoom}
        addWall={addWall}
        wallStats={wallStats}
        setWallStats={setWallStats}
        setAddWall={setAddWall}
      />
    </Box>
  );
};

export default InteriorRoomByRoom;
