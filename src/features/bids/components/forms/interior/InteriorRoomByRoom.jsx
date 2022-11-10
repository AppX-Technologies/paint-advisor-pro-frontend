import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Chip, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';
import AddRoomForm from './AddRoomForm';

const InteriorRoomByRoom = ({ roomStats, setRoomStats }) => {
  const [addRoom, setAddRoom] = useState(false);

  return (
    <Box>
      {/* Main Form Body  */}
<Typography mt={2}>Add Room</Typography>
      <Box>
        
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ marginTop: '10px', height: '30px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon  />}
            color='info'
            onClick={() => setAddRoom(true)}
          />
        </Tooltip>
        <Grid spacing={2} mt={2}>
          <Grid
            xs={3}
            md={3}
            sx={{ border: '1px solid gray', borderRadius: '10px', padding: '5px' }}>
            <Box>
              <Tooltip title='Delete this room' placement='top'>
                <HighlightOffIcon
                  fontSize='small'
                  sx={{ cursor: 'pointer', float: 'right' }}
                  style={{ fontSize: '15px' }}
                  color='primary'
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
                Bed Room
              </Typography>
            </Box>{' '}
            <Grid container spacing={2} ml={1} mt={1} >
              <Grid xs={4} md={4}>
                <Box >
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
                <Box >
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Coating</Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        2
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid>
              <Grid xs={4} md={4}>
                <Box >
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Paint Trim</Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        Yes
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid>
              <Grid xs={4} md={4}>
                <Box >
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Doors</Typography>
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
                <Box >
                  <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>Windows</Typography>
                  <Chip
                    label={
                      <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                        2
                      </Typography>
                    }
                    size='small'
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/* <Box sx={{ display: 'flex' }}>
               
              </Box> */}
        </Grid>
      </Box>
      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
      />
    </Box>
  );
};

export default InteriorRoomByRoom;
