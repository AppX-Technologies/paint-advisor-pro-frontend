import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const RoomCard = ({
  items,
  title,
  onCardDelete,
  onCardEdit,
  setAddRoom,
  completeRoomInfo,
  onSelectedRoomInfoChange,
  setOpenDeleteModal
}) => {
  return (
    <Box className='card-box' bgcolor='#faf2f0' p={1}>
      {/* Header-section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <MapsHomeWorkIcon sx={{ color: (theme) => theme.palette.primary.main }} />
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: '700',
              ml: 1,
              mt: 0.5
            }}>
            {title}
          </Typography>
        </Box>

        {/* Action */}
        <Box sx={{ display: 'flex' }}>
          <Tooltip title='Clone' placement='top'>
            <ContentCopyIcon
              sx={{
                color: '#458c2b',
                fontSize: '18px',
                mr: 0.5,
                cursor: 'pointer'
              }}
              onClick={() => {
                onSelectedRoomInfoChange({ ...completeRoomInfo, _id: null });

                setAddRoom(true);
              }}
              size='small'
            />
          </Tooltip>
          <Tooltip title='Edit' placement='top'>
            <EditIcon
              sx={{
                color: (theme) => theme.editicon.color.main,
                fontSize: '18px',
                mr: 0.5,
                cursor: 'pointer'
              }}
              size='small'
              onClick={() => {
                onCardEdit(items.roomName);
                onSelectedRoomInfoChange({ ...completeRoomInfo });
                setAddRoom(true);
              }}
            />
          </Tooltip>
          <Tooltip title='Delete' placement='top'>
            <DeleteIcon
              sx={{
                color: (theme) => theme.deleteicon.color.main,
                fontSize: '18px',
                cursor: 'pointer'
              }}
              size='small'
              onClick={() => {
                setOpenDeleteModal(true);
                onSelectedRoomInfoChange({ ...completeRoomInfo });
                onCardDelete(items.roomName);
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      {/* Body-section */}
      {Object.keys(items)
        .filter((x) => x !== 'roomName')
        .map((item) => {
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

export default RoomCard;
