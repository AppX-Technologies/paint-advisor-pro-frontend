import { Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material';
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
import { reset, updateOrg } from '../../features/org/orgSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';

export default function Edit({
  companiesRegistrationAndEditStats,
  setCompaniesRegistrationAndEditStats,
  onCompanyFormClose
}) {
  const dispatch = useDispatch();
  const [companiesRegistrationAndEditStatsCopy, setCompaniesRegistrationAndEditStatsCopy] =
    React.useState(null);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { isUpdated, isUpdating } = useSelector((state) => state.org);

  const formStateWithToken = {
    ...companiesRegistrationAndEditStats,
    id: companiesRegistrationAndEditStats?._id,
    token: userDetail.token
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(companiesRegistrationAndEditStats)
      .filter(
        (item) =>
          item !== 'active' &&
          item !== '__v' &&
          item !== 'processes' &&
          item !== 'organization' &&
          item !== 'materials' &&
          item !== 'equipments'
      )
      .find((state) =>
        typeof companiesRegistrationAndEditStats[state] === 'string'
          ? companiesRegistrationAndEditStats[state] === ''
          : typeof companiesRegistrationAndEditStats[state] === 'number'
          ? companiesRegistrationAndEditStats[state] === 0
          : !companiesRegistrationAndEditStats[state]?.length
      );

    if (emptyField) {
      return dispatch(
        showMessage({
          message: `${startCase(emptyField)} cannot be empty`,
          severity: 'error'
        })
      );
    }
    dispatch(updateOrg(formStateWithToken));
    // dispatch(reset());
  };

  console.log(companiesRegistrationAndEditStats, 'companiesRegistrationAndEditStats');

  useEffect(() => {
    if (isUpdated) {
      onCompanyFormClose();
      dispatch(
        showMessage({
          message: 'Organization updated successfully',
          variant: 'success'
        })
      );

      dispatch(reset());
    }
  }, [isUpdated]);

  useEffect(() => {
    if (companiesRegistrationAndEditStats) {
      setCompaniesRegistrationAndEditStatsCopy({ ...companiesRegistrationAndEditStats });
    }
  }, [companiesRegistrationAndEditStats]);

  console.log(companiesRegistrationAndEditStats, 'companiesRegistrationAndEditStats');
  return (
    <div>
      <Dialog
        open={
          companiesRegistrationAndEditStats !== null &&
          Object.keys(companiesRegistrationAndEditStats).includes('_id')
        }
        onClose={onCompanyFormClose}>
        <DialogTitle>
          Edit Organization
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
                value={companiesRegistrationAndEditStatsCopy?.name}
                onChange={(e) => {
                  companiesRegistrationAndEditStatsCopy.name = e.target.value;
                  setCompaniesRegistrationAndEditStats({
                    ...companiesRegistrationAndEditStatsCopy
                  });
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
                value={companiesRegistrationAndEditStatsCopy?.email}
                onChange={(e) => {
                  companiesRegistrationAndEditStatsCopy.email = e.target.value;
                  setCompaniesRegistrationAndEditStats({
                    ...companiesRegistrationAndEditStatsCopy
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Address</label>
              <TextField
                name=''
                required
                fullWidth
                id='address'
                autoFocus
                value={companiesRegistrationAndEditStatsCopy?.address}
                onChange={(e) => {
                  companiesRegistrationAndEditStatsCopy.address = e.target.value;
                  setCompaniesRegistrationAndEditStats({
                    ...companiesRegistrationAndEditStatsCopy
                  });
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
                value={companiesRegistrationAndEditStatsCopy?.phone}
                onChange={(e) => {
                  companiesRegistrationAndEditStatsCopy.phone = e.target.value;
                  setCompaniesRegistrationAndEditStats({
                    ...companiesRegistrationAndEditStatsCopy
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='active'
                    checked={companiesRegistrationAndEditStatsCopy?.active ? 'on' : false}
                    onChange={(e) => {
                      companiesRegistrationAndEditStatsCopy.active =
                        !companiesRegistrationAndEditStatsCopy.active;
                      setCompaniesRegistrationAndEditStats({
                        ...companiesRegistrationAndEditStatsCopy
                      });
                    }}
                  />
                }
                label='Is organization active?'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCompanyFormClose}>Cancel</Button>
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
