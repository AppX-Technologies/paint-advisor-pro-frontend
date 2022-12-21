import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, CardContent, Chip, Tooltip, Typography } from '@mui/material';
import React from 'react';

const MaterialsPickerCard = ({
  title,
  materials,
  handleMaterialAssignment,
  handleMaterialDeletion,
  roomName,
  section,
  setCurrentlyActiveRoomInfo,
  pickerTitle
}) => {
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

            p: 0.5
          }}>
          <Typography sx={{ fontSize: 12, textAlign: 'center' }} gutterBottom>
            {title}
          </Typography>
          <Tooltip
            title={!materials ? `Apply On This ${title.slice(0, title.length - 1)}` : ''}
            placement='top'>
            <Chip
              onClick={() => {
                if (!materials) {
                  handleMaterialAssignment(roomName, section, title);
                }
                setCurrentlyActiveRoomInfo({ roomName, section });
              }}
              color={materials ? 'error' : 'default'}
              sx={{ height: '16px', cursor: 'pointer' }}
              label={
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '11px' }}>
                    {!materials ? 'Not Assigned' : materials}
                  </Typography>
                  {materials && (
                    <Tooltip
                      title={`Remove Assigned ${pickerTitle.slice(0, pickerTitle.length - 1)}`}
                      placement='top'>
                      <HighlightOffIcon
                        sx={{ fontSize: '15px', ml: 1 }}
                        onClick={() => {
                          handleMaterialDeletion(roomName, section, title);
                          setCurrentlyActiveRoomInfo({ roomName, section });
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
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
