import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as React from 'react';
import { AddNewClientTextField } from '../../../common/FormTextField';

export default function AddNewClientForm(props) {
  const { open,date,handleClose,handleChange } = props;
  

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Add New Client
          </Typography>
          <Button
            variant='outlined'
            color='primary'
            style={{
              height: '30px',
              padding: '3px'
            }}
            onClick={handleClose}>
            Close <CloseIcon sx={{ height: '10px' }} />
          </Button>
        </Toolbar>

        <DialogContent dividers sx={{ m: 1 }}>
          <Grid container spacing={2}>
            {AddNewClientTextField.map((item) => {
              return (
                (item.dataType === 'text' && (
                  <Grid item xs={4} md={4}>
                    <TextField
                      name={item.name}
                      required
                      fullWidth
                      variant='standard'
                      id={item.id}
                      label={item.label}
                      autoFocus
                    />
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: 1 }}>
                    <FormControl sx={{ m: 0, minWidth: '100%', marginTop: 1 }} size='small'>
                      <InputLabel id='demo-select-small'>{item.label}</InputLabel>
                      <Select
                        sx={{height:"35px"}}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        name={item.name}
                        value='Email'
                        label={item.label}>
                        <MenuItem value='Interior'>Email</MenuItem>
                        <MenuItem value='Exterior'>Phone</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )) ||
                (item.dataType === 'date' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        InputProps={{
                          style: { height: '35px' }
                        }}
                        label={
                          <Typography sx={{ marginTop: '-5px', fontSize: '12px' }}>
                            {item.label}
                          </Typography>
                        }
                        inputFormat='MM/DD/YYYY'
                        value={date}
                        sx={{ marginTop: 3 }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                )) ||
                (item.dataType === 'time' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        InputProps={{
                          style: { height: '35px' }
                        }}
                        label={
                          <Typography sx={{ marginTop: '-5px', fontSize: '12px' }}>
                            {item.label}
                          </Typography>
                        }
                        value={date}
                        sx={{ marginTop: 3 }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                ))
              );
            })}
          </Grid>
          <div style={{ height: '500px', width: '100px', marginTop: '10px' }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores vero
              hic, repellat qui id ut fugiat ea fugit labore autem amet numquam at enim facilis
              dolorem nesciunt facere a.
            </p>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
