import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

const RoomDetailsCard = () => {
  const defaultIconsStyle = { width: '20px', height: '20px', cursor: 'pointer' };

  const icons = [
    {
      icon: <ModeEditOutlineOutlinedIcon sx={{ ...defaultIconsStyle, color: '#8F289E' }} />,
      name: 'Edit'
    },
    {
      icon: <DeleteOutlineOutlinedIcon sx={{ ...defaultIconsStyle, color: '#D50000' }} />,
      name: 'Delete'
    }
  ];
  return (
    <Box
      sx={{
        border: '1px solid lightgray',
        borderRadius: '15px',
        height: '110px',
        width: '18%',
        m: 1,
        p: 0.4,
        backgroundColor: '#FAF2F0',
        boxShadow: ' 5px 5px 3px #8f8f8f,-5px -5px 10px #ffffff'
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Typography sx={{ m: 0, p: 0.5, fontSize: '16px', color: '#D50000' }}>North-1</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 0.5 }}>
          {icons.map(({ icon, name }) => {
            return (
              <Tooltip title={name} placement='top'>
                {icon}
              </Tooltip>
            );
          })}
        </Box>
      </Box>

      {Array(3)
        .fill(0)
        .map(() => {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Typography sx={{ m: 0, p: 0.2, fontSize: '13px', fontWeight: '00' }}>
                Windows :
              </Typography>
              <Typography sx={{ m: 0, p: 0.2, fontSize: '13px', fontWeight: '500' }}>
                12X12
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default RoomDetailsCard;
