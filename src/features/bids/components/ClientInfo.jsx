import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { bidsStages } from '../../../helpers/bidsStages';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { findCurrentClient, findCurrentStageButtonInfo } from '../helpers/generalHepers';

const ClientInfo = ({
  onSelectedStepChange,
  selectedStep,
  open,
  setOpen,
  selectedListItem,
  currentClientInfo,
  setCurrentClientInfo
}) => {
  const { clientList } = useSelector((state) => state.bids);

  useEffect(() => {
    setCurrentClientInfo(findCurrentClient(clientList, selectedListItem));
  }, [selectedListItem]);

  return (
    <Box>
      {selectedListItem ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ width: '100%' }}>Client Info</Typography>

              <Tooltip title="Edit Client's Info" placement='top'>
                <EditIcon sx={{ cursor: 'pointer', ml: 1, width: '20px', height: '20px' }} />
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex' }}>
              {findCurrentStageButtonInfo(selectedStep).actions.map((info) => {
                return info.text === 'Begin Estimate' ? (
                  <Tooltip title={info.text} placement='top'>
                    <Button
                      sx={{ margin: '0 2px', p: 0, minWidth: '30px' }}
                      variant='outlined'
                      startIcon={info.icon}
                      color={info.color}
                      onClick={() => setOpen(!open)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={info.text} placement='top'>
                    <Button
                      sx={{ margin: '0 2px', p: 0, minWidth: '30px' }}
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
          </Box>
          {selectedListItem && <Divider light />}

          {/* Client's Info Card */}
          <Grid container>
            {currentClientInfo &&
              Object.keys(currentClientInfo && currentClientInfo).map((field) => {
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
                          return item.name === field && <>{item.label}</>;
                        })}
                      </Typography>
                      <Chip
                        label={
                          <Typography
                            sx={{ textAlign: 'left', fontWeight: '400', fontSize: '11px' }}>
                            {currentClientInfo[field] !== '' && field !== 'email'
                              ? convertStringCase(currentClientInfo[field])
                              : currentClientInfo[field]}
                          </Typography>
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </>
      ) : (
        <Typography sx={{ fontSize: '14px', p: 2 }}>No Client Information</Typography>
      )}
    </Box>
  );
};

export default ClientInfo;
