import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material';
import { useEffect } from 'react';
import formReducer from './reducers/formReducer';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { updateOrg, fetchOrgs, reset } from '../../features/org/orgSlice';

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
    if (!formStateWithToken.name || !formStateWithToken.email) {
      return dispatch(
        showMessage({
          message: `Fields cannot be empty`,
          severity: 'error'
        })
      );
    }
    dispatch(updateOrg(formStateWithToken));
    // dispatch(reset());
  };

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
