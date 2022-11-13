import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';
import AddRoomForm from './AddRoomForm';
import { findSameTypeOfWall } from '../formHelper';
import Card from '../../../../../common/Card';

const InteriorManByMan = ({ roomStats, setRoomStats, allRoom, setAllRoom }) => {
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
            const height = '12';
            const width = '10';
            const Dimension = height.concat('x', width);
            return (
              <Grid xs={3} md={3} m={1}>
                <Card items={{ Dimensions: Dimension }} title={room.roomName} />
              </Grid>
            );
          })}
          {/* <Box sx={{ display: 'flex' }}>
               
              </Box> */}
        </Grid>
      </Box>
      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
        allRoom={allRoom}
        setAllRoom={setAllRoom}
      />
    </Box>
  );
};

export default InteriorManByMan;
