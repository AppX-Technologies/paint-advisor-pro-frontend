import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IconButton, IconButtonBox, Tooltip } from '@mui/material';
import React from 'react';

const AddMoreButton = ({
  onopenAddMoreDetailsChange,
  setCurentAddMore,
  currentFieldType,
  enabled
}) => {
  return (
    <Tooltip title='Add More' placement='right'>
      <AddCircleOutlineOutlinedIcon
        sx={{
          fontSize: '18px',
          color: 'green',
          cursor: 'pointer',
          ml: 1
        }}
        onClick={() => {
          onopenAddMoreDetailsChange(true);
          setCurentAddMore(currentFieldType);
        }}
      />
    </Tooltip>
  );
};

export default AddMoreButton;
