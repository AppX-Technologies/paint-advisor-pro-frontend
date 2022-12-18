import { CircularProgress, Grid, TextField } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import { createEquipment } from '../../features/equipments/equipmentSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function Edit(props) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { openEditForm, setOpenEditForm, editFormData } = props;

  const initialFormState = {
    description: editFormData.description ? editFormData.description : '',
    bidType: editFormData.bidType ? editFormData.bidType : ''
  };

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { equipmentList } = useSelector((state) => state.equipment);

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
      ID: equipmentList[0]._id,
      previousEquipments: equipmentList[0].equipments.filter(
        (previousEquipments) => previousEquipments._id !== editFormData._id
      ),

      add: true,
      token: userDetail.token
    };
    dispatch(createEquipment(formStateWithToken));
    setOpenEditForm(false);
  };

  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit Equipment
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
              id='equipment'
              label='Equipment Description'
              autoFocus
              value={formState.description}
              onChange={(e) => handleTextChange(e)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '13px' }}>
            <Grid item xs={12} md={12}>
              <FormControl sx={{ m: 0, width: '100%', maxHeight: 30, marginTop: 3 }} size='small'>
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
