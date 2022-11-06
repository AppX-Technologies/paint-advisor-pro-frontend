import { CircularProgress, Grid, TextareaAutosize } from '@mui/material';
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
import { createProcess } from '../../features/process/processSlice';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function Edit(props) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { openEditForm, setOpenEditForm, editFormData } = props;

  const initialFormState = {
    stage: editFormData.stage ? editFormData.stage : '',
    description: editFormData.description ? editFormData.description : '',
    bidType: editFormData.bidType ? editFormData.bidType : ''
  };

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { processList } = useSelector((state) => state.process);

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
    const formStateWithToken = {
      ...formState,
      ID: processList[0]._id,
      previousProcesses: processList[0].processes.filter(
        (previousProcess) => previousProcess._id !== editFormData._id
      ),

      add: true,
      token: userDetail.token
    };
    dispatch(createProcess(formStateWithToken));
    setOpenEditForm(false);
  };

  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose} PaperProps={{ sx: { width: '40%' } }}>
        <DialogTitle>
          Edit Process
          <CircularProgress style={{ display: 'none' }} size={25} />
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <InputLabel id='demo-simple-select-standard-label'>Description</InputLabel>
            <TextareaAutosize
              name='description'
              required
              fullWidth
              aria-label='minimum height'
              minRows={3}
              variant='standard'
              id='process'
              label='Description'
              autoFocus
              placeholder={editFormData.description}
              value={formState.description}
              onChange={(e) => handleTextChange(e)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '13px' }}>
            <Grid item xs={6} md={6}>
              <FormControl sx={{ m: 0, minWidth: 235, maxHeight: 30, marginTop: 3 }} size='small'>
                <InputLabel id='demo-select-small'>stage</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='stage'
                  value={formState.stage ? formState.stage : editFormData.stage}
                  label='stage'
                  onChange={(e) => handleTextChange(e)}>
                  <MenuItem value='Presentation'>Preparation</MenuItem>
                  <MenuItem value='Painting'>Painting</MenuItem>
                  <MenuItem value='Clean up'>Clean up</MenuItem>
                </Select>
              </FormControl>
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
