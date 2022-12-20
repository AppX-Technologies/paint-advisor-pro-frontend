import EditIcon from '@mui/icons-material/Edit';
import {
  Badge,
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
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModel from '../../../common/ConfirmationModel';
import { AddNewClientTextField } from '../../../common/FormTextField';
import ScheduleTheJob from '../../../common/ScheduleTheJob';
import { BIDS_STAGES, STATUS_CANCELLED, STATUS_NEW_CLIENT } from '../../../helpers/contants';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { reset, updateClientStatus } from '../bidsSlice';
import {
  filterClientsBySelectedStep,
  findCurrentClient,
  findCurrentStageButtonInfo
} from '../helpers/generalHepers';

const ClientInfo = ({
  handleEditClientFormOpen,
  onSelectedStepChange,
  setShowFilesToView,
  selectedStep,
  open,
  setOpen,
  selectedListItem,
  currentClientInfo,
  setCurrentClientInfo,
  onClientFormChange,
  setCurrentClientInfoToEdit,
  setScheduleTheJob,
  scheduleTheJob,
  schedueJobDate,
  setScheduleJobDate,
  openFileDeleteModel,
  setOpenFileDeleteModel,
  setSelectedListItem,
  filteredClietsList
}) => {
  const { clientList, isSuccess, isLoading, jobSuccessFullyCanceled, isJobCanceledLoading } =
    useSelector((state) => state.bids);
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentClientInfo(findCurrentClient(clientList, selectedListItem));
  }, [selectedListItem, clientList, selectedStep]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showMessage({
          message: `Client Successfully Updated`,
          severity: 'success'
        })
      );

      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (jobSuccessFullyCanceled) {
      dispatch(
        showMessage({
          message: `Job cancelled Sucessfully`,
          severity: 'success'
        })
      );
      setOpenFileDeleteModel(false);
      setCurrentClientInfo(null);
      const indexOfCurrentClient = filterClientsBySelectedStep(
        filteredClietsList,
        convertStringCase(selectedStep)
      ).findIndex((client) => client._id === currentClientInfo._id);
      setSelectedListItem(
        filterClientsBySelectedStep(filteredClietsList, convertStringCase(selectedStep))[
          indexOfCurrentClient + 1
        ]._id
      );
      dispatch(reset());
    }
  }, [jobSuccessFullyCanceled]);

  useEffect(() => {
    if (currentClientInfo?.estimateScheduledDate) {
      setScheduleJobDate(currentClientInfo?.estimateScheduledDate);
    } else {
      setScheduleJobDate(null);
    }
  }, [currentClientInfo]);

  return (
    <Box>
      {scheduleTheJob && (
        <ScheduleTheJob
          scheduleTheJob={scheduleTheJob}
          setScheduleTheJob={setScheduleTheJob}
          schedueJobDate={schedueJobDate}
          setScheduleJobDate={setScheduleJobDate}
          currentClientInfo={currentClientInfo}
          scheduleDateExistsOrNot={currentClientInfo.estimateScheduledDate}
        />
      )}
      {openFileDeleteModel && (
        <ConfirmationModel
          openFileDeleteModel={openFileDeleteModel}
          setOpenFileDeleteModel={setOpenFileDeleteModel}
          isLoading={isJobCanceledLoading}
          actionToPerform={() => {
            dispatch(
              updateClientStatus({
                token: user.token,
                id: currentClientInfo._id,
                status: STATUS_CANCELLED
              })
            );
          }}
          content='Are you sure you want to cancel this job?'
          primaryButtonText='Save'
          title='Cancel The Job'
        />
      )}
      {selectedListItem && currentClientInfo ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ width: '100%' }}>Client Info</Typography>

              <Tooltip
                title="Edit Client's Info"
                placement='bottom'
                onClick={() => handleEditClientFormOpen(currentClientInfo)}>
                <EditIcon sx={{ cursor: 'pointer', ml: 1, width: '20px', height: '20px' }} />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex' }}>
              {findCurrentStageButtonInfo(selectedStep)
                ?.actions.filter((item) =>
                  Object.keys(currentClientInfo).includes('estimateScheduledDate')
                    ? item.text !== 'Schedule'
                    : item.text !== 'Update Scheduled Job'
                )
                .map((info) => {
                  return info.text === 'Begin Estimate' ||
                    info.text === 'Update Estimation Info' ? (
                    <Tooltip title={info.text} placement='bottom'>
                      <Button
                        sx={{ margin: '0 2px', p: 0, minWidth: '30px' }}
                        variant='outlined'
                        startIcon={info.icon}
                        color={info.color}
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <>
                      {info.text === 'Cancel The Job' &&
                        currentClientInfo?.status !== 'Cancel The Job' && (
                          <>
                            <Tooltip title={info.text} placement='bottom'>
                              <Badge
                                badgeContent={
                                  info.text === 'View Files' ? currentClientInfo?.files?.length : 0
                                }
                                color='primary'
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left'
                                }}>
                                <Button
                                  sx={{ margin: '0 2px', p: 0, minWidth: '30px' }}
                                  variant='outlined'
                                  startIcon={info.icon}
                                  color={info.color}
                                  onClick={() => {
                                    setOpenFileDeleteModel(true);
                                  }}
                                />
                              </Badge>
                            </Tooltip>
                          </>
                        )}
                      {info.text !== 'Cancel The Job' && (
                        <>
                          <Tooltip title={info.text} placement='bottom'>
                            <Badge
                              badgeContent={
                                info.text === 'View Files' ? currentClientInfo?.files?.length : 0
                              }
                              color='primary'
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}>
                              <Button
                                sx={{ margin: '0 2px', minWidth: '10px', padding: 0.6 }}
                                variant='outlined'
                                endIcon={<>{info.icon}</>}
                                color={info.color}
                                onClick={() => {
                                  if (info.nextState) {
                                    onSelectedStepChange(
                                      BIDS_STAGES[BIDS_STAGES.indexOf(selectedStep) + 1]
                                    );
                                  }
                                  if (info.text === 'View Files') {
                                    setShowFilesToView(true);
                                  }
                                  if (
                                    info.text === 'Schedule' ||
                                    info.text === 'Update Scheduled Job'
                                  ) {
                                    setScheduleTheJob(true);
                                  }
                                }}>
                                {selectedStep === STATUS_NEW_CLIENT &&
                                  info.text === 'Update Scheduled Job' &&
                                  currentClientInfo?.estimateScheduledDate && (
                                    <Typography sx={{ fontSize: '10px' }}>
                                      {new Date(currentClientInfo.estimateScheduledDate)
                                        .toString()
                                        .slice(4, 16)}
                                    </Typography>
                                  )}
                              </Button>
                            </Badge>
                          </Tooltip>
                        </>
                      )}
                    </>
                  );
                })}
            </Box>
          </Box>
          {selectedListItem && <Divider light />}

          {/* Client's Info Card */}
          {/* estimateScheduledDate */}
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
                    item !== 'comments' &&
                    item !== 'estimateScheduledDate' &&
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
                              {currentClientInfo[field] !== '' ? (
                                currentClientInfo[field].length > 19 ? (
                                  <Tooltip title={currentClientInfo[field]} placement='bottom'>
                                    <Typography sx={{ fontSize: '12px' }}>
                                      {currentClientInfo[field].slice(0, 16)}...
                                    </Typography>
                                  </Tooltip>
                                ) : (
                                  currentClientInfo[field]
                                )
                              ) : null}
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
          {!isLoading && (
            <Typography sx={{ fontSize: '14px', p: 2 }}>No Client Selected</Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {isLoading && <CircularProgress size={20} sx={{ ml: 2 }} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ClientInfo;
