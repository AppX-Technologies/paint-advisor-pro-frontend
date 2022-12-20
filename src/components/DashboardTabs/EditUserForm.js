import { CircularProgress, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { startCase } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { fetchUsers, reset, updateUser } from '../../features/users/userSlice';

export default function Edit(props) {
  const dispatch = useDispatch();
  const { userRegistrationAndEditStats, setUserRegistrationAndEditStats, onUserFormClose } = props;

  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { isUpdated, isUpdating } = useSelector((state) => state.user);

  const handleEdit = (e) => {
    e.preventDefault();

    const emptyField = Object.keys(userRegistrationAndEditStats)
      .filter((item) => item !== 'active' && item !== '__v' && item !== 'organization')
      .find((state) =>
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

    const formStateWithToken = {
      ...userRegistrationAndEditStats,

      token: userDetail.token
    };
    if (!formStateWithToken.name || !formStateWithToken.email) {
      return dispatch(
        showMessage({
          message: `Fields cannot be empty`,
          severity: 'error'
        })
      );
    }
    dispatch(updateUser(formStateWithToken));
    dispatch(reset());
  };

  useEffect(() => {
    if (isUpdated) {
      onUserFormClose();
      dispatch(
        showMessage({
          message: 'User updated successfully',
          variant: 'success'
        })
      );
      dispatch(fetchUsers(userDetail.token));
      dispatch(reset());
    }
  }, [isUpdated]);
  return (
    <div>
      <Dialog
        open={
          userRegistrationAndEditStats !== null &&
          Object.keys(userRegistrationAndEditStats).includes('_id')
        }
        onClose={onUserFormClose}>
        <DialogTitle>
          Edit User
          <CircularProgress style={{ display: isUpdating ? 'block' : 'none' }} size={25} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Name</label>
              <TextField
                name='name'
                required
                fullWidth
                id='name'
                autoFocus
                value={userRegistrationAndEditStats?.name}
                onChange={(e) => {
                  userRegistrationAndEditStats.name = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Email</label>
              <TextField
                name='email'
                required
                fullWidth
                id='email'
                autoFocus
                value={userRegistrationAndEditStats?.email}
                onChange={(e) => {
                  userRegistrationAndEditStats.email = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Phone</label>
              <TextField
                name='phone'
                required
                fullWidth
                id='phone'
                autoFocus
                value={userRegistrationAndEditStats?.phone}
                onChange={(e) => {
                  userRegistrationAndEditStats.phone = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
                InputLabelProps={{
                  style: { color: '#988817' }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onUserFormClose}>Cancel</Button>
          <Button
            disabled={isUpdating}
            type='submit'
            variant='contained'
            onClick={(e) => handleEdit(e)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
