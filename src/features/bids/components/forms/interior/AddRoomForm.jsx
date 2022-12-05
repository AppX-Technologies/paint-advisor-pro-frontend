import BrushIcon from '@mui/icons-material/Brush';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddMoreButton from '../../../../../common/AddMoreButton';
import Card from '../../../../../common/Card';
import { NONPAINTABLEAREAFIELD, ROOM_TYPES } from '../../../../../helpers/contants';
import { showMessage } from '../../../../snackbar/snackbarSlice';
import { initialRoomState } from '../../../common/roomsInitialStats';
import AddMoreDetails from './AddMoreDetails';

const expandMoreAndLessStyles = {
  fontSize: '30px',
  cursor: 'pointer',
  mr: 1.5,
  color: '#D50000'
};

export default function AddRoomForm(props) {
  const dispatch = useDispatch();
  const [showCards, setShowCards] = useState({
    walls: true,
    windows: true,
    doors: true,
    nonPaintableAreas: true,
    ceilings: true,
    baseboardTrims: true,
    windowTrims: true,
    doorjambs: true,
    crownMoldings: true,
    closets: true
  });

  const {
    open,
    setOpen,
    roomStats,
    currentClientInfo,
    setRoomStats,
    setAllRoom,
    openAddMoreDetails,
    setOpenAddMoreDetails,
    clearWallStats,
    onRoomDetailsReset,
    roomRelatedInfo,
    selectedRoomInfo,
    onSelectedRoomInfoChange,
    openDeleteModal,
    setOpenDeleteModal,
    currentAddMore,
    itemToBEDeleted,
    setItemToBeDeleted,
    setCurentAddMore,
    setCurrentClientInfo
  } = props;

  const [roomInfoToEdit, setRoomInfoToEdit] = useState(null);
  const [seeMore, setSeeMore] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onRoomDetailsReset();
    setRoomStats({ ...initialRoomState });
    onSelectedRoomInfoChange(null);
  };
  const handleCreate = () => {
    if (!roomStats.roomName) {
      return dispatch(
        showMessage({
          message: 'Room Name cannot be empty',
          severity: 'error'
        })
      );
    }

    if (
      currentClientInfo?.bid?.rooms
        .filter((room) => room._id !== roomStats._id)
        .some((room) => room.roomName === roomStats.roomName)
    ) {
      return dispatch(
        showMessage({
          message: `Room Name '${roomStats.roomName}' Already Exists`,
          severity: 'error'
        })
      );
    }

    if (!roomStats._id) {
      setCurrentClientInfo({
        ...currentClientInfo,
        bid: {
          ...currentClientInfo?.bid,
          rooms: [...currentClientInfo.bid.rooms, { ...roomStats, _id: Date.now().toString() }]
        }
      });
    } else {
      setCurrentClientInfo({
        ...currentClientInfo,
        bid: {
          ...currentClientInfo?.bid,
          rooms: [
            ...currentClientInfo.bid.rooms.filter((room) => room._id !== roomStats._id),
            { ...roomStats }
          ]
        }
      });
    }

    handleClose();
    setRoomStats({ ...initialRoomState });
    onSelectedRoomInfoChange(null);
  };

  const onopenAddMoreDetailsChange = (value) => {
    setOpenAddMoreDetails(value);
  };

  const onCardDelete = (id, field, title) => {
    setItemToBeDeleted({ ...itemToBEDeleted, _id: id, field });
  };

  React.useEffect(() => {
    setItemToBeDeleted({ ...itemToBEDeleted });
  }, [openDeleteModal]);

  const filteredRoomInfo = React.useMemo(() => {
    return roomRelatedInfo && roomRelatedInfo.find((room) => room.name === currentAddMore);
  }, [currentAddMore, roomRelatedInfo]);

  React.useEffect(() => {
    if (selectedRoomInfo) {
      setRoomStats({ ...selectedRoomInfo });
    }
  }, [open, selectedRoomInfo]);

  return (
    <div>
      <Dialog open={open} PaperProps={{ sx: { minWidth: '80%' } }}>
        <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
          <Stack direction='row' spacing={2}>
            <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
              Add New Room
            </Typography>
            <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
              <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                Room Name
              </InputLabel>

              <Stack spacing={2} sx={{ width: '100%' }}>
                <Autocomplete
                  id='free-solo-demo'
                  size='small'
                  value={roomStats.roomName}
                  freeSolo
                  onInputChange={(event, newInputValue) => {
                    roomStats.roomName = newInputValue;
                    setRoomStats({ ...roomStats });
                  }}
                  sx={{ width: '100%' }}
                  options={ROOM_TYPES.map((option) => option)}
                  renderInput={(params) => <TextField {...params} label='Room Name' />}
                />
              </Stack>
            </Grid>
            <Divider />
            {roomRelatedInfo &&
              roomRelatedInfo
                .filter((i) => {
                  if (i.name === 'roomName') return false;
                  return seeMore || i.name === 'walls' || i.name === 'nonPaintableAreas';
                })
                .map((item) => {
                  const fieldType = item.name;

                  return (
                    <Grid item xs={12} md={12} sx={{ marginTop: '5px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                          <InputLabel
                            id='demo-select-small'
                            sx={{
                              fontSize: '14px',
                              color: 'black'
                            }}>
                            <BrushIcon
                              sx={{
                                color:
                                  item.name !== NONPAINTABLEAREAFIELD
                                    ? (theme) => theme.deleteicon.color.main
                                    : 'gray',
                                fontSize: '18px',
                                marginBottom: '-5px',
                                mr: 1
                              }}
                            />
                            {item.label}

                            {` (${
                              roomStats[fieldType]?.length ? roomStats[fieldType]?.length : 0
                            })`}
                          </InputLabel>

                          <AddMoreButton
                            onClick={() => {
                              item.onCurrentStatsChange(cloneDeep(item.initialStats));
                              setRoomInfoToEdit(null);
                              onopenAddMoreDetailsChange(true);
                              setCurentAddMore(fieldType);
                            }}
                          />
                        </Box>
                        {roomStats[fieldType]?.length === 0 || !roomStats[fieldType] ? (
                          <></>
                        ) : showCards[fieldType] ? (
                          <Tooltip title='Less'>
                            <ExpandLessOutlinedIcon
                              sx={{
                                ...expandMoreAndLessStyles
                              }}
                              onClick={() => {
                                showCards[fieldType] = false;
                                setShowCards({ ...showCards });
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title='More'>
                            <ExpandMoreOutlinedIcon
                              sx={{
                                ...expandMoreAndLessStyles
                              }}
                              onClick={() => {
                                showCards[fieldType] = true;
                                setShowCards({ ...showCards });
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      {showCards[item.name] && (
                        <>
                          <Grid container alignItems='center' justify='center'>
                            {roomStats[fieldType].length !== 0 &&
                              roomStats[fieldType].map((roomComponent) => {
                                return (
                                  <Grid xs={10} md={3}>
                                    <Card
                                      setCurentAddMore={setCurentAddMore}
                                      setRoomInfoToEdit={setRoomInfoToEdit}
                                      openDeleteModal={openDeleteModal}
                                      setOpenDeleteModal={setOpenDeleteModal}
                                      onopenAddMoreDetailsChange={onopenAddMoreDetailsChange}
                                      items={roomComponent}
                                      title={roomComponent.name}
                                      roomStats={roomStats}
                                      onCardDelete={onCardDelete}
                                      onSelectedRoomInfoChange={onSelectedRoomInfoChange}
                                      field={item.name}
                                      currentClientInfo={currentClientInfo}
                                      selectedRoomInfo={selectedRoomInfo}
                                      totalArea={roomStats[fieldType].reduce((total, currItem) => {
                                        return total + Number(currItem.area);
                                      }, 0)}
                                    />
                                  </Grid>
                                );
                              })}
                          </Grid>
                        </>
                      )}
                      {item.name === 'walls' && (
                        <Typography
                          sx={{
                            color: '#D50000',
                            mt: 2,
                            fontWeight: '400',
                            fontSize: '14px',
                            cursor: 'pointer',
                            float: 'right'
                          }}
                          onClick={() => setSeeMore(!seeMore)}>
                          {seeMore ? 'Show Less Sections' : 'Show More Sections'}
                          {seeMore ? (
                            <ExpandLessOutlinedIcon
                              sx={{
                                marginBottom: '-8px',
                                color: 'red'
                              }}
                              onClick={() => setSeeMore(!seeMore)}
                            />
                          ) : (
                            <ExpandMoreOutlinedIcon
                              sx={{
                                marginBottom: '-8px',
                                color: 'red'
                              }}
                              onClick={() => setSeeMore(!seeMore)}
                            />
                          )}
                        </Typography>
                      )}
                    </Grid>
                  );
                })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type='submit'
            variant='contained'
            onClick={() => {
              handleCreate();
            }}>
            Add Room
          </Button>
        </DialogActions>

        {openAddMoreDetails && filteredRoomInfo && (
          <AddMoreDetails
            openAddMoreDetails={openAddMoreDetails}
            roomStats={roomStats}
            setRoomStat={setRoomStats}
            setOpenAddMoreDetails={setOpenAddMoreDetails}
            titleField={currentAddMore}
            currentStats={filteredRoomInfo.currentStats}
            setCurrentStats={filteredRoomInfo.onCurrentStatsChange}
            addIn={roomStats[currentAddMore]}
            clearWallStats={clearWallStats}
            roomInfoToEdit={roomInfoToEdit && roomInfoToEdit}
            setRoomInfoToEdit={setRoomInfoToEdit}
            initialStats={filteredRoomInfo.initialStats}
            fields={filteredRoomInfo.fields}
            itemToBEDeleted={itemToBEDeleted}
            currentLabel={
              filteredRoomInfo.label[filteredRoomInfo.label.length - 1] === 's'
                ? filteredRoomInfo.label.slice(0, filteredRoomInfo.label.length - 1)
                : filteredRoomInfo.label
            }
          />
        )}
      </Dialog>
    </div>
  );
}
