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
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validationInfo } from '../../../../../common/FormTextField';
import Button from '../../../../../components/Button';
import {
  CEILING_TYPES,
  EXTRA_INFO_WHILE_CLONING,
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
  addIn,
  titleField,
  roomFormValue,
  roomInfoToEdit,
  setRoomInfoToEdit,
  fields,
  currentLabel,
  selectedRoomInfo
}) => {
  const dispatch = useDispatch();
  const [toBeCloned, setToBeCloned] = useState({
    materials: true,
    labours: true
  });
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
          message: `${startCase(emptyFields[0].name)} cannot be empty`,
          severity: 'error'
        })
      );
    }

    if (
      titleField === NONPAINTABLEAREAFIELD &&
      addIn
        ?.filter((item) =>
          roomInfoToEdit?.edit ? item?.description !== currentStats?.description : true
        )
        .some((item) => item.description === currentStats.description)
    ) {
      return dispatch(
        showMessage({
          message: `Description '${currentStats.description}' already exists`,
          severity: 'error'
        })
      );
    }

    if (!roomInfoToEdit && titleField !== NONPAINTABLEAREAFIELD) {
      if (addIn?.some((item) => item.name === currentStats.name))
        return dispatch(
          showMessage({
            message: `Name '${currentStats.name}' already exists`,
            severity: 'error'
          })
        );
    } else {
      if (
        titleField !== NONPAINTABLEAREAFIELD &&
        addIn
          ?.filter((item) => (roomInfoToEdit.edit ? item.name !== currentStats.name : true))
          ?.some((item) => item.name === currentStats.name)
      ) {
        return dispatch(
          showMessage({
            message: `Name '${currentStats.name}' already exists`,
            severity: 'error'
          })
        );
      }
    }

    if (!roomInfoToEdit) {
      addIn?.push({
        ...currentStats
      });
      addIn?.forEach((item) => {
        delete item._id;
      });
    } else {
      if (roomInfoToEdit.edit) {
        delete currentStats._id;
        addIn?.splice(
          addIn.findIndex((item) =>
            titleField !== NONPAINTABLEAREAFIELD
              ? item.name === roomInfoToEdit.name
              : item.description === roomInfoToEdit.description
          ),
          1,
          { ...currentStats }
        );
        addIn.forEach((item) => {
          delete item._id;
        });
      } else {
        delete currentStats._id;
        Object.keys(toBeCloned).forEach((item) => {
          if (!toBeCloned[item]) {
            currentStats[item] = {};
          }
        });
        addIn?.push({
          ...currentStats
        });
        addIn.forEach((item) => {
          delete item._id;
        });
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

  console.log(currentStats, 'addInaddIn');

  return (
    <Dialog open={openAddMoreDetails} PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            {roomInfoToEdit ? (!roomInfoToEdit.edit ? 'Clone' : 'Edit') : 'Add New'} {currentLabel}
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
                          {roomFormValue &&
                            roomFormValue.walls.map((wall) => {
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
          <Grid container>
            {titleField !== 'walls' &&
              titleField !== NONPAINTABLEAREAFIELD &&
              titleField !== 'baseboardTrims' &&
              titleField !== 'windowTrims' && (
                <Grid xs={4} md={4} mt={2}>
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
                          Paint
                        </InputLabel>
                      }
                    />
                  </FormGroup>
                </Grid>
              )}
            {EXTRA_INFO_WHILE_CLONING.map((info) => {
              return (
                <>
                  {roomInfoToEdit && !roomInfoToEdit.edit && currentStats[info.field] && (
                    <Grid xs={4} mt={2}>
                      <FormGroup>
                        <FormControlLabel
                          sx={{ position: 'relative', ml: 0.8 }}
                          control={<Checkbox defaultChecked />}
                          checked={toBeCloned[info.field]}
                          disabled={!toBeCloned[info.field]}
                          onChange={(event) => {
                            toBeCloned[info.field] = event.target.checked;
                            setToBeCloned({ ...toBeCloned });
                          }}
                          label={
                            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                              {info.text}
                            </InputLabel>
                          }
                        />
                      </FormGroup>
                    </Grid>
                  )}
                </>
              );
            })}
          </Grid>
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
