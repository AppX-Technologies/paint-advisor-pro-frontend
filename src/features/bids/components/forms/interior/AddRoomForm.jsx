import BrushIcon from '@mui/icons-material/Brush';
import { Box, CircularProgress, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import AddMoreButton from '../../../../../common/AddMoreButton';
import Card from '../../../../../common/Card';
import { RoomInfofields } from '../../../../../common/FormTextField';
import AddMoreDetails from './AddMoreDetails';

export default function AddRoomForm(props) {
  const {
    open,
    setOpen,
    roomStats,
    setRoomStats,
    allRoom,
    setAllRoom,
    addWall,
    setAddWall,
    wallStats,
    setWallStats
  } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const onAddWallChange = (value) => {
    setAddWall(value);
  };
  const onCardDelete = (id) => {
    console.log(id);
    roomStats.walls.splice(
      roomStats.walls.findIndex((x) => x._id === id),
      1
    );
    setRoomStats({ ...roomStats });
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const roomRelatedInfo = [
    {
      name: 'paintWall',
      infoToShow: roomStats.walls.length
    }
  ];

  const findRoomRelatedInfo = (name) => {
    return roomRelatedInfo.find((roomInfo) => roomInfo.name === name);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { minWidth: '80%' } }}>
        <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
          <Stack direction='row' spacing={2}>
            <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
              Add New Room
            </Typography>
            <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Room Name
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
                value={roomStats.roomName}
                onChange={(event) => {
                  roomStats.roomName = event.target.value;
                  setRoomStats({ ...roomStats });
                }}
              />
            </Grid>
            <Divider />
            {RoomInfofields.map((item) => {
              const fieldType = item.name;
              return (
                item.dataType === 'dropDown' && (
                  <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                        <BrushIcon
                          sx={{
                            color: roomStats[fieldType]
                              ? (theme) => theme.deleteicon.color.main
                              : 'gray',
                            fontSize: '18px',
                            marginBottom: '-5px',
                            mr: 1
                          }}
                        />
                        {item.label}
                        {findRoomRelatedInfo(item.name) &&
                          `(${findRoomRelatedInfo(item.name).infoToShow})`}
                      </InputLabel>
                      <Switch
                        checked={roomStats[fieldType]}
                        onChange={(event) => {
                          roomStats[fieldType] = event.target.checked;
                          setRoomStats({ ...roomStats });
                        }}
                        {...label}
                      />
                    </Box>
                    {roomStats[fieldType] && (
                      <Grid container alignItems='center' justify='center'>
                        {roomStats.walls.length !== 0 &&
                          roomStats.walls.map((wall) => {
                            return (
                              <Grid xs={10} md={3}>
                                <Card
                                  items={{
                                    id: wall._id,
                                    Dimensions: `${wall.length}x${wall.height}`,
                                    WallType: wall.wallType,
                                    Coats: wall.coats
                                  }}
                                  title={wall.wallName}
                                  onCardDelete={onCardDelete}
                                />
                              </Grid>
                            );
                          })}
                        <Grid xs={3} md={3}>
                          <AddMoreButton
                            onAddWallChange={
                              item.name === 'paintWall' ? onAddWallChange : () => null
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                )
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type='submit'
            variant='contained'
            onClick={() => {
              setAllRoom([...allRoom, roomStats]);
              handleClose();
            }}>
            Add Room
          </Button>
        </DialogActions>
        {addWall && (
          <AddMoreDetails
            addWall={addWall}
            roomStat={roomStats}
            setRoomStat={setRoomStats}
            setAddWall={setAddWall}
            wallStats={wallStats}
            setWallStats={setWallStats}
          />
        )}
      </Dialog>
    </div>
  );
}
