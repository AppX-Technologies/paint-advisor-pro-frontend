import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { validationInfo } from '../../../../../common/FormTextField';
import Button from '../../../../../components/Button';
import { showMessage } from '../../../../snackbar/snackbarSlice';

const AddMoreDetails = ({
  setOpenAddMoreDetails,
  openAddMoreDetails,
  currentStats,
  setCurrentStats,
  clearWallStats,
  addIn,
  titleField
}) => {
  const dispatch = useDispatch();
  const currentFields =
    currentStats &&
    Object.keys(currentStats).filter(
      (item) => item !== '_id' && item !== titleField && item !== 'paint'
    );
  const handleCreate = () => {
    console.log(currentStats);
    // For empty fields
    const emptyFields = currentFields.some((item) => !currentStats[item]);
    if (emptyFields) {
      return dispatch(
        showMessage({
          message: 'Please fill all details',
          severity: 'error'
        })
      );
    }

    // for invalid inputs
    // currentFields.forEach((item) => {
    //   console.log(typeof currentStats[item], typeof validationInfo[item], item);
    //   if (typeof currentStats[item] !== typeof validationInfo[item]) {
    //     throw dispatch(
    //       showMessage({
    //         message: `Please enter a valid ${item}`,
    //         severity: 'error'
    //       })
    //     );
    //   }
    // });
    setOpenAddMoreDetails(false);

    addIn.push({ ...currentStats, _id: new Date().getTime().toString() });
    clearWallStats();
  };
  return (
    <Dialog
      open={openAddMoreDetails}
      onClose={() => setOpenAddMoreDetails(false)}
      PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            Add New {titleField.toUpperCase()}
          </Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              {`${titleField.toUpperCase()} NAME`}
            </InputLabel>

            <TextField
              InputProps={{
                style: { height: '30px' }
              }}
              name='name'
              fullWidth
              variant='outlined'
              id='outlined-basic'
              autoFocus
              value={currentStats[titleField]}
              onChange={(event) => {
                currentStats[titleField] = event.target.value;
                setCurrentStats({ ...currentStats });
              }}
            />
          </Grid>
        </Grid>
        <Typography sx={{ color: 'gray', fontWeight: '500', fontSize: '14px', mt: 1 }}>
          General Info:
        </Typography>
        <Grid container spacing={2} mt={0.5}>
          {currentFields.map((currentField) => {
            return (
              <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                  {currentField.toUpperCase()}
                </InputLabel>

                <TextField
                  InputProps={{
                    style: { height: '30px' }
                  }}
                  name='name'
                  fullWidth
                  type={typeof validationInfo[currentField] === 'string' ? 'text' : 'number'}
                  variant='outlined'
                  id='outlined-basic'
                  autoFocus
                  value={currentStats[currentField]}
                  onChange={(event) => {
                    currentStats[currentField] = event.target.value;
                    setCurrentStats({ ...currentStats });
                  }}
                />
              </Grid>
            );
          })}
          {titleField !== 'wall' && (
            <Grid xs={6} md={6} mt={2}>
              <FormGroup>
                <FormControlLabel
                  sx={{ position: 'relative', ml: 0.8 }}
                  control={<Checkbox defaultChecked />}
                  checked={currentStats.paint}
                  onChange={(event) => {
                    currentStats.paint = event.target.checked;
                    setCurrentStats({ ...currentStats });
                  }}
                  label={
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      PAINT
                    </InputLabel>
                  }
                />
              </FormGroup>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddMoreDetails(false)}>Cancel</Button>{' '}
        <Button
          onClick={() => {
            handleCreate();
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
