import { Chip, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
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
import { FIELDS_WHERE_MATERIALS_ARE_APPLIES } from '../../helpers/contants';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function FormDialog(props) {
  const { equipmentList, isSuccess } = useSelector((state) => state.equipment);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const { open, setOpen, bidType } = props;
  const initialFormState = {
    description: '',
    bidType,
    appliesTo: []
  };

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const handleClose = () => {
    setOpen(false);
  };

  console.log(formState, 'formStateformState');

  const handleCreate = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(formState).find((state) =>
      typeof formState[state] === 'string'
        ? formState[state] === ''
        : typeof formState[state] === 'number'
        ? formState[state] === 0
        : !formState[state].length
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
      ...formState,
      ID: equipmentList[0]?._id,
      previousEquipments: equipmentList[0]?.equipments,
      add: true,
      token: userDetail.token
    };

    dispatch(createEquipment(formStateWithToken));

    setOpen(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(
        showMessage({
          message: 'Equipment Updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    ['description', 'bidType'].forEach((key, i) => {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: key,
        payload: key === 'bidType' ? bidType : ''
      });
    });
  }, [bidType]);

  const handleTextChange = (e) => {
    dispatchNew({
      type: 'HANDLE_FORM_INPUT',
      field: e.target.name,
      payload: e.target.value
    });
  };

  const handleMaterialApplicableSection = (field) => {
    if (formState.appliesTo.includes(field)) {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: [...formState.appliesTo.filter((item) => item !== field)]
      });
    } else {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: [...formState.appliesTo, field]
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
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
              label='Equipment Description'
              autoFocus
              value={formState.description}
              onChange={(e) => handleTextChange(e)}
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
                  value={formState.bidType}
                  label='Bid Type'
                  onChange={(e) => handleTextChange(e)}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography sx={{ color: 'gray', fontWeight: 390, mb: 1 }}>
                Equipment Applied To
              </Typography>
              {FIELDS_WHERE_MATERIALS_ARE_APPLIES.map((field) => {
                return (
                  <>
                    <Chip
                      label={startCase(field.label)}
                      variant='outlined'
                      onClick={() => handleMaterialApplicableSection(field.label)}
                      sx={{
                        bgcolor: formState.appliesTo.includes(field.label) ? '#E0E0E0' : 'white',
                        m: 0.5,
                        '&:hover': {
                          bgcolor: formState.appliesTo.includes(field.label) ? '#E0E0E0' : 'white'
                        }
                      }}
                      size='small'
                    />
                  </>
                );
              })}
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
