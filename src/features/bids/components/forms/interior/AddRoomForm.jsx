import { CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { RoomInfofields } from '../../../../../common/FormTextField';
import AddMoreDetails from './AddMoreDetails';

export default function AddRoomForm(props) {
  const { open, setOpen, roomStats, setRoomStats, allRoom, setAllRoom } = props;
  const [secondPopUp, setSecondPopUp] = React.useState(true);
  console.log(roomStats);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: '40%' } }}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New Room</Typography>
            <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={2}>
            {RoomInfofields.map((item) => {
              const fieldType = item.name;
              return (
                (item.dataType === 'text' && (
                  <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
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
                      value={roomStats[fieldType]}
                      onChange={(event) => {
                        roomStats[fieldType] = event.target.value;
                        setRoomStats({ ...roomStats });
                      }}
                    />
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                      <Select
                        displayEmpty
                        sx={{ height: '30px' }}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        value={roomStats[fieldType]}
                        onChange={(event) => {
                          roomStats[fieldType] = event.target.value;
                          setRoomStats({ ...roomStats });
                        }}
                        name='name'>
                        {item.option.map((o, index) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    {roomStats[fieldType] === 'Yes' && (
                      <AddMoreDetails
                        wallStats={roomStats.walls}
                        secondPopUp={secondPopUp}
                        setSecondPopUp={setSecondPopUp}
                      />
                    )}
                  </Grid>
                ))
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
      </Dialog>
    </div>
  );
}
