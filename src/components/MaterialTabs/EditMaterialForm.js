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
import { startCase } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterial } from '../../features/materials/materialSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {
  FIELDS_WHERE_MATERIALS_ARE_APPLIES,
  POPULAR_UNITS_OF_MEASUREMENT
} from '../../helpers/contants';
import formReducer from '../DashboardTabs/reducers/formReducer';

export default function Edit(props) {
  React.useState(false);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { openEditForm, setOpenEditForm, editFormData } = props;

  const initialFormState = {
    description: editFormData.description ? editFormData.description : '',
    unit: editFormData.unit ? editFormData.unit : '',
    unitPrice: editFormData.unitPrice ? editFormData.unitPrice : '',
    bidType: editFormData.bidType ? editFormData.bidType : '',
    appliesTo: editFormData?.appliesTo ? [...editFormData.appliesTo] : []
  };

  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { materialList } = useSelector((state) => state.material);

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
    const emptyField = Object.keys(formState).find((state) =>
      typeof formState[state] === 'string'
        ? formState[state] === ''
        : typeof formState[state] === 'number'
        ? formState[state] === 0
        : !formState[state].length
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
      ...formState,
      ID: materialList[0]._id,
      previousMaterials: materialList[0].materials.filter(
        (previousMaterials) => previousMaterials._id !== editFormData._id
      ),
      add: true,
      token: userDetail.token
    };
    dispatch(createMaterial(formStateWithToken));
    setOpenEditForm(false);
  };

  const handleMaterialApplicableSection = (field) => {
    if (formState.appliesTo.includes(field)) {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: [...formState.appliesTo.filter((item) => item !== field)]
      });
    } else {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: [...formState.appliesTo, field]
      });
    }
  };

  const handleMaterialApplication = () => {
    if (formState.appliesTo.length === 0) {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: FIELDS_WHERE_MATERIALS_ARE_APPLIES.map((materialSection) => materialSection.label)
      });
    } else {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: 'appliesTo',
        payload: []
      });
    }
  };

  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
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
              value={formState.description}
              onChange={(e) => handleTextChange(e)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '13px' }}>
            <Grid item xs={6} md={3} mt={2}>
              <Autocomplete
                size='small'
                disableCloseOnSelect
                inputValue={formState.unit}
                variant='standard'
                freeSolo
                onInputChange={(event, newInputValue) => {
                  dispatchNew({
                    type: 'HANDLE_FORM_INPUT',
                    field: 'unit',
                    payload: newInputValue
                  });
                }}
                id='disable-list-wrap'
                options={POPULAR_UNITS_OF_MEASUREMENT.map((option) => option)}
                renderInput={(params) => <TextField {...params} label='Units' variant='standard' />}
              />
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
                value={formState.unitPrice ? formState.unitPrice : ''}
                onChange={(e) => handleTextChange(e)}
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
                  value={formState.bidType ? formState.bidType : editFormData.bidType}
                  label='Bid Type'
                  onChange={(e) => handleTextChange(e)}>
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
                    formState.appliesTo.length === 0
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
                      color: formState.appliesTo.length === 0 ? 'green' : 'gray'
                    }}
                  />
                </Tooltip>
              </Box>
              <Grid container>
                {FIELDS_WHERE_MATERIALS_ARE_APPLIES.map((field) => {
                  return (
                    <Grid xs={4} md={3}>
                      <Chip
                        color={formState.appliesTo.includes(field.label) ? 'error' : 'default'}
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
                            {formState.appliesTo.includes(field.label) && (
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
                          !formState.appliesTo.includes(field.label) &&
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleEdit(e)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
