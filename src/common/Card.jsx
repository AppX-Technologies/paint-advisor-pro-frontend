import { Box, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Card = ({ items, title }) => {
  return (
    <Box className='card-box' p={1}>
      {/* Header-section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '700' }}>
          {title}
        </Typography>

        {/* Action */}
        <Box sx={{ display: 'flex' }}>
          <EditIcon
            sx={{
              color: (theme) => theme.editicon.color.main,
              fontSize: '18px',
              mr: 0.5,
              cursor: 'pointer'
            }}
            size='small'
          />
          <DeleteIcon
            sx={{
              color: (theme) => theme.deleteicon.color.main,
              fontSize: '18px',
              cursor: 'pointer'
            }}
            size='small'
          />
        </Box>
      </Box>
      {/* Body-section */}
      {Object.keys(items).map((item) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>{item}</Typography>
            <Typography sx={{ fontSize: '13px', color: '#736f6f', fontWeight: '600' }}>
              {items[item]}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Card;
