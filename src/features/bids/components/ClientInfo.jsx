import { Box, Button, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { findCurrentStageButtonInfo } from '../helpers/findCurrentStageButtonInfo';

const ClientInfo = ({ onSelectedStepChange,selectedValue }) => {
  return (
    
      <Box m={1} sx={{ border: '1px solid lightgray', borderRadius: '15px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
          <Typography sx={{ width: '100%' }}>Client&apos;s Info</Typography>

          {findCurrentStageButtonInfo('new client').actions.map((info) => {
            return (
              
                <Tooltip title={info.text} placement='top'>
                  <Button
                    sx={{ margin: '0 5px', height: '30px' }}
                    variant='outlined'
                    startIcon={info.icon}
                    color={info.color}
                    onClick={() =>
                      info.text === 'Begin Estimate' && onSelectedStepChange('estimate in progress')
                    }
                  />
                </Tooltip>
              
            );
          })}
        </Box>
        <Divider light />
        {/* Client's Info Card */}
        <Grid container>
          { selectedValue && selectedValue.map((field) => {
            return (
              
                <Grid md={2} xs={10}>
                  <Box
                    p={0.5}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      margin: '5px 4px'
                    }}>
                    <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>
                      {convertStringCase(field.name)} :{' '}
                    </Typography>
                    <Chip label={field.value ?  field.value : field.optionChoosed  }  size='small' />
                  </Box>
                </Grid>
            
            );
          })}
        </Grid>
      </Box>
    
  );
};

export default ClientInfo;
