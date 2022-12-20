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
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { ALL_PROCESS_STAGES } from '../../helpers/contants';

export default function Edit({
  processRegistrationAndEditStats,
  onProcessFormClose,
  setProcessRegistrationAndEditStats
}) {
  const userDetail = JSON.parse(localStorage.getItem('user'));

  const { processList } = useSelector((state) => state.process);

  const dispatch = useDispatch();
  const handleEdit = (e) => {
    e.preventDefault();
    if (
      !processRegistrationAndEditStats.description ||
      !processRegistrationAndEditStats.bidType ||
      !processRegistrationAndEditStats.stage
    ) {
      return dispatch(
        showMessage({
          message: `Description cannot be empty`,
          severity: 'error'
        })
      );
    }
    const formStateWithToken = {
      ...processRegistrationAndEditStats,
      ID: processList[0]._id,
      previousProcesses: processList[0].processes.filter(
        (previousProcess) => previousProcess._id !== processRegistrationAndEditStats._id
      ),

      add: true,
      token: userDetail.token
    };
    dispatch(createProcess(formStateWithToken));
    onProcessFormClose();
  };

  return (
    <div>
      <Dialog
        open={
          processRegistrationAndEditStats !== null &&
          Object.keys(processRegistrationAndEditStats).includes('_id')
        }
        onClose={onProcessFormClose}>
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
              placeholder={processRegistrationAndEditStats?.description}
              value={processRegistrationAndEditStats?.description}
              onChange={(e) => {
                processRegistrationAndEditStats.description = e.target.value;
                setProcessRegistrationAndEditStats({ ...processRegistrationAndEditStats });
              }}
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
                  value={
                    processRegistrationAndEditStats?.stage
                      ? processRegistrationAndEditStats?.stage
                      : processRegistrationAndEditStats?.stage
                  }
                  label='stage'
                  onChange={(e) => {
                    processRegistrationAndEditStats.stage = e.target.value;
                    setProcessRegistrationAndEditStats({ ...processRegistrationAndEditStats });
                  }}>
                  {ALL_PROCESS_STAGES.map((stage) => {
                    return (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    );
                  })}
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
                  value={
                    processRegistrationAndEditStats?.bidType
                      ? processRegistrationAndEditStats?.bidType
                      : processRegistrationAndEditStats?.bidType
                  }
                  label='Bid Type'
                  onChange={(e) => {
                    processRegistrationAndEditStats.bidType = e.target.value;
                    setProcessRegistrationAndEditStats({ ...processRegistrationAndEditStats });
                  }}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onProcessFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleEdit(e)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
