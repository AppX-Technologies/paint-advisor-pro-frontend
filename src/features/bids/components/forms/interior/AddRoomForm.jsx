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
import { RoomInfofields } from '../../../../../common/FormTextField';
import { findRoomRelatedInfo } from '../formHelper';
import AddMoreDetails from './AddMoreDetails';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DeleteItemModel } from '../DeleteModel';

export default function AddRoomForm(props) {
  const [currentAddMore, setCurentAddMore] = useState('');
  const [showCards, setShowCards] = useState({
    wall: true,
    window: true,
    door: true,
    nonPaintableArea: true
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
    wallStats,
    setWallStats,
    clearWallStats,
    windowStats,
    setWindowStats,
    onRoomDetailsReset,
    doorsStats,
    setDoorStats,
    nonPaintableAreaStats,
    setNonPaintableAreaStats,
    initilWallInfo,
    initialNonPaintableStats,
    initialWindowInfo
  } = props;
  const [roomInfoToEdit, setRoomInfoToEdit] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [itemToBEDeleted, setItemToBeDeleted] = useState({
    _id: '',
    field: ''
  });
  const roomRelatedInfo = [
    {
      name: 'wall',
      countToShow: roomStats.walls.length,
      infoToShow: roomStats.walls,
      currentStats: wallStats,
      onCurrentStatsChange: setWallStats,
      addIn: roomStats.walls,
      initialStats: initilWallInfo
    },
    {
      name: 'window',
      countToShow: roomStats.windows.length,
      infoToShow: roomStats.windows,
      currentStats: windowStats,
      onCurrentStatsChange: setWindowStats,
      addIn: roomStats.windows,
      initialStats: initialWindowInfo
    },
    {
      name: 'door',
      countToShow: roomStats.doors.length,
      infoToShow: roomStats.doors,
      currentStats: doorsStats,
      onCurrentStatsChange: setDoorStats,
      addIn: roomStats.doors
    },
    {
      name: 'nonPaintableArea',
      countToShow: roomStats.nonPaintableAreas.length,
      infoToShow: roomStats.nonPaintableAreas,
      currentStats: nonPaintableAreaStats,
      onCurrentStatsChange: setNonPaintableAreaStats,
      addIn: roomStats.nonPaintableAreas,
      initialStats: initialNonPaintableStats,
      totalArea: roomStats.nonPaintableAreas.reduce((total, currArea) => {
        return total + Number(currArea.area);
      }, 0)
    }
  ];

  const handleClose = () => {
    setOpen(false);
    onRoomDetailsReset();
  };
  const onopenAddMoreDetailsChange = (value) => {
    setOpenAddMoreDetails(value);
  };
  const filteredRoomInfo = roomRelatedInfo.find((roomInfo) => roomInfo.name === currentAddMore);

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
            {RoomInfofields.filter((i) =>
              seeMore ? true : i.name === 'wall' || i.name === 'nonPaintableArea'
            ).map((item) => {
              const fieldType = item.name;

              return (
                item.dataType === 'dropDown' && (
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
                          sx={{ fontSize: '14px', color: roomStats[fieldType] ? 'black' : 'gray' }}>
                          <BrushIcon
                            sx={{
                              color: roomStats[fieldType]
                                ? (theme) => theme.deleteicon.color.main
                                : 'gray',
                              fontSize: '18px',
                              marginBottom: '-5px',
                              mr: 1
                            }}
                          />
                          {item.label}

                          {findRoomRelatedInfo(roomRelatedInfo, item.name) &&
                            ` (${findRoomRelatedInfo(roomRelatedInfo, item.name)?.countToShow})`}
                        </InputLabel>

                        <AddMoreButton
                          onopenAddMoreDetailsChange={onopenAddMoreDetailsChange}
                          setCurentAddMore={setCurentAddMore}
                          currentFieldType={item.name}
                          enabled={roomStats[fieldType]}
                          setRoomInfoToEdit={setRoomInfoToEdit}
                        />
                      </Box>
                      {findRoomRelatedInfo(roomRelatedInfo, item.name)?.countToShow === 0 ||
                      !findRoomRelatedInfo(roomRelatedInfo, item.name) ? (
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
                          {findRoomRelatedInfo(roomRelatedInfo, item.name)?.countToShow !== 0 &&
                            findRoomRelatedInfo(roomRelatedInfo, item.name)?.infoToShow.map(
                              (roomComponent) => {
                                return (
                                  <Grid xs={10} md={3}>
                                    <Card
                                      setRoomInfoToEdit={setRoomInfoToEdit}
                                      openDeleteModal={openDeleteModal}
                                      setOpenDeleteModal={setOpenDeleteModal}
                                      onopenAddMoreDetailsChange={onopenAddMoreDetailsChange}
                                      items={roomComponent}
                                      title={roomComponent.name}
                                      onCardDelete={onCardDelete}
                                      field={findRoomRelatedInfo(roomRelatedInfo, item.name)?.name}
                                      totalArea={
                                        findRoomRelatedInfo(roomRelatedInfo, item.name)?.totalArea
                                      }
                                    />
                                  </Grid>
                                );
                              }
                            )}
                        </Grid>
                      </>
                    )}
                    {item.name === 'wall' && (
                      <Typography
                        sx={{
                          color: 'gray',
                          mt: 2,
                          fontWeight: '400',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}>
                        <VisibilityIcon
                          sx={{
                            fontSize: '18px',
                            marginBottom: '-5px',
                            mr: 1
                          }}
                        />
                        {seeMore ? 'See less' : 'See more'}
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
                )
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
              setAllRoom([...allRoom, roomStats]);
              handleClose();
            }}>
            Add Room
          </Button>
        </DialogActions>
        {openDeleteModal && (
          <DeleteItemModel
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            roomRelatedInfo={roomRelatedInfo}
            id={itemToBEDeleted._id}
            field={itemToBEDeleted.field}
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
            currentStats={filteredRoomInfo?.currentStats}
            initialStat={filteredRoomInfo?.currentStats}
            setCurrentStats={filteredRoomInfo?.onCurrentStatsChange}
            addIn={filteredRoomInfo?.addIn}
            clearWallStats={clearWallStats}
            roomInfoToEdit={roomInfoToEdit && roomInfoToEdit}
            setRoomInfoToEdit={setRoomInfoToEdit}
            initialStats={filteredRoomInfo?.initialStats}
          />
        )}
      </Dialog>
    </div>
  );
}
