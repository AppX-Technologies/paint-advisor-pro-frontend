import { CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
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
import { createEquipment, reset } from '../../features/equipments/equipmentSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';

export default function FormDialog(props) {
  const { equipmentList, isSuccess } = useSelector((state) => state.equipment);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const {
    equipmentRegistrationAndEditStats,
    setEquipmentRegistrationAndEditStats,
    onEquipmentFormClose
  } = props;

  const handleCreate = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(equipmentRegistrationAndEditStats).find((state) =>
      typeof equipmentRegistrationAndEditStats[state] === 'string'
        ? equipmentRegistrationAndEditStats[state] === ''
        : typeof equipmentRegistrationAndEditStats[state] === 'number'
        ? equipmentRegistrationAndEditStats[state] === 0
        : !equipmentRegistrationAndEditStats[state]?.length
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
      ...equipmentRegistrationAndEditStats,
      ID: equipmentList[0]?._id,
      previousEquipments: equipmentList[0]?.equipments,
      add: true,
      isRentable: false,
      token: userDetail.token
    };

    dispatch(createEquipment(formStateWithToken));

    onEquipmentFormClose();
  };
  useEffect(() => {
    if (isSuccess) {
      onEquipmentFormClose();
      dispatch(
        showMessage({
          message: 'Equipment Updated successfully',
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
          equipmentRegistrationAndEditStats !== null &&
          !Object.keys(equipmentRegistrationAndEditStats).includes('_id')
        }
        onClose={onEquipmentFormClose}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New Equipment</Typography>
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
              id='equipment'
              label='Material Description'
              autoFocus
              value={equipmentRegistrationAndEditStats?.description}
              onChange={(e) => {
                equipmentRegistrationAndEditStats.description = e.target.value;
                setEquipmentRegistrationAndEditStats({ ...equipmentRegistrationAndEditStats });
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl sx={{ m: 0, width: '100%', maxHeight: 30, marginTop: 3 }} size='small'>
                <InputLabel id='demo-select-small'>Bid Type</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='bidType'
                  value={equipmentRegistrationAndEditStats?.bidType}
                  label='Bid Type'
                  onChange={(e) => {
                    equipmentRegistrationAndEditStats.bidType = e.target.value;
                    setEquipmentRegistrationAndEditStats({ ...equipmentRegistrationAndEditStats });
                  }}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
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
                type='number'
                InputProps={{
                  inputProps: {
                    min: 1
                  }
                }}
                value={equipmentRegistrationAndEditStats?.unitPrice}
                onChange={(e) => {
                  equipmentRegistrationAndEditStats.unitPrice = e.target.value;
                  setEquipmentRegistrationAndEditStats({ ...equipmentRegistrationAndEditStats });
                }}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onEquipmentFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
