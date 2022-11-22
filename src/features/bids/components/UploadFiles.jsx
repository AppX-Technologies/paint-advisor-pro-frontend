import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, Typography } from '@mui/material';
import React from 'react';

const UploadFiles = () => {
  return (
    <>
      <Typography ml={3}>Upload Files</Typography>
      <input type='file' name='' id='file-upload' hidden />
      <label htmlFor='file-upload'>
        <Box
          bgcolor='white'
          sx={{
            border: '1px solid lightgray',
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          ml={1}
          mt={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CloudUploadOutlinedIcon sx={{ width: '50px', height: '50px' }} />
            <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
              Click Or Drag And Drop Files Here
            </Typography>
          </Box>
        </Box>
      </label>
    </>
  );
};

export default UploadFiles;
