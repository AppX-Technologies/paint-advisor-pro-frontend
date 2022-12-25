import { Autocomplete, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { startCase } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial, reset } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { POPULAR_UNITS_OF_MEASUREMENT } from '../../helpers/contants';

export default function FormDialog({
  materialRegistrationAndEditStats,
  setMaterialRegistrationAndEditStats,
  onMaterialFormClose
}) {
  const { materialList, isSuccess } = useSelector((state) => state.material);

  const userDetail = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(materialRegistrationAndEditStats).find((state) =>
      typeof materialRegistrationAndEditStats[state] === 'string'
        ? materialRegistrationAndEditStats[state] === ''
        : typeof materialRegistrationAndEditStats[state] === 'number'
        ? materialRegistrationAndEditStats[state] === 0
        : !materialRegistrationAndEditStats[state]?.length
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
      ...materialRegistrationAndEditStats,
      ID: materialList[0]?._id,
      previousMaterials: materialList[0]?.materials,
      add: true,
      token: userDetail.token
    };

    dispatch(createMaterial(formStateWithToken));

    onMaterialFormClose();
  };
  useEffect(() => {
    if (isSuccess) {
      onMaterialFormClose();
      dispatch(
        showMessage({
          message: 'Process Updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog
        open={
          materialRegistrationAndEditStats !== null &&
          !Object.keys(materialRegistrationAndEditStats).includes('_id')
        }
        onClose={onMaterialFormClose}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New Material</Typography>
            <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12} md={12}>
            <TextField
              name='description'
              required
              fullWidth
              aria-label='minimum height'
              minRows={3}
              variant='standard'
              id='material'
              label='Material Description'
              autoFocus
              value={materialRegistrationAndEditStats?.description}
              onChange={(e) => {
                materialRegistrationAndEditStats.description = e.target.value;
                setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} mt={2}>
              {materialRegistrationAndEditStats && (
                <Autocomplete
                  size='small'
                  disableCloseOnSelect
                  inputValue={materialRegistrationAndEditStats?.unit}
                  variant='standard'
                  freeSolo
                  onInputChange={(event, newInputValue) => {
                    materialRegistrationAndEditStats.unit = newInputValue;
                    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                  }}
                  id='disable-list-wrap'
                  options={
                    POPULAR_UNITS_OF_MEASUREMENT.length
                      ? POPULAR_UNITS_OF_MEASUREMENT.map((option) => option)
                      : []
                  }
                  renderInput={(params) => (
                    <TextField {...params} label='Units' variant='standard' />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                name='unitPrice'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='unit'
                label='Unit Price'
                autoFocus
                value={materialRegistrationAndEditStats?.unitPrice}
                onChange={(e) => {
                  materialRegistrationAndEditStats.unitPrice = e.target.value;
                  setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                }}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl sx={{ m: 0, minWidth: 240, maxHeight: 30, marginTop: 3 }} size='small'>
                <InputLabel id='demo-select-small'>Bid Type</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='bidType'
                  value={materialRegistrationAndEditStats?.bidType}
                  label='Bid Type'
                  onChange={(e) => {
                    materialRegistrationAndEditStats.bidType = e.target.value;
                    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                  }}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onMaterialFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
