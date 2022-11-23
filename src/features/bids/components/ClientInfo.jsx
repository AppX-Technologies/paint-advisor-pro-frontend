import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { bidsStages } from '../../../helpers/bidsStages';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { showMessage } from '../../snackbar/snackbarSlice';
import { findCurrentClient, findCurrentStageButtonInfo } from '../helpers/generalHepers';

const ClientInfo = ({
  onSelectedStepChange,
  selectedStep,
  open,
  setOpen,
  selectedListItem,
  currentClientInfo,
  setCurrentClientInfo,
  onClientFormChange,
  setCurrentClientInfoToEdit
}) => {
  const { clientList, isSuccess, isLoading } = useSelector((state) => state.bids);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentClientInfo(findCurrentClient(clientList, selectedListItem));
  }, [selectedListItem, clientList]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showMessage({
          message: `Client Successfully Updated`,
          severity: 'success'
        })
      );
    }
  }, [isSuccess]);
  return (
    <Box>
      {selectedListItem ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ width: '100%' }}>Client Info</Typography>

              <Tooltip
                title="Edit Client's Info"
                placement='top'
                onClick={() => {
                  onClientFormChange(true);
                  setCurrentClientInfoToEdit({ ...currentClientInfo });
                }}>
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
              Object.keys(currentClientInfo && currentClientInfo)
                .filter(
                  (item) =>
                    item !== 'status' &&
                    item !== 'bid' &&
                    item !== 'organization' &&
                    item !== 'materials' &&
                    item !== 'files' &&
                    item !== '_id' &&
                    item !== 'rooms' &&
                    item !== '__v'
                )
                .map((field) => {
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
                        <Typography sx={{ fontSize: '10px', textAlign: 'left' }}>
                          {AddNewClientTextField.map((item) => {
                            return item.name === field && <>{item.label}</>;
                          })}
                        </Typography>
                        <Chip
                          sx={{
                            bgcolor: (theme) => theme.chip.background.main,
                            WebkitJustifyContent: 'left',
                            justifyContent: 'left'
                          }}
                          label={
                            <Typography
                              sx={{ textAlign: 'left', fontWeight: '400', fontSize: '12px' }}>
                              {currentClientInfo[field] !== '' ? currentClientInfo[field] : null}
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
        <>
          {!isLoading && <Typography sx={{ fontSize: '14px', p: 2 }}>No Client</Typography>}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {isLoading && <CircularProgress size={20} sx={{ ml: 2 }} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ClientInfo;
