import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
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
import { useParams } from 'react-router-dom';
import { authSelector } from '../../features/auth/authSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {
  reset,
  updateUserFromCompany
} from '../../features/usersFromCompany/usersFromCompanySlice';
import { isSystemUser } from '../../helpers/roles';

export default function Edit(props) {
  const dispatch = useDispatch();
  const { userRegistrationAndEditStats, setUserRegistrationAndEditStats, onUserFormClose } = props;
  const { companyId } = useParams();
  const { user } = useSelector(authSelector);

  const [orgId] = React.useState(isSystemUser(user) ? companyId : user.organization._id);

  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { isUpdated, isUpdating } = useSelector((state) => state.usersFromCompany);

  const handleEdit = (e) => {
    e.preventDefault();
    const emptyField =
      userRegistrationAndEditStats &&
      Object.keys(userRegistrationAndEditStats)
        .filter(
          (item) =>
            item !== '__v' && item !== 'proficiency' && item !== 'status' && item !== 'organization'
        )
        ?.find((state) =>
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
      orgId,
      token: userDetail.token
    };

    dispatch(updateUserFromCompany(formStateWithToken));
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
              <label>Name *</label>
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
              <label>Email *</label>
              <TextField
                name='Email'
                required
                fullWidth
                id='Email'
                autoFocus
                value={userRegistrationAndEditStats?.email}
                onChange={(e) => {
                  userRegistrationAndEditStats.email = e.target.value;
                  setUserRegistrationAndEditStats({ ...userRegistrationAndEditStats });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Phone Number</label>
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
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant='standard' sx={{ mt: 2, minWidth: '90%' }}>
                <InputLabel id='demo-simple-select-standard-label'>Role *</InputLabel>
                <Select
                  fullWidth
                  name='role'
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  value={
                    userRegistrationAndEditStats?.role
                      ? userRegistrationAndEditStats?.role
                      : userRegistrationAndEditStats?.role
                  }
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

            <Grid xs={6} sx={{ marginTop: '16px' }}>
              {userRegistrationAndEditStats?.role === 'Painter' && (
                <FormControl variant='standard' sx={{ mt: 2, ml: 2, minWidth: '90%' }}>
                  <InputLabel id='demo-simple-select-standard-label'>Proficiency *</InputLabel>
                  <Select
                    fullWidth
                    name='proficiency'
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={userRegistrationAndEditStats?.proficiency}
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
