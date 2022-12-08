import { Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { cloneDeep, startCase } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { FIELDS_WHERE_MATERIALS_ARE_APPLIES } from '../../helpers/contants';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function Edit(props) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { openEditForm, setOpenEditForm, editFormData } = props;

  const initialFormState = {
    description: editFormData.description ? editFormData.description : '',
    unit: editFormData.unit ? editFormData.unit : '',
    unitPrice: editFormData.unitPrice ? editFormData.unitPrice : '',
    bidType: editFormData.bidType ? editFormData.bidType : '',
    appliesTo: editFormData?.appliesTo ? [...editFormData.appliesTo] : []
  };

  console.log(initialFormState, 'initialFormState');

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { materialList } = useSelector((state) => state.material);

  const dispatch = useDispatch();

  React.useEffect(() => {
    Object.keys(editFormData).forEach((key) => {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: key,
        payload: editFormData[key]
      });
    });
  }, [editFormData]);
  const handleTextChange = (e) => {
    dispatchNew({
      type: 'HANDLE_FORM_INPUT',
      field: e.target.name,
      payload: e.target.value
    });
  };
  const handleClose = () => {
    setOpenEditForm(false);
    Object.keys(formState).forEach((key) => {
      formState[key] = '';
    });
  };

  const handleEdit = (e) => {
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
      ID: materialList[0]._id,
      previousMaterials: materialList[0].materials.filter(
        (previousMaterials) => previousMaterials._id !== editFormData._id
      ),

      add: true,
      token: userDetail.token
    };
    dispatch(createMaterial(formStateWithToken));
    setOpenEditForm(false);
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
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit Material
          <CircularProgress style={{ display: 'none' }} size={25} />
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
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
              value={formState.description}
              onChange={(e) => handleTextChange(e)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '13px' }}>
            <Grid item xs={3} md={3}>
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
                value={formState.unit ? formState.unit : ''}
                onChange={(e) => handleTextChange(e)}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                name='unitPrice'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='pricePerUnit'
                label='Price per Unit'
                autoFocus
                value={formState.unitPrice ? formState.unitPrice : ''}
                onChange={(e) => handleTextChange(e)}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl sx={{ m: 0, minWidth: 235, maxHeight: 30, marginTop: 3 }} size='small'>
                <InputLabel id='demo-select-small'>Bid Type</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='bidType'
                  value={formState.bidType ? formState.bidType : editFormData.bidType}
                  label='Bid Type'
                  onChange={(e) => handleTextChange(e)}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography sx={{ color: 'gray', fontWeight: 390, mb: 1 }}>
                Material Applied To
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
          <Button type='submit' variant='contained' onClick={(e) => handleEdit(e)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
