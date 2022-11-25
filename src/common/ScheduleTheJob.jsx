import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, TextField, Tooltip, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { authSelector } from '../features/auth/authSlice';
import { updateClient } from '../features/bids/bidsSlice';

const ScheduleTheJob = ({
  scheduleTheJob,
  setScheduleTheJob,
  schedueJobDate,
  setScheduleJobDate,
  currentClientInfo
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const handleChange = (newValue) => {
    setScheduleJobDate(newValue);
  };

  const handleSchedulingDate = () => {
    dispatch(
      updateClient({
        schedueJobDate: schedueJobDate?.$d?.toString(),
        token: user.token,
        id: currentClientInfo._id
      })
    );
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={scheduleTheJob}>
        <Box
          sx={{
            background: 'white',
            px: 5,
            py: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'black',
            borderRadius: '15px',
            mb: 5
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography sx={{ mb: 3 }}>Schedule The Job</Typography>
            <Tooltip title='Cancel' placement='top'>
              <CloseIcon
                sx={{ ml: 2, cursor: 'pointer' }}
                onClick={() => setScheduleTheJob(false)}
              />
            </Tooltip>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label='Pick A Date'
              inputFormat='MM/DD/YYYY'
              value={schedueJobDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {schedueJobDate && (
            <Button color='error' varient='outlined' sx={{ mt: 2 }} onClick={handleSchedulingDate}>
              Save
            </Button>
          )}
        </Box>
      </Backdrop>
    </>
  );
};

export default ScheduleTheJob;
