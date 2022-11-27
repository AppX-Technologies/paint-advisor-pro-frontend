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
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial, reset } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function FormDialog(props) {
  const { materialList, isSuccess } = useSelector((state) => state.material);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const { open, setOpen, bidType, filteredMaterials } = props;

  const initialFormState = {
    materialName: '',
    unit: '',
    pricePerUnit: '',
    bidType
  };

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formState.materialName || !formState.bidType || !formState.pricePerUnit) {
      return dispatch(
        showMessage({
          message: `Material Name cannot be empty`,
          severity: 'error'
        })
      );
    }
    const formStateWithToken = {
      ...formState,
      ID: materialList[0]._id,
      previousMaterials: materialList[0].materials,
      add: true,
      token: userDetail.token
    };
    if (
      filteredMaterials.some((material) => {
        return material.materialName.toLowerCase().trim() === formState.materialName.toLowerCase().trim();
      })
    ) {
      dispatch(
        showMessage({
          message: 'Material Already Exists',
          variant: 'info',
          severity: 'info'
        })
      );
    } else {
      dispatch(createMaterial(formStateWithToken));
    }

    setOpen(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(
        showMessage({
          message: 'Process Updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);

  //   useEffect(() => {
  //     ['stage', 'description'].forEach((key, i) => {
  //       dispatchNew({
  //         type: 'HANDLE_FORM_INPUT',
  //         field: key,
  //         payload: key === 'stage' ? stageCategory : ''
  //       });
  //     });
  //   }, [stageType]);

  const handleTextChange = (e) => {
    dispatchNew({
      type: 'HANDLE_FORM_INPUT',
      field: e.target.name,
      payload: e.target.value
    });
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: '40%' } }}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New Material</Typography>
            <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12} md={12}>
            <TextField
              name='materialName'
              required
              fullWidth
              aria-label='minimum height'
              minRows={3}
              variant='standard'
              id='material'
              label='Material Name'
              autoFocus
              value={formState.materialName}
              onChange={(e) => handleTextChange(e)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <TextField
                name='unit'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='unit'
                label='Unit'
                autoFocus
                value={formState.unit}
                onChange={(e) => handleTextChange(e)}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                name='pricePerUnit'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='pricePerUnit'
                label='Price per Unit'
                autoFocus
                value={formState.pricePerUnit}
                onChange={(e) => handleTextChange(e)}
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
                  value={formState.bidType}
                  label='Bid Type'
                  onChange={(e) => handleTextChange(e)}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
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
