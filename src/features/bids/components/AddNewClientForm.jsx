import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
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
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { AddNewClientTextField } from '../../../common/FormTextField';

export default function AddNewClientForm(props) {
  const { open, handleClose, selectedValue, setSelectedvalue } = props;

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
            Close <CloseIcon sx={{ height: '15px' }} />
          </Button>
        </Toolbar>

        <DialogContent dividers sx={{ m: 1 }}>
          <Grid container spacing={2}>
            {AddNewClientTextField.map((item) => {
              const fieldType = item.name;
              return (
                (item.dataType === 'text' && (
                  <Grid item xs={10} md={item.resizeable ? 1 : 4} sx={{ marginTop: '-10px' }}>
                    <>
                      <InputLabel
                        id='demo-select-small'
                        sx={{ fontSize: '14px', margin: item.resizeable ? '0 30px' : '0' }}>
                        {item.label}
                      </InputLabel>

                      <TextField
                        InputProps={{
                          style: {
                            height: '30px',
                            width: item.resizeable ? '100px' : 'auto',
                            margin: item.resizeable ? '0 30px' : '0'
                          }
                        }}
                        name={item.name}
                        fullWidth
                        variant='outlined'
                        id='outlined-basic'
                        autoFocus
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                      />
                    </>
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
                        name={item.name}
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                        renderValue={() =>
                          selectedValue[fieldType] ? '' : (
                            <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                              Select One...
                            </Typography>
                          )
                        }>
                        {item.option.map((o) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )) ||
                (item.dataType === 'date' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        InputProps={{
                          style: { height: '30px' }
                        }}
                        inputFormat='MM/DD/YYYY'
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                )) ||
                (item.dataType === 'dateTime' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        InputProps={{
                          style: { height: '30px' }
                        }}
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                ))
              );
            })}
          </Grid>
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
