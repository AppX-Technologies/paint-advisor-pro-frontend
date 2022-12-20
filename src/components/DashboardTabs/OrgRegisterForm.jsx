import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
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
import { createOrgs, fetchOrgs, reset } from '../../features/org/orgSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';

export default function FormDialog({
  companiesRegistrationAndEditStats,
  setCompaniesRegistrationAndEditStats,
  onCompanyFormClose
}) {
  const dispatch = useDispatch();
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { isSuccess, isLoading } = useSelector((state) => state.org);

  const handleCreate = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(companiesRegistrationAndEditStats).find((state) =>
      typeof companiesRegistrationAndEditStats[state] === 'string'
        ? companiesRegistrationAndEditStats[state] === ''
        : typeof companiesRegistrationAndEditStats[state] === 'number'
        ? companiesRegistrationAndEditStats[state] === 0
        : !companiesRegistrationAndEditStats[state].length
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
      ...companiesRegistrationAndEditStats,
      token: userDetail.token
    };
    dispatch(createOrgs(formStateWithToken));
  };

  useEffect(() => {
    if (isSuccess) {
      onCompanyFormClose();

      dispatch(
        showMessage({
          message: 'Organization created successfully',
          variant: 'success'
        })
      );
      dispatch(fetchOrgs(userDetail.token));
      dispatch(reset());
    }
  }, [isSuccess]);

  console.log(companiesRegistrationAndEditStats, 'companiesRegistrationAndEditStats');

  return (
    <div>
      <Dialog
        open={
          companiesRegistrationAndEditStats !== null &&
          !Object.keys(companiesRegistrationAndEditStats).includes('_id')
        }
        onClose={onCompanyFormClose}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New Organization</Typography>

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
                value={companiesRegistrationAndEditStats?.name}
                onChange={(e) => {
                  companiesRegistrationAndEditStats.name = e.target.value;
                  setCompaniesRegistrationAndEditStats({ ...companiesRegistrationAndEditStats });
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
                value={companiesRegistrationAndEditStats?.email}
                onChange={(e) => {
                  companiesRegistrationAndEditStats.email = e.target.value;
                  setCompaniesRegistrationAndEditStats({ ...companiesRegistrationAndEditStats });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='address'
                fullWidth
                variant='standard'
                id='address'
                label='Address'
                autoFocus
                value={companiesRegistrationAndEditStats?.address}
                onChange={(e) => {
                  companiesRegistrationAndEditStats.address = e.target.value;
                  setCompaniesRegistrationAndEditStats({ ...companiesRegistrationAndEditStats });
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
                value={companiesRegistrationAndEditStats?.phone}
                onChange={(e) => {
                  companiesRegistrationAndEditStats.phone = e.target.value;
                  setCompaniesRegistrationAndEditStats({ ...companiesRegistrationAndEditStats });
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCompanyFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
