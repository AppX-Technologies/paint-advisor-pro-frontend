import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import formReducer from '../reducers/registerReducer';
import {
  createUsersByCompany,
  fetchUserMadeByCompany,
  reset
} from '../../features/usersFromCompany/usersFromCompanySlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  role: '',
  proficiency: 'Beginner'
};

export default function CreateUserForm({ open, setOpen, orgId }) {
  const dispatch = useDispatch();
  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { isSuccess, isLoading } = useSelector((state) => state.usersFromCompany);
  const userDetail = JSON.parse(localStorage.getItem('user'));

  const handleTextChange = (e) => {
    dispatchNew({
      type: 'HANDLE_INPUT',
      field: e.target.name,
      payload: e.target.value
    });
  };
  const handleClose = () => {
    setOpen(false);
    Object.keys(formState).forEach((key) => {
      dispatchNew({
        type: 'HANDLE_INPUT',
        field: key,
        payload: ''
      });
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const formStateWithCompanyId = {
      ...formState,
      organization: orgId,
      token: JSON.parse(localStorage.getItem('user')).token
    };
    if (formState.role === '') {
      dispatch(
        showMessage({
          message: 'Please select a role',
          severity: 'error'
        })
      );
    } else {
      dispatch(createUsersByCompany(formStateWithCompanyId));
      reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(showMessage({ message: 'User created successfully', variant: 'success' }));
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New User</Typography>
            <CircularProgress
              color='primary'
              size={25}
              style={{ display: isLoading ? 'block' : 'none' }}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name='name'
                required
                fullWidth
                variant='standard'
                id='name'
                label='Name'
                autoFocus
                value={formState.name}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                required
                fullWidth
                variant='standard'
                id='email'
                label='Email'
                autoFocus
                value={formState.email}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='phone'
                required
                fullWidth
                variant='standard'
                id='phone'
                label='Phone Number'
                autoFocus
                value={formState.phone}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant='standard' sx={{ mt: 2, minWidth: '98%' }}>
                <InputLabel id='demo-simple-select-standard-label'>Role *</InputLabel>
                <Select
                  fullWidth
                  name='role'
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  value={formState.role}
                  onChange={(e) => handleTextChange(e)}
                  label='Role'>
                  <MenuItem value='Org Admin'>Org Admin</MenuItem>
                  <MenuItem value='Estimator'>Estimator</MenuItem>
                  <MenuItem value='Painter'>Painter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ marginTop: '24px' }}>
              {formState.role === 'Painter' && (
                <FormControl variant='standard' sx={{ mt: 2, minWidth: '98%' }}>
                  <InputLabel id='demo-simple-select-standard-label'>Proficiency *</InputLabel>
                  <Select
                    fullWidth
                    name='proficiency'
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={formState.proficiency}
                    onChange={(e) => handleTextChange(e)}
                    label='Role'>
                    <MenuItem value='Beginner'>Beginner</MenuItem>
                    <MenuItem value='Intermediate'>Intermediate</MenuItem>
                    <MenuItem value='Expert'>Expert</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
