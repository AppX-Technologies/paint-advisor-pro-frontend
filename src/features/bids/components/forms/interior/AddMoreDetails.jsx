import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
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
  titleField,
  roomStats,
  roomInfoToEdit,
  setRoomInfoToEdit,
  initialStats
}) => {
  const dispatch = useDispatch();
  const currentFields =
    currentStats &&
    Object.keys(currentStats).filter(
      (item) =>
        item !== '_id' &&
        item !== titleField &&
        item !== 'paint' &&
        item !== 'name' &&
        item !== 'isTotal'
    );

  const handleCreate = () => {
    // For empty fields
    let allFields;
    if (currentFields.includes('description')) {
      allFields = [...currentFields];
    } else {
      allFields = [...currentFields, 'name'];
    }
    const emptyFields = allFields.filter((x) => !currentStats[x]);
    if (emptyFields.length !== 0) {
      return dispatch(
        showMessage({
          message: `${emptyFields[0].toUpperCase()} cannot be empty`,
          severity: 'error'
        })
      );
    }
    setOpenAddMoreDetails(false);
    if (!roomInfoToEdit) {
      if (titleField === 'nonPaintableArea') {
        addIn.push({ ...currentStats, _id: new Date().getTime().toString(), isTotal: false });

        return setCurrentStats(initialStats);
      }
      addIn.push({ ...currentStats, _id: new Date().getTime().toString() });
      return setCurrentStats(initialStats);
    }

    if (titleField === 'nonPaintableArea') {
      addIn.splice(
        addIn.findIndex((item) => item._id === roomInfoToEdit._id),
        1,
        { ...currentStats, isTotal: false }
      );
      setRoomInfoToEdit(null);
      return setCurrentStats(initialStats);
    }

    addIn.splice(
      addIn.findIndex((item) => item._id === roomInfoToEdit._id),
      1,
      currentStats
    );
    setRoomInfoToEdit(null);
    setCurrentStats(initialStats);
    clearWallStats();
  };

  const wallOptions = ['North', 'South', 'East', 'West'];
  useEffect(() => {
    if (roomInfoToEdit) {
      Object.keys(roomInfoToEdit).forEach((stats) => {
        currentStats[stats] = roomInfoToEdit[stats];
      });
      setCurrentStats({ ...currentStats });
    }
  }, []);

  return (
    <Dialog
      open={openAddMoreDetails}
      onClose={() => setOpenAddMoreDetails(false)}
      PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            {roomInfoToEdit ? 'Edit' : 'Add New'} {titleField.toUpperCase()}
          </Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        {titleField !== 'nonPaintableArea' && (
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                {`${titleField.toUpperCase()} NAME`}
              </InputLabel>
              {titleField === 'wall' ? (
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                    id='free-solo-demo'
                    size='small'
                    inputValue={currentStats.name}
                    freeSolo
                    onInputChange={(event, newInputValue) => {
                      currentStats.name = newInputValue;
                      setCurrentStats({ ...currentStats });
                    }}
                    sx={{ width: '100%' }}
                    options={wallOptions.map((option) => option)}
                    renderInput={(params) => <TextField {...params} label='Wall' />}
                  />
                </Stack>
              ) : (
                <TextField
                  InputProps={{
                    style: { height: '30px' }
                  }}
                  fullWidth
                  variant='outlined'
                  list='browsers'
                  name='browser'
                  id='browser'
                  autoFocus
                  value={currentStats.name}
                  onChange={(event) => {
                    currentStats.name = event.target.value;
                    setCurrentStats({ ...currentStats });
                  }}
                />
              )}
            </Grid>
          </Grid>
        )}
        <Typography sx={{ color: 'gray', fontWeight: '500', fontSize: '14px', mt: 1 }}>
          General Info:
        </Typography>
        <Grid container spacing={2} mt={0.5}>
          {currentFields.map((currentField) => {
            return (
              <>
                {/* Wall Info Dropdown */}
                {currentField !== 'wallInfo' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Grid item xs={6} md={6} mt={1}>
                      <FormControl sx={{ width: '100%' }} size='small'>
                        <InputLabel id='demo-select-small' sx={{ marginTop: '-5px' }}>
                          WALLINFO
                        </InputLabel>
                        <Select
                          labelId='demo-select-small'
                          id='demo-select-small'
                          label='WALLINFO'
                          value={currentStats[currentField]}
                          onChange={(event) => {
                            currentStats[currentField] = event.target.value;
                            setCurrentStats({ ...currentStats });
                          }}
                          sx={{ height: '30px' }}>
                          {roomStats &&
                            roomStats.walls.map((wall) => {
                              return <MenuItem value={wall.height}>{wall.name}</MenuItem>;
                            })}
                          <MenuItem value='Wall-1'>Wall-1</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </>
            );
          })}
          {titleField !== 'wall' && titleField !== 'nonPaintableArea' && (
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
