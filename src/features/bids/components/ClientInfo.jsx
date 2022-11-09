import { Box, Button, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { bidsStages } from '../../../helpers/bidsStages';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { findCurrentStageButtonInfo } from '../helpers/findCurrentStageButtonInfo';

const ClientInfo = ({ onSelectedStepChange, selectedValue, selectedStep,open,setOpen }) => {
  return (
    <Box m={1} sx={{ border: '1px solid lightgray', borderRadius: '15px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
        <Typography sx={{ width: '100%' }}>Client&apos;s Info</Typography>

        {findCurrentStageButtonInfo(selectedStep).actions.map((info) => {
          return info.text === 'Estimate Job' ? (
            <Tooltip title={info.text} placement='top'>
              <Button
                sx={{ margin: '0 5px', height: '30px' }}
                variant='outlined'
                startIcon={info.icon}
                color={info.color}
                onClick={()=>setOpen(!open)
                }
              />
            </Tooltip>
          ) : (
            <Tooltip title={info.text} placement='top'>
              <Button
                sx={{ margin: '0 5px', height: '30px' }}
                variant='outlined'
                startIcon={info.icon}
                color={info.color}
                onClick={() =>
                  info.nextState &&
                  onSelectedStepChange(bidsStages[bidsStages.indexOf(selectedStep) + 1])
                }
              />
            </Tooltip>
          );
        })}
      </Box>
      <Divider light />

      {/* Client's Info Card */}
      <Grid container>
        {Object.keys(selectedValue).map((field) => {
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
                  {AddNewClientTextField.map((item) => {
                    return item.name === field && <>{convertStringCase(item.label)}</>;
                  })}
                </Typography>
                <Chip
                  label={
                    <Typography sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                      {selectedValue[field] !== '' && field !== 'email'
                        ? convertStringCase(selectedValue[field])
                        : selectedValue[field]}
                    </Typography>
                  }
                  size='small'
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ClientInfo;
