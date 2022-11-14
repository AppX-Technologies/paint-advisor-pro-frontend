import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  Slide,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import Button from '../../../../../components/Button';

const AddMoreDetails = ({
  roomStat,
  setRoomStat,
  setAddWall,
  addWall,
  title,
  wallStats,
  setWallStats
}) => {
  const wallFields = Object.keys(wallStats).filter((item) => item !== '_id' && item !== 'wallName');

  const handleCreate = () => {
    roomStat.walls.push({ ...wallStats, _id: new Date().getTime().toString() });
    setWallStats({
      _id: '',
      wallName: '',
      prepHour: '',
      height: '',
      length: '',
      wallType: '',
      coats: ''
    });
  };
  return (
    <Dialog
      open={addWall}
      onClose={() => setAddWall(false)}
      PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            Add New Wall
          </Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              Wall Name
            </InputLabel>

            <TextField
              InputProps={{
                style: { height: '30px' }
              }}
              name='name'
              fullWidth
              variant='outlined'
              id='outlined-basic'
              autoFocus
              value={wallStats.wallName}
              onChange={(event) => {
                wallStats.wallName = event.target.value;
                setWallStats({ ...wallStats });
              }}
            />
          </Grid>
          <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              Room Name
            </InputLabel>

            <TextField
              InputProps={{
                style: { height: '30px' }
              }}
              disabled
              name='name'
              fullWidth
              variant='outlined'
              id='outlined-basic'
              autoFocus
              value={roomStat.roomName}
            />
          </Grid>
        </Grid>
        <Typography sx={{color:"gray",fontWeight:'500',fontSize:'14px',mt:1}}>General Info:</Typography>
        <Grid container spacing={2} mt={0.5}>
          {wallFields.map((wallField) => {
            return (
              <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                  {wallField.toUpperCase()}
                </InputLabel>

                <TextField
                  InputProps={{
                    style: { height: '30px' }
                  }}
                  name='name'
                  fullWidth
                  variant='outlined'
                  id='outlined-basic'
                  autoFocus
                  value={wallStats[wallField]}
                  onChange={(event) => {
                    wallStats[wallField] = event.target.value;
                    setWallStats({ ...wallStats });
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddWall(false)}>Cancel</Button>{' '}
        <Button
          onClick={() => {
            setAddWall(false);
            handleCreate();
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
