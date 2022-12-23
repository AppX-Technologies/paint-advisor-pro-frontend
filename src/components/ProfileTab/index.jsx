import { Email, EmailOutlined, LocalPhone, Visibility, VisibilityOff } from '@mui/icons-material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TableContainer,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSelector,
  changePassword,
  updateUserDetails,
  reset
} from '../../features/auth/authSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import Button from '../Button';

const passWordFields = [
  { name: 'newPassword', label: 'New Password' },
  { name: 'confirmPassword', label: 'Confirm Password' },
  { name: 'oldPassword', label: 'Old Password' }
];

const profileFields = [
  { name: 'name', label: 'User Name', icon: <PersonIcon fontSize='inherit' /> },
  { name: 'email', label: 'Email', icon: <EmailOutlined fontSize='inherit' /> },
  { name: 'role', label: 'Role', icon: <Diversity3Icon fontSize='inherit' /> },
  { name: 'phone', label: 'Phone Number', icon: <LocalPhone fontSize='inherit' /> }
];

const Profile = () => {
  const { user, isLoading, isPasswordChanged, isUserDetailChanged, isPasswordChanging } =
    useSelector(authSelector);
  const [editMode, setEditMode] = useState(true);
  const [viewPassword, setViewPassword] = useState({
    newPassword: false,
    confirmPassword: false,
    oldPassword: false
  });
  const [userDetail, setuserDetail] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setuserDetail({ ...userDetail, name: user?.name, phone: user?.phone });
  }, [user]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdateUserDetail = () => {
    dispatch(
      updateUserDetails({
        token: user.token,
        email: user.email,
        phone: userDetail.phone,
        name: userDetail.name
      })
    );
  };

  const handleChangePassword = () => {
    if (!userDetail.confirmPassword || !userDetail.newPassword || !userDetail.oldPassword) {
      return dispatch(
        showMessage({
          message: 'Fill password',
          severity: 'error'
        })
      );
    }
    if (userDetail.confirmPassword !== userDetail.newPassword) {
      return dispatch(
        showMessage({
          message: 'Recheck password',
          severity: 'error'
        })
      );
    }
    dispatch(
      changePassword({
        token: user.token,
        oldPassword: userDetail.oldPassword,
        newPassword: userDetail.newPassword
      })
    );
  };

  useEffect(() => {
    if (isUserDetailChanged) {
      setuserDetail({});
      setEditMode(!editMode);
      dispatch(
        showMessage({
          message: 'User Detail Updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isUserDetailChanged]);

  useEffect(() => {
    if (isPasswordChanged) {
      setuserDetail(null);
      dispatch(
        showMessage({
          message: 'Password Changed successfully',
          variant: 'success'
        })
      );
    }
  }, [isPasswordChanged]);

  return (
    <Box sx={{ display: 'flex' }} pt={5} container>
      <Box sx={{ width: '70px' }}>
        <AccountCircleIcon sx={{ fontSize: '50px', ml: 2 }} />
      </Box>
      <TableContainer sx={{ p: 3, pt: 1, m: 2, mt: 0, mr: 3 }} component={Paper}>
        <Box
          pt={1}
          pl={1}
          pb={1}
          pr={2}
          sx={{ width: '100%', borderRadius: '15px', marginLeft: '-15px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '350' }}>
              Profile Details {isLoading && <CircularProgress size={18} />}
            </Typography>
            {!editMode ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={isLoading}
                  variant='contained'
                  sx={{ p: 0, mr: 2 }}
                  onClick={() => setEditMode(!editMode)}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='success'
                  disabled={isLoading}
                  sx={{ p: 0 }}
                  onClick={() => handleUpdateUserDetail()}>
                  Save
                </Button>
              </Box>
            ) : (
              <Button
                variant='contained'
                color='success'
                sx={{ p: 0 }}
                onClick={() => setEditMode(!editMode)}>
                Edit
              </Button>
            )}
          </Box>

          <Divider />
          <Box mt={1}>
            {editMode ? (
              <Box sx={{ display: 'flex', mt: 1 }}>
                {profileFields.map((field, index) => {
                  return (
                    <Box key={field.name} sx={{ width: '49%' }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: '300', ml: 1 }}>
                        {field.label}:
                      </Typography>
                      <Alert
                        sx={{ padding: '2px 10px', mt: 1, ml: index !== 0 && 1 }}
                        icon={field.icon}
                        severity='primary'>
                        {user?.[field.name]}
                      </Alert>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', mt: 3 }}>
                <TextField
                  name='name'
                  disabled={editMode}
                  variant='standard'
                  value={userDetail?.name ?? user?.name}
                  label={<Typography sx={{ fontSize: '13px' }}>Name</Typography>}
                  onChange={(e) => setuserDetail({ ...userDetail, name: e.target.value })}
                  sx={{ width: '94%' }}
                />
                <TextField
                  sx={{ ml: 2 }}
                  name='phone'
                  disabled={editMode}
                  label={<Typography sx={{ fontSize: '13px' }}>Phone Number</Typography>}
                  value={userDetail?.phone ?? user?.phone}
                  onChange={(e) => setuserDetail({ ...userDetail, phone: e.target.value })}
                  variant='standard'
                  fullWidth
                />
              </Box>
            )}
          </Box>
          <Box mt={2}>
            <Typography sx={{ fontSize: '18px', fontWeight: '350' }}>Password Change</Typography>
            <Divider />
            <Box mt={3}>
              {passWordFields.map((field, index) => {
                return (
                  <FormControl sx={{ width: '48%', ml: index === 1 && 2, mt: index === 2 && 2 }}>
                    <InputLabel sx={{ marginLeft: '-15px', fontSize: '14px' }}>
                      {field.label}
                    </InputLabel>
                    <Input
                      name={field.name}
                      type={viewPassword[field.name] ? 'text' : 'password'}
                      variant='standard'
                      value={userDetail?.[field.name] || ''}
                      onChange={(e) =>
                        setuserDetail({ ...userDetail, [field.name]: e.target.value })
                      }
                      fullWidth
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() =>
                              setViewPassword({
                                ...viewPassword,
                                [field.name]: !viewPassword[field.name]
                              })
                            }
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            {viewPassword[field.name] ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                );
              })}
            </Box>
          </Box>
          <Button
            variant='contained'
            disabled={isPasswordChanging}
            color='success'
            sx={{ padding: '2px 10px 2px 10px', mt: 3 }}
            onClick={() => handleChangePassword()}>
            Change
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Profile;
