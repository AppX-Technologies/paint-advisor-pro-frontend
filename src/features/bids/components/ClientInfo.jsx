import { Box, Typography } from '@mui/material';
import React from 'react';

const ClientInfo = () => {
  return (
    <>
      <Box m={1} sx={{ border: '1px solid lightgray', borderRadius: '15px' }}>
        <Typography p={1}>Client&apos;s Info</Typography>

        {/* Client's Info Card */}
      </Box>
    </>
  );
};

export default ClientInfo;
