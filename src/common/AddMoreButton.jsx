import { Box, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const AddMoreButton = ({ onAddWallChange }) => {
  return (
    <Tooltip title='Add More' placement='right'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          cursor: 'pointer',
          bgcolor: (theme) => theme.chip.background.main,
          width: '50px',
          border: '2px dotted #a9aaab',
          borderRadius: '10px'
        }}
        onClick={() => onAddWallChange(true)}>
        <AddIcon sx={{ fontSize: '35px', color: '#a9aaab' }} />
      </Box>
    </Tooltip>
  );
};

export default AddMoreButton;
