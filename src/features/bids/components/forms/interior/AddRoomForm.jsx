/* eslint-disable */

import BrushIcon from '@mui/icons-material/Brush';
import {
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
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import * as React from 'react';
import { useState } from 'react';
import AddMoreButton from '../../../../../common/AddMoreButton';
import Card from '../../../../../common/Card';
import AddMoreDetails from './AddMoreDetails';
import { DeleteItemModel } from '../DeleteModel';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../../../snackbar/snackbarSlice';
import { NONPAINTABLEAREAFIELD } from '../../../../../helpers/contants';

export default function AddRoomForm(props) {
  const [currentAddMore, setCurentAddMore] = useState('');
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
    setRoomStats,
    allRoom,
    setAllRoom,
    openAddMoreDetails,
    setOpenAddMoreDetails,
    clearWallStats,
    onRoomDetailsReset,
    roomRelatedInfo
  } = props;
  const [roomInfoToEdit, setRoomInfoToEdit] = useState(null);

  const [seeMore, setSeeMore] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [itemToBEDeleted, setItemToBeDeleted] = useState({
    _id: '',
    field: ''
  });

  const handleClose = () => {
    setOpen(false);
    onRoomDetailsReset();
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
    handleClose();
    setAllRoom([...allRoom, roomStats]);
  };
  const onopenAddMoreDetailsChange = (value) => {
    setOpenAddMoreDetails(value);
  };

  const onCardDelete = (id, field) => {
    setItemToBeDeleted({ ...itemToBEDeleted, _id: id, field: field });
  };

  React.useEffect(() => {
    setItemToBeDeleted({ ...itemToBEDeleted });
  }, [openDeleteModal]);

  const expandMoreAndLessStyles = {
    fontSize: '30px',
    cursor: 'pointer',
    mr: 1.5,
    color: '#D50000'
  };

  const filteredRoomInfo = roomRelatedInfo.find((room) => room.name === currentAddMore);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { minWidth: '80%' } }}>
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

              <TextField
                InputProps={{
                  style: { height: '30px' }
                }}
                name='name'
                fullWidth
                variant='outlined'
                id='outlined-basic'
                autoFocus
                value={roomStats.roomName}
                onChange={(event) => {
                  roomStats.roomName = event.target.value;
                  setRoomStats({ ...roomStats });
                }}
              />
            </Grid>
            <Divider />
            {roomRelatedInfo
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

                          {` (${roomStats[fieldType]?.length ? roomStats[fieldType]?.length : 0})`}
                        </InputLabel>

                        <AddMoreButton
                          onClick={() => {
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
                                    onCardDelete={onCardDelete}
                                    field={item.name}
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
        {openDeleteModal && (
          <DeleteItemModel
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            roomRelatedInfo={roomStats[currentAddMore]}
            id={itemToBEDeleted._id}
            roomStats={roomStats}
            setRoomStats={setRoomStats}
          />
        )}
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
