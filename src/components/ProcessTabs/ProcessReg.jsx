import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProcess, reset } from '../../features/process/processSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { ALL_PROCESS_STAGES } from '../../helpers/contants';

export default function FormDialog({
  filteredProcesses,
  processRegistrationAndEditStats,
  setProcessRegistrationAndEditStats,
  onProcessFormClose
}) {
  const { processList, isSuccess } = useSelector((state) => state.process);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    if (
      !processRegistrationAndEditStats.description ||
      !processRegistrationAndEditStats.bidType ||
      !processRegistrationAndEditStats.stage
    ) {
      return dispatch();
    }
    showMessage({
      message: `Description cannot be empty`,
      severity: 'error'
    });
    const processRegistrationAndEditStatsWithToken = {
      ...processRegistrationAndEditStats,
      ID: processList[0]._id,
      previousProcesses: processList[0].processes,
      add: true,
      token: userDetail.token
    };
    if (
      filteredProcesses.some((process) => {
        return (
          process.description.toLowerCase().trim() ===
          processRegistrationAndEditStats.description.toLowerCase().trim()
        );
      })
    ) {
      dispatch(
        showMessage({
          message: 'Process Already Exists',
          variant: 'info',
          severity: 'info'
        })
      );
    } else {
      dispatch(createProcess(processRegistrationAndEditStatsWithToken));
    }

    onProcessFormClose();
  };
  useEffect(() => {
    if (isSuccess) {
      onProcessFormClose();
      dispatch(
        showMessage({
          message: 'Process Updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);
  console.log(processRegistrationAndEditStats, 'processRegistrationAndEditStats');

  return (
    <Dialog
      open={
        processRegistrationAndEditStats !== null &&
        !Object.keys(processRegistrationAndEditStats).includes('_id')
      }
      onClose={onProcessFormClose}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Typography variant='h6'>Add New Process</Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} md={12}>
          <InputLabel id='demo-select-small'>Description</InputLabel>

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
            value={processRegistrationAndEditStats?.description}
            onChange={(e) => {
              processRegistrationAndEditStats.description = e.target.value;
              setProcessRegistrationAndEditStats({ ...processRegistrationAndEditStats });
            }}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <FormControl sx={{ m: 0, minWidth: 240, maxHeight: 30, marginTop: 3 }} size='small'>
              <InputLabel id='demo-select-small'>Stage</InputLabel>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                name='stage'
                value={processRegistrationAndEditStats?.stage}
                label='stage'
                onChange={(e) => {
                  processRegistrationAndEditStats.stage = e.target.value;
                  setProcessRegistrationAndEditStats({ ...processRegistrationAndEditStats });
                }}
                required>
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
            <FormControl sx={{ m: 0, minWidth: 240, maxHeight: 30, marginTop: 3 }} size='small'>
              <InputLabel id='demo-select-small'>Bid Type</InputLabel>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                name='bidType'
                value={processRegistrationAndEditStats?.bidType}
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
        <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
