import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import { Box, CardContent, Chip, Tooltip, Typography } from '@mui/material';
import React from 'react';

const MaterialsPickerCard = ({ title, assigned }) => {
  return (
    <Box
      sx={{
        border: '1px solid #BABABA',
        borderRadius: '5px',
        width: '97%',
        margin: '0px auto'
      }}>
      <CardContent sx={{ p: 0, pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 0.5,
            p: 0.5
          }}>
          <Typography sx={{ fontSize: 12, textAlign: 'center' }} gutterBottom>
            {title} Info
          </Typography>
          <Tooltip
            title={
              !assigned
                ? `Apply On This ${title.slice(0, title.length - 1)}`
                : `Material Applied To This ${title.slice(0, title.length - 1)}`
            }
            placement='top'>
            <Chip
              color={assigned ? 'success' : 'default'}
              sx={{ height: '16px', cursor: 'pointer' }}
              label={
                <Typography sx={{ fontSize: '11px' }}>{assigned ? '' : 'Not '}Assigned</Typography>
              }
              size='small'
            />
          </Tooltip>
        </Box>
      </CardContent>
    </Box>
  );
};

export default MaterialsPickerCard;
