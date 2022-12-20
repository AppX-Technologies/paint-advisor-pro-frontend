import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { createUsers, fetchUsers, reset } from '../../features/users/userSlice';
import { ROLE_SYSTEM_ADMIN } from '../../helpers/contants';

export default function CreateUserForm({
  onUserFormClose,
  setUserRegistrationAndEditStats,
  userRegistrationAndEditStats
}) {
  const dispatch = useDispatch();

  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { isSuccess, isLoading } = useSelector((state) => state.user);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!userRegistrationAndEditStats.name) {
      return dispatch(
        showMessage({
          message: `Name cannot be empty`,
          severity: 'error'
        })
      );
    }
    const formStateWithToken = {
      ...userRegistrationAndEditStats,
      role: ROLE_SYSTEM_ADMIN,
      token: userDetail.token
    };
    dispatch(createUsers(formStateWithToken));
    dispatch(fetchUsers(userDetail.token));
  };

  useEffect(() => {
    if (isSuccess) {
      onUserFormClose();
      dispatch(
        showMessage({
          message: 'User created successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);

  console.log(userRegistrationAndEditStats, 'userRegistrationAndEditStats');
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
          <Grid container spacing={2}>
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
