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
import uuid from 'react-uuid';
import { processesTabLists } from '../../../common/Constants';
import { InteriorManByManFormFields } from '../../../common/FormTextField';
import {
  NONPAINTABLEAREAFIELD,
  STATUS_ESTIMATE_IN_PROGRESS,
  STATUS_NEW_CLIENT
} from '../../../helpers/contants';
import { isSystemUser } from '../../../helpers/roles';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { reset, updateABid, updateClient } from '../bidsSlice';
import { estimationFormInitialInfo, initialRoomState } from '../common/roomsInitialStats';
import EstimationDetails from './forms/interior/EstimationDetails';
import InteriorRoomByRoom from './forms/interior/InteriorRoomByRoom';

export default function EstimateForm({
  open,
  setOpen,
  initialBidInfo,
  setInitialBidInfo,
  setAllRoom,
  onRoomDetailsReset,
  roomFormValue,
  setRoomFormValue,
  openEditForm,
  setOpenEditForm,
  allSectionsInfoOfARoom,
  currentClientInfo,
  selectedStep,
  setCurrentClientInfo
}) {
  const [openAddMoreDetails, setOpenAddMoreDetails] = React.useState(false);
  const [previousStateOfRooms, setPreviousStateOfRooms] = React.useState(null);
  const [estimationDetailsMeta, setEstimationDetailsMeta] = React.useState(null);
  const [materialListToPick, setMaterialListToPick] = React.useState([]);
  const [equipmentListToPick, setEquipmentListToPick] = React.useState([]);
  const [labourDetailedMode, setLabourDetailedMode] = React.useState();
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { bidsIsLoading, bidsIsSuccess, bidsIsError, bidInfo } = useSelector((state) => state.bids);
  const { companyId } = useParams();
  const [orgId] = React.useState(isSystemUser(user) ? companyId : user.organization._id);
  const [choosePainterModalData, setChoosePainterModalData] = React.useState(null);
  const [selectedPainter, setselectedPainter] = React.useState({
    painter: currentClientInfo?.bid?.labours ?? []
  });
  const handleClose = () => {
    setOpen(false);
    setRoomFormValue(initialRoomState);
  };
  useEffect(() => {
    setselectedPainter({ painter: currentClientInfo?.bid?.labours ?? [] });
  }, [open]);
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

    if (
      materialListToPick.some((material) => {
        return (
          Object.keys(material).some((item) => !material[item]) ||
          Object.keys(material).length !== 5
        );
      })
    ) {
      return dispatch(
        showMessage({
          message: `Material List Should Be Complete`,
          severity: 'error'
        })
      );
    }

    if (
      equipmentListToPick.some((equipment) => {
        return (
          Object.keys(equipment).some((item) => !equipment[item]) ||
          Object.keys(equipment).length !== 5
        );
      })
    ) {
      return dispatch(
        showMessage({
          message: `Equipment List Should Be Complete`,
          severity: 'error'
        })
      );
    }

    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    currentClientInfoCopy?.bid?.rooms.forEach((room) => {
      room[NONPAINTABLEAREAFIELD].forEach((item) => {
        delete item[0];
        item.area = Number(item.area);
      });
    });

    setCurrentClientInfo({ ...currentClientInfoCopy });

    dispatch(
      updateABid({
        token: user.token,
        _id: currentClientInfo.bid._id,
        bidFields: {
          ...initialBidInfo,
          isLabourDetailedMode: labourDetailedMode,
          rooms: [...currentClientInfo.bid.rooms],
          materials: [...materialListToPick],
          equipments: [...equipmentListToPick],
          labours: selectedPainter?.painter,
          isMaterialProvidedByCustomer: initialBidInfo.isMaterialProvidedByCustomer === 'Yes'
        },
        organization: orgId
      })
    );
  };

  React.useEffect(() => {
    if (!open) {
      setInitialBidInfo(cloneDeep(estimationFormInitialInfo));
    }
  }, [open]);

  useEffect(() => {
    if (bidsIsSuccess) {
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
    if (bidInfo) {
      setCurrentClientInfo({ ...currentClientInfo, bid: { ...bidInfo } });
    }
  }, [bidInfo]);

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
    if (open) {
      setPreviousStateOfRooms({ ...currentClientInfo.bid });
    }
  }, [open]);

  const onEstimationDetailsChange = () => {
    setEstimationDetailsMeta(null);
  };

  useEffect(() => {
    const materialInfo = currentClientInfo?.bid?.materials?.map((material) => {
      return { ...material, id: uuid() };
    });

    const equipmentInfo = currentClientInfo?.bid?.equipments?.map((equipment) => {
      return { ...equipment, id: uuid() };
    });
    setMaterialListToPick(cloneDeep(materialInfo));
    setEquipmentListToPick(cloneDeep(equipmentInfo));
  }, [currentClientInfo?.bid]);

  React.useMemo(() => {
    setLabourDetailedMode(currentClientInfo?.bid?.isLabourDetailedMode);
  }, []);

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

        {bidsIsLoading && <LinearProgress color='success' sx={{ height: '10px' }} />}

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
                  {processesTabLists.map((processTab) => {
                    return <MenuItem value={processTab}>{processTab}</MenuItem>;
                  })}
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
              roomFormValue={roomFormValue}
              setRoomFormValue={setRoomFormValue}
              setAllRoom={setAllRoom}
              onRoomDetailsReset={onRoomDetailsReset}
              openAddMoreDetails={openAddMoreDetails}
              setOpenAddMoreDetails={setOpenAddMoreDetails}
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
              allSectionsInfoOfARoom={allSectionsInfoOfARoom}
              initialBidInfo={initialBidInfo}
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
              materialListToPick={materialListToPick}
              equipmentListToPick={equipmentListToPick}
              setMaterialListToPick={setMaterialListToPick}
              setEquipmentListToPick={setEquipmentListToPick}
              labourDetailedMode={labourDetailedMode}
              setLabourDetailedMode={setLabourDetailedMode}
              choosePainterModalData={choosePainterModalData}
              setChoosePainterModalData={setChoosePainterModalData}
              selectedPainter={selectedPainter}
              setselectedPainter={setselectedPainter}
            />
          )}
          {initialBidInfo.type === 'Interior' && initialBidInfo.subType === 'Man Hour' && (
            <></>
            // <InteriorManByMan
            //   roomFormValue={roomFormValue}
            //   setRoomFormValue={setRoomFormValue}
            //   allRoom={allRoom}
            //   setAllRoom={setAllRoom}
            // />
          )}
          {initialBidInfo.type === 'Exterior' && initialBidInfo.subType === 'Man Hour' && (
            // <ExteriorManByMan />
            <></>
          )}
        </DialogContent>

        <Box>
          <DialogActions>
            <Button
              disabled={bidsIsLoading}
              onClick={() => {
                handleClose();
                currentClientInfo.bid = { ...previousStateOfRooms };
                setCurrentClientInfo({ ...currentClientInfo });
              }}>
              Cancel
            </Button>
            <Button
              disabled={bidsIsLoading}
              type='submit'
              variant='contained'
              onClick={handleBidsSubmission}>
              Save
            </Button>
          </DialogActions>
        </Box>

        {estimationDetailsMeta && (
          <EstimationDetails
            estimationDetailsMeta={estimationDetailsMeta}
            setEstimationDetailsMeta={setEstimationDetailsMeta}
            onEstimationDetailsChange={onEstimationDetailsChange}
          />
        )}
      </Dialog>
    </div>
  );
}
