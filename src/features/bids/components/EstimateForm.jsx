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
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { AddNewClientTextField, estimateFields } from '../../../common/FormTextField';

export default function EstimateForm(props) {
  const { open, handleClose } = props;
const selectedValue=[{
    id:""
}];
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Estimate
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
            {estimateFields.map((item) => {
              return (
                item.dataType === 'dropDown' && (
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
                        value={undefined}
                        renderValue={
                          selectedValue.find((obj) => obj.id === item.name)
                            ? ''
                            : () => (
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
                )
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
