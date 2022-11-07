import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../features/auth/authSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { createUsers, fetchUsers, reset, userSelector } from '../../features/users/userSlice';
import formReducer from './reducers/formReducer';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  role: 'Admin'
};

export default function CreateUserForm(props) {
  const dispatch = useDispatch();
  const [formState, dispatchNew] = React.useReducer(formReducer, initialFormState);
  const { open, setOpen } = props;
  const { user } = useSelector(authSelector);
  const { isSuccess, isLoading } = useSelector(userSelector);
  const handleTextChange = (e) => {
    dispatchNew({
      type: 'HANDLE_FORM_INPUT',
      field: e.target.name,
      payload: e.target.value
    });
  };
  const handleClose = () => {
    setOpen(false);
    Object.keys(formState).forEach((key) => {
      dispatchNew({
        type: 'HANDLE_FORM_INPUT',
        field: key,
        payload: ''
      });
    });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const formStateWithToken = {
      ...formState,
      token: user.token
    };
    dispatch(createUsers(formStateWithToken));
    dispatch(fetchUsers(user.token));
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(
        showMessage({
          message: 'User created successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>Add New User</Typography>
            <CircularProgress
              color='primary'
              size={25}
              style={{ display: isLoading ? 'block' : 'none' }}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='name'
                required
                fullWidth
                variant='standard'
                id='name'
                label='Name'
                autoFocus
                value={formState.name}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                required
                fullWidth
                variant='standard'
                id='email'
                label='Email'
                autoFocus
                value={formState.email}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='phone'
                required
                fullWidth
                variant='standard'
                id='phone'
                label='Phone Number'
                autoFocus
                value={formState.phone}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={(e) => handleCreate(e)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
