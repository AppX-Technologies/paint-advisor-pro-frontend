import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InteriorManByManFormFields } from '../../../common/FormTextField';
import {
  NONPAINTABLEAREAFIELD,
  STATUS_ESTIMATE_IN_PROGRESS,
  STATUS_NEW_CLIENT
} from '../../../helpers/contants';
import { isSystemUser } from '../../../helpers/roles';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { createBid, reset, updateABid, updateClient } from '../bidsSlice';
import { estimationFormInitialInfo, initialRoomState } from '../common/roomsInitialStats';

import InteriorRoomByRoom from './forms/interior/InteriorRoomByRoom';

export default function EstimateForm(props) {
  const {
    open,
    setOpen,
    initialBidInfo,
    setInitialBidInfo,
    allRoom,
    setAllRoom,
    onRoomDetailsReset,
    roomStats,
    setRoomStats,
    wallStats,
    setWallStats,
    windowStats,
    setWindowStats,
    clearWallStats,
    doorsStats,
    setDoorStats,
    nonPaintableAreaStats,
    setNonPaintableAreaStats,
    openEditForm,
    setOpenEditForm,
    roomRelatedInfo,
    currentClientInfo,
    selectedStep,
    setCurrentClientInfo
  } = props;

  const [openAddMoreDetails, setOpenAddMoreDetails] = React.useState(false);
  const [previousStateOfRooms, setPreviousStateOfRooms] = React.useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { bidsIsLoading, bidsIsSuccess, bidInfo, bidsIsError } = useSelector((state) => state.bids);
  const { companyId } = useParams();
  const [orgId] = React.useState(isSystemUser(user) ? companyId : user.organization._id);

  const handleClose = () => {
    setOpen(false);
    setRoomStats(initialRoomState);
  };

  const handleBidsSubmission = () => {
    const emptyField = Object.keys(initialBidInfo).find((field) => initialBidInfo[field] === '');
    if (emptyField) {
      return dispatch(
        showMessage({
          message: `'${emptyField.toUpperCase()}' Field Is Empty.`,
          severity: 'error'
        })
      );
    }

    if (new Date(initialBidInfo.startDate).getTime() > new Date(initialBidInfo.endDate).getTime()) {
      return dispatch(
        showMessage({
          message: `Start Date Should Be Less Than End Date.`,
          severity: 'error'
        })
      );
    }
    // Client's Status Update After Creating An Estimation
    if (selectedStep === STATUS_NEW_CLIENT) {
      dispatch(
        updateClient({
          status: STATUS_ESTIMATE_IN_PROGRESS,
          token: user.token,
          id: currentClientInfo._id
        })
      );
      currentClientInfo?.bid?.rooms.forEach((room) => {
        delete room._id;
      });
    }

    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    currentClientInfoCopy?.bid?.rooms.forEach((room) => {
      room[NONPAINTABLEAREAFIELD].forEach((item) => {
        delete item[0];
        item.area = Number(item.area);
      });
    });

    setCurrentClientInfo({ ...currentClientInfoCopy });

    if (selectedStep === STATUS_NEW_CLIENT) {
      dispatch(
        createBid({
          token: user.token,
          id: user._id,
          bidFields: {
            ...initialBidInfo,
            rooms: [...currentClientInfo.bid.rooms],
            isMaterialProvidedByCustomer: initialBidInfo.isMaterialProvidedByCustomer === 'Yes'
          },
          organization: orgId
        })
      );
    } else {
      dispatch(
        updateABid({
          token: user.token,
          _id: currentClientInfo.bid._id,
          bidFields: {
            ...initialBidInfo,
            rooms: [...currentClientInfo.bid.rooms],
            isMaterialProvidedByCustomer: initialBidInfo.isMaterialProvidedByCustomer === 'Yes'
          },
          organization: orgId
        })
      );
    }
  };

  React.useEffect(() => {
    if (!open) {
      setInitialBidInfo(cloneDeep(estimationFormInitialInfo));
    }
  }, [open]);

  useEffect(() => {
    if (bidsIsSuccess) {
      setOpen(false);
      dispatch(
        showMessage({
          message: `Bids Information Successfully Created`,
          severity: 'success'
        })
      );
      dispatch(reset());
      handleClose();
    }
  }, [bidsIsSuccess]);

  useEffect(() => {
    if (bidsIsError) {
      dispatch(
        showMessage({
          message: `Something Went Wrong`,
          severity: 'error'
        })
      );
      dispatch(reset());
    }
  }, [bidsIsError]);

  useEffect(() => {
    if (open) {
      if (selectedStep !== STATUS_NEW_CLIENT) {
        setInitialBidInfo(
          JSON.parse(
            JSON.stringify({
              startDate: currentClientInfo?.bid?.startDate,
              endDate: currentClientInfo?.bid?.endDate,
              type: currentClientInfo?.bid?.type,
              subType: currentClientInfo?.bid?.subType,
              isMaterialProvidedByCustomer: currentClientInfo?.bid?.isMaterialProvidedByCustomer
                ? 'Yes'
                : 'No'
            })
          )
        );
      } else {
        setInitialBidInfo(JSON.parse(JSON.stringify(estimationFormInitialInfo)));
      }
    }
  }, [open]);

  useEffect(() => {
    if (bidInfo) {
      dispatch(
        updateClient({
          bid: bidInfo?.response?.data?._id,
          token: user.token,
          id: currentClientInfo?._id
        })
      );
      dispatch(reset());
    }
  }, [bidInfo]);

  useEffect(() => {
    if (open) {
      setPreviousStateOfRooms({ ...currentClientInfo.bid });
    }
  }, [open]);


  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar sx={{ backgroundColor: '#D50000' }}>
          <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
            Estimate
          </Typography>

          <Button
            variant='contained'
            color='warning'
            style={{
              height: '30px',
              padding: '3px'
            }}
            onClick={() => {
              handleClose();
              currentClientInfo.bid = { ...previousStateOfRooms };
              setCurrentClientInfo({ ...currentClientInfo });
            }}>
            Close <CloseIcon sx={{ height: '15px' }} />
          </Button>
        </Toolbar>

        {bidsIsLoading && <LinearProgress color='success' sx={{ height: '5px' }} />}

        <DialogContent>
          <Grid container spacing={2} mt={2}>
            {InteriorManByManFormFields.map((item) => {
              return (
                (item.dataType === 'dateTime' && (
                  <Grid item xs={10} md={3}>
                    <Box>
                      <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                        {item.label}
                      </InputLabel>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        style={{ mb: 1 }}
                        localeText={{ start: 'Start Date', end: 'End Date' }}>
                        <DesktopDatePicker
                          sx={{ m: 0 }}
                          InputProps={{
                            style: { height: '30px' }
                          }}
                          value={initialBidInfo[item.name]}
                          onChange={(newValue) => {
                            initialBidInfo[item.name] = newValue?.$d?.toISOString();
                            setInitialBidInfo({ ...initialBidInfo });
                          }}
                          renderInput={(params) => (
                            <TextField
                              size='small'
                              inputProps={{
                                style: { fontSize: '14px', marginTop: '-10px' }
                              }}
                              fullWidth
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={10} md={3}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                      <Select
                        displayEmpty
                        sx={{ height: '30px' }}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        name='name'
                        value={initialBidInfo[item.name]}
                        onChange={(e) => {
                          initialBidInfo[item.name] = e.target.value;
                          setInitialBidInfo({ ...initialBidInfo });
                        }}
                        renderValue={
                          !initialBidInfo[item.name] &&
                          (() => (
                            <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                              Select One...
                            </Typography>
                          ))
                        }>
                        {item.option.map((o) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                ))
              );
            })}
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={10} md={3}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Bid Type
              </InputLabel>
              <FormControl sx={{ m: 0, width: '100%' }} size='small'>
                <Select
                  displayEmpty
                  sx={{ height: '30px' }}
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='Bid Type'
                  value={initialBidInfo.type}
                  onChange={(event) => {
                    initialBidInfo.type = event.target.value;
                    setInitialBidInfo({ ...initialBidInfo });
                  }}
                  renderValue={
                    initialBidInfo.type === '' &&
                    (() => (
                      <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                        Select One...
                      </Typography>
                    ))
                  }>
                  <MenuItem value='Interior'>Interior</MenuItem>
                  <MenuItem value='Exterior'>Exterior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} md={3}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Sub Type
              </InputLabel>
              <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                <Select
                  displayEmpty
                  sx={{ height: '30px' }}
                  labelId='demo-select-small'
                  id='demo-select-small'
                  name='Bid Type'
                  value={initialBidInfo.subType}
                  onChange={(event) => {
                    initialBidInfo.subType = event.target.value;
                    setInitialBidInfo({ ...initialBidInfo });
                  }}
                  renderValue={
                    initialBidInfo.subType === '' &&
                    (() => (
                      <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                        Select One...
                      </Typography>
                    ))
                  }>
                  <MenuItem value='Man Hour'>Man Hour</MenuItem>
                  {initialBidInfo.type === 'Interior' && (
                    <MenuItem value='Room by Room'>Room by Room</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />
          {initialBidInfo.type === 'Interior' && initialBidInfo.subType === 'Room by Room' && (
            <InteriorRoomByRoom
              roomStats={roomStats}
              setRoomStats={setRoomStats}
              allRoom={allRoom}
              setAllRoom={setAllRoom}
              onRoomDetailsReset={onRoomDetailsReset}
              wallStats={wallStats}
              openAddMoreDetails={openAddMoreDetails}
              setOpenAddMoreDetails={setOpenAddMoreDetails}
              setWallStats={setWallStats}
              windowStats={windowStats}
              setWindowStats={setWindowStats}
              clearWallStats={clearWallStats}
              doorsStats={doorsStats}
              setDoorStats={setDoorStats}
              nonPaintableAreaStats={nonPaintableAreaStats}
              setNonPaintableAreaStats={setNonPaintableAreaStats}
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
              roomRelatedInfo={roomRelatedInfo}
              initialBidInfo={initialBidInfo}
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
            />
          )}
          {initialBidInfo.type === 'Interior' && initialBidInfo.subType === 'Man Hour' && (
            <></>
            // <InteriorManByMan
            //   roomStats={roomStats}
            //   setRoomStats={setRoomStats}
            //   allRoom={allRoom}
            //   setAllRoom={setAllRoom}
            // />
          )}
          {initialBidInfo.type === 'Exterior' && initialBidInfo.subType === 'Man Hour' && (
            // <ExteriorManByMan />
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              currentClientInfo.bid = { ...previousStateOfRooms };
              setCurrentClientInfo({ ...currentClientInfo });
            }}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' onClick={handleBidsSubmission}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
