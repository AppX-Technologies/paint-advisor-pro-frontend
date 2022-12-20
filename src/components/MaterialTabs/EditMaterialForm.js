import FormatPaintIcon from '@mui/icons-material/FormatPaintOutlined';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { cloneDeep, startCase } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {
  FIELDS_WHERE_MATERIALS_ARE_APPLIES,
  POPULAR_UNITS_OF_MEASUREMENT
} from '../../helpers/contants';

export default function Edit({
  materialRegistrationAndEditStats,
  setMaterialRegistrationAndEditStats,
  onMaterialFormClose
}) {
  React.useState(false);
  const userDetail = JSON.parse(localStorage.getItem('user'));

  const { materialList } = useSelector((state) => state.material);

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    const emptyField = Object.keys(materialRegistrationAndEditStats)
      .filter((item) => item !== '__v')
      .find((state) =>
        typeof materialRegistrationAndEditStats[state] === 'string'
          ? materialRegistrationAndEditStats[state] === ''
          : typeof materialRegistrationAndEditStats[state] === 'number'
          ? materialRegistrationAndEditStats[state] === 0
          : !materialRegistrationAndEditStats[state]?.length
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
      ...materialRegistrationAndEditStats,
      ID: materialList[0]?._id,
      previousMaterials: materialList[0].materials.filter(
        (previousMaterials) => previousMaterials?._id !== materialRegistrationAndEditStats?._id
      ),
      add: true,
      token: userDetail.token
    };
    dispatch(createMaterial(formStateWithToken));
    onMaterialFormClose();
  };

  const handleMaterialApplicableSection = (field) => {
    const materialRegistrationAndEditStatsCopy = cloneDeep(materialRegistrationAndEditStats);
    if (materialRegistrationAndEditStatsCopy.appliesTo.includes(field)) {
      materialRegistrationAndEditStatsCopy.appliesTo = [
        ...materialRegistrationAndEditStatsCopy.appliesTo.filter((item) => item !== field)
      ];
    } else {
      materialRegistrationAndEditStatsCopy.appliesTo = [
        ...materialRegistrationAndEditStatsCopy.appliesTo,
        field
      ];
    }
    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStatsCopy });
  };

  const handleMaterialApplication = () => {
    if (materialRegistrationAndEditStats.appliesTo.length === 0) {
      materialRegistrationAndEditStats.appliesTo = FIELDS_WHERE_MATERIALS_ARE_APPLIES.map(
        (materialSection) => materialSection.label
      );
    } else {
      materialRegistrationAndEditStats.appliesTo = [];
    }
    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
  };

  return (
    <div>
      <Dialog
        open={
          materialRegistrationAndEditStats !== null &&
          Object.keys(materialRegistrationAndEditStats).includes('_id')
        }
        onClose={onMaterialFormClose}>
        <DialogTitle>
          Edit Paint
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
              id='material'
              label='Paint Description'
              autoFocus
              value={materialRegistrationAndEditStats?.description}
              onChange={(e) => {
                materialRegistrationAndEditStats.description = e.target.value;
                setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '13px' }}>
            <Grid item xs={6} md={3} mt={2}>
              {materialRegistrationAndEditStats && (
                <Autocomplete
                  size='small'
                  disableCloseOnSelect
                  inputValue={materialRegistrationAndEditStats?.unit}
                  variant='standard'
                  freeSolo
                  onInputChange={(event, newInputValue) => {
                    materialRegistrationAndEditStats.unit = newInputValue;
                    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                  }}
                  id='disable-list-wrap'
                  options={
                    POPULAR_UNITS_OF_MEASUREMENT.length
                      ? POPULAR_UNITS_OF_MEASUREMENT.map((option) => option)
                      : []
                  }
                  renderInput={(params) => (
                    <TextField {...params} label='Units' variant='standard' />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={3} md={3}>
              <TextField
                name='unitPrice'
                required
                fullWidth
                aria-label='minimum height'
                minRows={3}
                variant='standard'
                id='pricePerUnit'
                label='Price per Unit'
                autoFocus
                value={
                  materialRegistrationAndEditStats?.unitPrice
                    ? materialRegistrationAndEditStats?.unitPrice
                    : ''
                }
                onChange={(e) => {
                  materialRegistrationAndEditStats.unitPrice = e.target.value;
                  setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                }}
                style={{ width: '100%', marginTop: '13px' }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl sx={{ m: 0, minWidth: 235, maxHeight: 30, marginTop: 3 }} size='small'>
                <InputLabel id='demo-select-small'>Bid Type</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='bidType'
                  value={
                    materialRegistrationAndEditStats?.bidType
                      ? materialRegistrationAndEditStats?.bidType
                      : materialRegistrationAndEditStats?.bidType
                  }
                  label='Bid Type'
                  onChange={(e) => {
                    materialRegistrationAndEditStats.bidType = e.target.value;
                    setMaterialRegistrationAndEditStats({ ...materialRegistrationAndEditStats });
                  }}>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'gray', fontWeight: 390, mb: 1 }}>
                  Paint Applied To
                </Typography>
                <Tooltip
                  placement='top'
                  title={
                    materialRegistrationAndEditStats?.appliesTo.length === 0
                      ? 'Apply To  All Sections'
                      : 'Remove From All Sections'
                  }>
                  <FormatPaintIcon
                    onClick={handleMaterialApplication}
                    sx={{
                      width: '16px',
                      height: '16px',
                      ml: 1,
                      cursor: 'pointer',
                      color:
                        materialRegistrationAndEditStats?.appliesTo.length === 0 ? 'green' : 'gray'
                    }}
                  />
                </Tooltip>
              </Box>
              <Grid container>
                {FIELDS_WHERE_MATERIALS_ARE_APPLIES.map((field) => {
                  return (
                    <Grid xs={4} md={3}>
                      <Chip
                        color={
                          materialRegistrationAndEditStats?.appliesTo.includes(field.label)
                            ? 'error'
                            : 'default'
                        }
                        label={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                            <Typography sx={{ fontSize: '14px' }}>
                              {startCase(field.label)}
                            </Typography>
                            {materialRegistrationAndEditStats?.appliesTo.includes(field.label) && (
                              <Tooltip title='Remove From Applies To' placement='top'>
                                <CancelIcon
                                  sx={{ width: '14px', height: '16px', ml: 0.5 }}
                                  onClick={() => handleMaterialApplicableSection(field.label)}
                                />
                              </Tooltip>
                            )}
                          </Box>
                        }
                        variant='outlined'
                        onClick={() =>
                          !materialRegistrationAndEditStats?.appliesTo.includes(field.label) &&
                          handleMaterialApplicableSection(field.label)
                        }
                        sx={{
                          height: '20px',
                          width: '96%',
                          bgcolor: 'transparent',
                          m: 0.5,
                          '&:hover': {
                            bgcolor: 'black'
                          }
                        }}
                        size='small'
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onMaterialFormClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleEdit(e)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
