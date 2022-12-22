import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetail, setuserDetail] = useState({});
  console.log(userDetail);
  return (
    <Grid container sx={{ padding: '10px' }}>
      <Grid xs={1} md={1} lg={1}>
        <AccountCircleIcon sx={{ fontSize: '80px' }} />
      </Grid>
      <Grid xs={11} md={11} lg={11}>
        <Box ml={1} pt={3} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '350' }}>Profile Details</Typography>
            <Button variant='contained' sx={{ p: 0 }} onClick={() => setEditMode(!editMode)}>
              Edit
            </Button>
          </Box>

          <Divider />
          <Box mt={1}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                name='name'
                disabled={editMode}
                variant='standard'
                value={userDetail?.name}
                label={<Typography sx={{ fontSize: '13px' }}>Name</Typography>}
                onChange={(e) => setuserDetail({ ...userDetail, name: e.target.value })}
                fullWidth
              />
              <TextField
                sx={{ ml: 2 }}
                name='phoneNumber'
                disabled={editMode}
                label={<Typography sx={{ fontSize: '13px' }}>Phone Number</Typography>}
                value={userDetail?.phoneNumber}
                onChange={(e) => setuserDetail({ ...userDetail, phoneNumber: e.target.value })}
                variant='standard'
                fullWidth
              />
            </Box>
          
          </Box>
          <Box mt={2}>
            <Typography sx={{ fontSize: '18px', fontWeight: '350' }}>Password Changes</Typography>
            <Divider />
            <Box mt={1}>
              <TextField
                sx={{ width: '49%' }}
                name='oldPassword'
                label={<Typography sx={{ fontSize: '13px' }}>Old Password *</Typography>}
                onChange={(e) => setuserDetail({ ...userDetail, oldPassword: e.target.value })}
                value={userDetail?.oldPassword}
                variant='standard'
              />
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  name='newPassword'
                  label={<Typography sx={{ fontSize: '13px' }}>New Password *</Typography>}
                  variant='standard'
                  onChange={(e) => setuserDetail({ ...userDetail, newPassword: e.target.value })}
                  value={userDetail?.newPassword}
                  fullWidth
                />
                <TextField
                  sx={{ ml: 2 }}
                  name='confirmPassword'
                  label={<Typography sx={{ fontSize: '13px' }}>Confirm Password *</Typography>}
                  onChange={(e) =>
                    setuserDetail({ ...userDetail, confirmPassword: e.target.value })
                  }
                  value={userDetail?.confirmPassword}
                  variant='standard'
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
          <Button variant='contained' sx={{ padding: '2px 10px 2px 10px', mt: 3 }}>
            Change
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
