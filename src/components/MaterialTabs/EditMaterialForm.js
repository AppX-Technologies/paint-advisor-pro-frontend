import { CircularProgress, Grid, TextareaAutosize, TextField } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function Edit(props) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { openEditForm, setOpenEditForm, editFormData } = props;
  const initialFormState = {
    materialName: editFormData.material ? editFormData.material : '',
    unit: editFormData.unit ? editFormData.unit : '',
    pricePerUnit: editFormData.pricePerUnit ? editFormData.pricePerUnit : '',
    bidType: editFormData.bidType ? editFormData.bidType : ''
  };

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
    if (!formState.material) {
      return dispatch(
        showMessage({
          message: `Material name cannot be empty`,
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

  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose} PaperProps={{ sx: { width: '40%' } }}>
        <DialogTitle>
          Edit Material
          <CircularProgress style={{ display: 'none' }} size={25} />
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <TextField
              name='material'
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
                name='pricePerUnit'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='pricePerUnit'
                label='Price per Unit'
                autoFocus
                value={formState.pricePerUnit ? formState.pricePerUnit : ''}
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
