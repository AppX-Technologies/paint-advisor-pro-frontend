import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import * as React from 'react';
import { InteriorManByManFormFields } from '../../../common/FormTextField';
import ExteriorManByMan from './forms/exterior/ExteriorManByMan';
import InteriorManByMan from './forms/interior/InteriorManByMan';
import InteriorRoomByRoom from './forms/interior/InteriorRoomByRoom';

export default function EstimateForm(props) {
  const { open, setOpen, initialBidInfo, setInitialBidInfo } = props;
  const [allRoom, setAllRoom] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [roomStats, setRoomStats] = React.useState({
    roomName: '',
    paintWall: 'No',
    baseboardTrim: 'No',
    paintCeiling: 'No',
    paintWindow: 'No',
    paintWindowTrim: 'No',
    paintDoorjambs: 'No',
    paintDoor: 'No',
    paintCrownModeling: 'No',
    paintCloset: 'No',
    walls: [],
    ceiling: [],
    window: []
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar sx={{ backgroundColor: '#D50000' }}>
          <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
            Estimate
          </Typography>
          <Button
            variant='contained'
            color='success'
            style={{
              height: '30px',
              padding: '3px',
              marginRight: '10px'
            }}>
            Edit <EditIcon sx={{ height: '15px' }} />
          </Button>
          <Button
            variant='contained'
            color='warning'
            style={{
              height: '30px',
              padding: '3px'
            }}
            onClick={handleClose}>
            Close <CloseIcon sx={{ height: '15px' }} />
          </Button>
        </Toolbar>

        <DialogContent>
          <Grid container spacing={2} mt={2}>
            {InteriorManByManFormFields.map((item) => {
              return (
                (item.dataType === 'dateTime' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      Enter Start Time/End Time
                    </InputLabel>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      style={{ mb: 1 }}
                      localeText={{ start: 'Start Date', end: 'End Date' }}>
                      <DateRangePicker
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                          <>
                            <TextField
                              size='small'
                              InputProps={{
                                style: { height: '30px' }
                              }}
                              {...startProps}
                            />
                            <Box sx={{ mx: 1 }}> to </Box>
                            <TextField
                              InputProps={{
                                style: { height: '30px' }
                              }}
                              size='small'
                              {...endProps}
                            />
                          </>
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                      <Select
                        displayEmpty
                        sx={{ height: '30px' }}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        name='name'>
                        {item.option.map((o) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                ))
              );
            })}
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Bid Type
              </InputLabel>
              <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                <Select
                  displayEmpty
                  sx={{ height: '30px' }}
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='Bid Type'
                  onChange={(event) => {
                    initialBidInfo.bidType = event.target.value;
                    setInitialBidInfo({ ...initialBidInfo });
                  }}
                  renderValue={
                    initialBidInfo.bidType !== ''
                      ? undefined
                      : () => (
                          <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                            Select One...
                          </Typography>
                        )
                  }>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Sub Type
              </InputLabel>
              <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                <Select
                  displayEmpty
                  sx={{ height: '30px' }}
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='Bid Type'
                  onChange={(event) => {
                    initialBidInfo.subType = event.target.value;
                    setInitialBidInfo({ ...initialBidInfo });
                  }}
                  renderValue={
                    initialBidInfo.subType !== ''
                      ? undefined
                      : () => (
                          <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                            Select One...
                          </Typography>
                        )
                  }>
                  <MenuItem value='Man Hour'>Man Hour</MenuItem>
                  {initialBidInfo.bidType === 'Interior' && (
                    <MenuItem value='Room by Room'>Room by Room</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />
          {initialBidInfo.bidType === 'Interior' && initialBidInfo.subType === 'Room by Room' && (
            <InteriorRoomByRoom
              roomStats={roomStats}
              setRoomStats={setRoomStats}
              allRoom={allRoom}
              setAllRoom={setAllRoom}
            />
          )}
          {initialBidInfo.bidType === 'Interior' && initialBidInfo.subType === 'Man Hour' && (
            <InteriorManByMan
              roomStats={roomStats}
              setRoomStats={setRoomStats}
              allRoom={allRoom}
              setAllRoom={setAllRoom}
            />
          )}
          {initialBidInfo.bidType === 'Exterior' && initialBidInfo.subType === 'Man Hour' && (
            <ExteriorManByMan />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
