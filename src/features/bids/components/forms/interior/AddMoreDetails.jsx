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
import { NONPAINTABLEAREAFIELD, WALL_OPTIONS } from '../../../../../helpers/contants';
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
  initialStats,
  fields,
  currentLabel
}) => {
  const dispatch = useDispatch();
  const handleCreate = () => {
    // For empty fields
    let allFields;
    if (fields.some((x) => x.name === 'description')) {
      allFields = [...fields];
    } else {
      allFields = [...fields, { name: 'name', label: 'Name' }];
    }
    const emptyFields = allFields.filter((x) => !currentStats[x.name]);
    if (emptyFields.length !== 0) {
      return dispatch(
        showMessage({
          message: `${emptyFields[0].name.toUpperCase()} cannot be empty`,
          severity: 'error'
        })
      );
    }

    if (
      titleField !== NONPAINTABLEAREAFIELD &&
      addIn.some((item) => item.name === currentStats.name)
    ) {
      return dispatch(
        showMessage({
          message: `Name '${currentStats.name}' already exists`,
          severity: 'error'
        })
      );
    }

    delete currentStats.clone;

    if (!roomInfoToEdit) {
      addIn.push({
        ...currentStats,
        _id: new Date().getTime().toString(),
        isTotal: titleField === NONPAINTABLEAREAFIELD ? false : undefined
      });
    } else {
      if (roomInfoToEdit.clone) {
        addIn.push({
          ...currentStats,
          _id: new Date().getTime().toString(),
          isTotal: titleField === NONPAINTABLEAREAFIELD ? false : undefined
        });
      } else {
        addIn.splice(
          addIn.findIndex((item) => item._id === roomInfoToEdit._id),
          1,
          { ...currentStats, isTotal: titleField === NONPAINTABLEAREAFIELD ? false : undefined }
        );
      }
    }
    dispatch(
      showMessage({
        message: `${currentLabel.toUpperCase()} Is Updated Successfully.`,
        severity: 'success'
      })
    );

    setRoomInfoToEdit(null);
    setCurrentStats(
      titleField !== NONPAINTABLEAREAFIELD
        ? { ...initialStats, name: '' }
        : { ...initialStats, description: '' }
    );
    setOpenAddMoreDetails(false);
    clearWallStats();
  };

  const onDialogClose = () => {
    setRoomInfoToEdit(null);
    setCurrentStats(
      titleField !== NONPAINTABLEAREAFIELD
        ? { ...initialStats, name: '' }
        : { ...initialStats, description: '' }
    );
    setOpenAddMoreDetails(false);
  };

  useEffect(() => {
    if (roomInfoToEdit) {
      setCurrentStats({ ...roomInfoToEdit });
    }
  }, []);

  return (
    <Dialog
      open={openAddMoreDetails}
      onClose={onDialogClose}
      PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            {roomInfoToEdit ? (!roomInfoToEdit.clone ? 'Edit' : 'Clone') : 'Add New'} {currentLabel}
          </Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        {titleField !== NONPAINTABLEAREAFIELD && (
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                {`${currentLabel.toUpperCase()} NAME`}
              </InputLabel>
              {titleField === 'walls' ? (
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
                    options={WALL_OPTIONS.map((option) => option)}
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
          {fields?.map(({ name, label }) => {
            return (
              <>
                {/* Wall Info Dropdown */}
                {name !== 'wallInfo' ? (
                  <>
                    <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                      <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                        {label}
                      </InputLabel>

                      <TextField
                        InputProps={{
                          style: { height: '30px' }
                        }}
                        name='name'
                        fullWidth
                        type={typeof validationInfo[name] === 'string' ? 'text' : 'number'}
                        variant='outlined'
                        id='outlined-basic'
                        autoFocus
                        value={currentStats[name]}
                        onChange={(event) => {
                          currentStats[name] = event.target.value;
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
                          Wall
                        </InputLabel>
                        <Select
                          labelId='demo-select-small'
                          id='demo-select-small'
                          label='Wall'
                          value={currentStats[name]}
                          onChange={(event) => {
                            currentStats[name] = event.target.value;
                            setCurrentStats({ ...currentStats });
                          }}
                          sx={{ height: '30px' }}>
                          <MenuItem value='Wall-1'>None</MenuItem>
                          {roomStats &&
                            roomStats.walls.map((wall) => {
                              return <MenuItem value={wall.name}>{wall.name}</MenuItem>;
                            })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </>
            );
          })}
          {titleField !== 'walls' && titleField !== NONPAINTABLEAREAFIELD && (
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
        <Button onClick={onDialogClose}>Cancel</Button>{' '}
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
