import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';
import AddRoomForm from './AddRoomForm';

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
            const height = room.roomHeight;
            const width = room.roomWidth;
            const length = room.roomLength;
            return (
              <Grid
                xs={3}
                md={3}
                m={1}
                sx={{ border: '1px solid lightgray', borderRadius: '10px', padding: '5px' }}>
                <Box>
                  <Tooltip title='Delete this room' placement='top'>
                    <HighlightOffIcon
                      fontSize='small'
                      sx={{ cursor: 'pointer', float: 'right' }}
                      style={{ fontSize: '15px' }}
                      color='primary'
                      onClick={() => handleDelete(room.roomName)}
                    />
                  </Tooltip>
                  <Tooltip title='Edit this room' placement='top'>
                    <BorderColorIcon
                      color='info'
                      fontSize='small'
                      sx={{ cursor: 'pointer', float: 'right', mr: 0.2 }}
                      style={{ fontSize: '15px' }}
                      onClick={() => setAddRoom(true)}
                    />
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <HomeIcon />
                  <Typography sx={{ fontSize: '12px', textAlign: 'left', marginTop: '5px' }}>
                    {room.roomName}
                  </Typography>
                </Box>
                <Divider />
                <Grid container spacing={2} ml={1} mt={1}>
                  {Object.keys(room)
                    .filter((name) => name === 'roomName' || name === 'doorNumber')
                    .map((i) => {
                      return (
                        <Grid xs={6} md={6}>
                          <Box>
                            <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>
                              {i === 'doorNumber' ? 'Dimensions' : 'Num of Door'}
                            </Typography>
                            <Chip
                              label={
                                <Typography
                                  sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                                  {i === 'doorNumber' ? (
                                    <>
                                      {length}x{width}x{height}
                                    </>
                                  ) : (
                                    room.doorNumber
                                  )}
                                </Typography>
                              }
                              size='small'
                            />
                          </Box>
                        </Grid>
                      );
                    })}

                  {/* <Grid xs={4} md={4}>
                <Box>
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Dimensions</Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        10x10x5
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid>
             
              <Grid xs={4} md={4}>
                <Box>
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Num of Doors</Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        3
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid>
              <Grid xs={4} md={4}>
                <Box>
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>
                    Num of Windows
                  </Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        2
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid> */}
                </Grid>
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
