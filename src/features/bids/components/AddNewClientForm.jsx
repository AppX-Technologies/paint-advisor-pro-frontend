import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { isSystemUser } from '../../../helpers/roles';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { createClient, reset, updateClient } from '../bidsSlice';

export default function AddNewClientForm(props) {
  const {
    open,
    handleClose,
    selectedValue,
    setSelectedvalue,
    currentClientInfoToEdit,
    setCurrentClientInfoToEdit
  } = props;

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector((state) => state.bids);
  const { user } = useSelector(authSelector);
  const { companyId } = useParams();

  const [orgId] = React.useState(isSystemUser(user) ? companyId : user.organization._id);

  const handleFormSubmission = () => {
    const emptyFields = Object.keys(selectedValue).find((item) => selectedValue[item] === '');
    if (emptyFields) {
      return dispatch(
        showMessage({
          message: `'${emptyFields.toUpperCase()}' Field Cannot Be Empty`,
          severity: 'error'
        })
      );
    }

    if (selectedValue._id) {
      dispatch(updateClient({ ...selectedValue, id: selectedValue._id, token: user.token }));
    } else {
      dispatch(createClient({ ...selectedValue, organization: orgId, token: user.token }));
    }

    setCurrentClientInfoToEdit(null);
  };

  useEffect(() => {
    if (isSuccess && isError) {
      handleClose();
      dispatch(reset());
    }
  }, [isSuccess]);
  useEffect(() => {
    if (open && currentClientInfoToEdit) {
      setSelectedvalue({ ...currentClientInfoToEdit });
    }
  }, [open]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar sx={{ backgroundColor: '#D50000' }}>
          <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
            Add New Client{' '}
          </Typography>

          <Button
            variant='contained'
            color='info'
            disabled={isLoading}
            style={{
              height: '30px',
              padding: '3px'
            }}
            onClick={handleClose}>
            Close <CloseIcon sx={{ height: '15px' }} />
          </Button>
        </Toolbar>
        {isLoading && <LinearProgress color='success' />}

        <DialogContent>
          <Grid container spacing={2}>
            {AddNewClientTextField.map((item) => {
              const fieldType = item.name;
              return (
                (item.dataType === 'text' && (
                  <Grid item xs={10} md={item.resizeable ? 1.33 : 4} sx={{ marginTop: '-10px' }}>
                    <>
                      <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                        {item.label}
                      </InputLabel>

                      <TextField
                        InputProps={{
                          style: {
                            height: '30px',
                            width: item.resizeable ? '130px' : 'auto'
                          }
                        }}
                        name={item.name}
                        fullWidth
                        variant='outlined'
                        id='outlined-basic'
                        autoFocus
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                      />
                    </>
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                      <Select
                        displayEmpty
                        sx={{ height: '30px' }}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        name={item.name}
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}>
                        {item.option.map((o) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )) ||
                (item.dataType === 'date' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        InputProps={{
                          style: { height: '30px' }
                        }}
                        inputFormat='MM/DD/YYYY'
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                )) ||
                (item.dataType === 'dateTime' && (
                  <Grid item xs={4} md={4} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        InputProps={{
                          style: { height: '30px' }
                        }}
                        value={selectedValue[fieldType]}
                        onChange={(event) => {
                          selectedValue[fieldType] = event.target.value;
                          setSelectedvalue({ ...selectedValue });
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                ))
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isLoading}
            onClick={handleFormSubmission}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
