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
import {
  CEILING_TYPES,
  NONPAINTABLEAREAFIELD,
  WALL_OPTIONS,
  WALL_TYPES
} from '../../../../../helpers/contants';
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
  fields,
  currentLabel,
  selectedRoomInfo
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
      addIn
        .filter((item) => item._id !== currentStats._id)
        .some((item) => item.name === currentStats.name)
    ) {
      return dispatch(
        showMessage({
          message: `Name '${currentStats.name}' already exists`,
          severity: 'error'
        })
      );
    }

    if (!roomInfoToEdit) {
      addIn.push({
        ...currentStats,
        _id: Date.now().toString(),
        isTotal: titleField === NONPAINTABLEAREAFIELD ? false : undefined
      });
    } else {
      if (!roomInfoToEdit._id) {
        addIn.push({
          ...currentStats,
          _id: Date.now().toString(),
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
    setOpenAddMoreDetails(false);
    clearWallStats();
  };

  const onDialogClose = () => {
    setRoomInfoToEdit(null);
    setOpenAddMoreDetails(false);
  };

  useEffect(() => {
    if (roomInfoToEdit) {
      setCurrentStats({ ...roomInfoToEdit });
    }
  }, [roomInfoToEdit, selectedRoomInfo]);

  return (
    <Dialog open={openAddMoreDetails} PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            {roomInfoToEdit ? (!roomInfoToEdit._id ? 'Clone' : 'Edit') : 'Add New'} {currentLabel}
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
                {(name === 'wallType' || name === 'type') && (
                  <Grid item xs={6} md={6} mt={1}>
                    <FormControl sx={{ width: '100%' }} size='small'>
                      <InputLabel id='demo-select-small' sx={{ marginTop: '-5px' }}>
                        {name === 'wallType' ? 'Wall Type' : 'Ceiling Type'}
                      </InputLabel>
                      <Select
                        labelId='demo-select-small'
                        id='demo-select-small'
                        label={name === 'wallType' ? 'Wall Type' : 'Ceiling Type'}
                        value={currentStats[name]}
                        onChange={(event) => {
                          currentStats[name] = event.target.value;
                          setCurrentStats({ ...currentStats });
                        }}
                        sx={{ height: '30px' }}>
                        {(name === 'wallType' ? WALL_TYPES : CEILING_TYPES).map((wall) => {
                          return <MenuItem value={wall}>{wall}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Wall Info Dropdown */}
                {name !== 'wallInfo' ? (
                  <>
                    {name !== 'type' && name !== 'wallType' && (
                      <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                        <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                          {label}
                        </InputLabel>

                        <TextField
                          InputProps={{
                            style: { height: '30px' },
                            inputProps: { min: 0 }
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
                    )}
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
                          <MenuItem value='None'>None</MenuItem>
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

          {titleField !== 'walls' &&
            titleField !== NONPAINTABLEAREAFIELD &&
            titleField !== 'baseboardTrims' &&
            titleField !== 'windowTrims' && (
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
