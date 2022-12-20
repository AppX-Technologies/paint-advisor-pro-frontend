import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { startCase } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { createUsersByCompany, reset } from '../../features/usersFromCompany/usersFromCompanySlice';

export default function CreateUserForm({
  orgId,
  userRegistrationAndEditStats,
  setUserRegistrationAndEditStats,
  onUserFormClose
}) {
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.usersFromCompany);

  const handleCreate = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(userRegistrationAndEditStats).find((state) =>
      typeof userRegistrationAndEditStats[state] === 'string'
        ? userRegistrationAndEditStats[state] === ''
        : typeof userRegistrationAndEditStats[state] === 'number'
        ? userRegistrationAndEditStats[state] === 0
        : !userRegistrationAndEditStats[state]?.length
    );

    if (emptyField) {
      return dispatch(
        showMessage({
          message: `${startCase(emptyField)} cannot be empty`,
          severity: 'error'
        })
      );
    }
    const formStateWithCompanyId = {
      ...userRegistrationAndEditStats,
      organization: orgId,
      token: JSON.parse(localStorage.getItem('user')).token
    };

    dispatch(createUsersByCompany(formStateWithCompanyId));
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      onUserFormClose();
      dispatch(showMessage({ message: 'User created successfully', variant: 'success' }));
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog
        open={
          userRegistrationAndEditStats !== null &&
          !Object.keys(userRegistrationAndEditStats).includes('_id')
        }
        onClose={onUserFormClose}>
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
                value={userRegistrationAndEditStats?.name}
                onChange={(e) => {
                  userRegistrationAndEditStats.name = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
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
                value={userRegistrationAndEditStats?.email}
                onChange={(e) => {
                  userRegistrationAndEditStats.email = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
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
                value={userRegistrationAndEditStats?.phone}
                onChange={(e) => {
                  userRegistrationAndEditStats.phone = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
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
                  value={userRegistrationAndEditStats?.role}
                  onChange={(e) => {
                    userRegistrationAndEditStats.role = e.target.value;
                    setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                  }}
                  label='Role'>
                  <MenuItem value='Org Admin'>Org Admin</MenuItem>
                  <MenuItem value='Estimator'>Estimator</MenuItem>
                  <MenuItem value='Painter'>Painter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ marginTop: '24px' }}>
              {userRegistrationAndEditStats?.role === 'Painter' && (
                <FormControl variant='standard' sx={{ mt: 2, minWidth: '98%' }}>
                  <InputLabel id='demo-simple-select-standard-label'>Proficiency *</InputLabel>
                  <Select
                    fullWidth
                    name='proficiency'
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={userRegistrationAndEditStats?.proficiency}
                    onChange={(e) => {
                      userRegistrationAndEditStats.proficiency = e.target.value;
                      setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                    }}
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
          <Button onClick={onUserFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
