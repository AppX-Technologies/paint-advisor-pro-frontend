import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Box,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { ALL_STATUS } from '../../../helpers/contants';

export default function AddNewClientForm(props) {
  const { open, setOpen } = props;
  const [status, setStatus] = React.useState('');
  const values = ALL_STATUS;
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Box>
          <FormControl sx={{ m: 3, minWidth: 120 }} size='small'>
            <InputLabel id='demo-select-small'>Status</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={status}
              label='status'
              onChange={handleChange}>
              {values.map((stat) => {
                return <MenuItem value={stat}>{stat}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <DialogContent dividers sx={{ m: 1 }}>
          <Grid container spacing={2}>
            {AddNewClientTextField.map((item) => {
              return item.dataType === 'text' ? (
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
              ) : (
                <FormControl sx={{ mt: 3, ml: 2, minWidth: 120 }} size='small'>
                  <InputLabel id='demo-select-small'>{item.name}</InputLabel>
                  <Select
                    labelId='demo-select-small'
                    id='demo-select-small'
                    value='Status'
                    label={item.label}
                    onChange={handleChange}>
                    <MenuItem value={10}>Project Status</MenuItem>
                    <MenuItem value={22}>Project Status</MenuItem>
                  </Select>
                </FormControl>
              );
            })}
          </Grid>
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
