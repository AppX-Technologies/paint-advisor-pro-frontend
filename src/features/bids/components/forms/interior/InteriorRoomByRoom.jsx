import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RoomCard from '../../../../../common/RoomCard';
import Button from '../../../../../components/Button';
import { initialRoomState } from '../../../common/roomsInitialStats';
import Picker from '../../Picker';
import { DeleteItemModel } from '../DeleteModel';
import { findPaintableAndNonPaintableArea, findSameTypeOfWall } from '../formHelper';
import AddRoomForm from './AddRoomForm';

const InteriorRoomByRoom = ({
  roomFormValue,
  setRoomFormValue,
  initialBidInfo,
  currentClientInfo,
  openAddMoreDetails,
  setOpenAddMoreDetails,
  onRoomDetailsReset,
  allSectionsInfoOfARoom,
  setCurrentClientInfo
}) => {
  const { materialList } = useSelector((state) => state.material);
  const { companyMadeByUsers } = useSelector((state) => state.usersFromCompany);

  const [addRoom, setAddRoom] = useState(false);
  const [currentAddMore, setCurentAddMore] = useState('');
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBeDeleted, setitemToBeDeleted] = useState(null);

  const onSelectedRoomInfoChange = (value) => {
    setSelectedRoomInfo(value);
  };

  return (
    <Box>
      {/* Main Form Body  */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mt={2} mr={1}>
          Rooms({currentClientInfo?.bid?.rooms.length})
        </Typography>
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ mt: 2, height: '30px', minWidth: '40px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon sx={{ ml: 1 }} />}
            color='info'
            onClick={() => {
              setAddRoom(true);
              setRoomFormValue(cloneDeep(initialRoomState));
            }}
          />
        </Tooltip>
      </Box>
      <Box>
        <Grid container spacing={1} mt={2}>
          {currentClientInfo &&
            currentClientInfo?.bid?.rooms.length !== 0 &&
            currentClientInfo?.bid?.rooms.map((room) => {
              return (
                <Grid xs={6} md={6} mt={1}>
                  <RoomCard
                    onSelectedRoomInfoChange={onSelectedRoomInfoChange}
                    completeRoomInfo={room}
                    setOpenDeleteModal={setOpenDeleteModal}
                    items={{
                      roomName: room.roomName,
                      WallDetail:
                        room?.walls?.length !== 0 ? findSameTypeOfWall(room.walls) : 'No Walls',
                      WindowDetail:
                        room.windows.length !== 0 ? findSameTypeOfWall(room.windows) : 'No Windows',
                      PaintableArea: `${
                        findPaintableAndNonPaintableArea([...room.walls, ...room.windows]).paintable
                      } sq.feet`,
                      NonPaintableArea: `${
                        findPaintableAndNonPaintableArea([...room.windows]).nonPaintable
                      } sq.feet`
                    }}
                    title={room.roomName}
                    setAddRoom={setAddRoom}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>

      {openDeleteModal && (
        <DeleteItemModel
          onSelectedRoomInfoChange={onSelectedRoomInfoChange}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          itemToBeDeleted={itemToBeDeleted}
          roomFormValue={roomFormValue}
          setRoomFormValue={setRoomFormValue}
          selectedRoomInfo={selectedRoomInfo}
          setSelectedRoomInfo={setSelectedRoomInfo}
          setCurrentClientInfo={setCurrentClientInfo}
          currentClientInfo={currentClientInfo}
          setitemToBeDeleted={setitemToBeDeleted}
        />
      )}

      <AddRoomForm
        open={addRoom}
        setOpen={setAddRoom}
        roomFormValue={roomFormValue}
        setRoomFormValue={setRoomFormValue}
        currentClientInfo={currentClientInfo}
        openAddMoreDetails={openAddMoreDetails}
        setOpenAddMoreDetails={setOpenAddMoreDetails}
        onRoomDetailsReset={onRoomDetailsReset}
        allSectionsInfoOfARoom={allSectionsInfoOfARoom}
        selectedRoomInfo={selectedRoomInfo}
        onSelectedRoomInfoChange={onSelectedRoomInfoChange}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        currentAddMore={currentAddMore}
        itemToBeDeleted={itemToBeDeleted}
        setitemToBeDeleted={setitemToBeDeleted}
        setCurentAddMore={setCurentAddMore}
        setCurrentClientInfo={setCurrentClientInfo}
      />
      {initialBidInfo.isMaterialProvidedByCustomer === 'No' &&
        currentClientInfo?.bid?.rooms.length !== 0 && (
          <>
            <Picker
              pickerTitle='Materials'
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
              pickerList={materialList}
            />
            {/* <Picker
              pickerTitle='Labour'
              currentClientInfo={currentClientInfo}
              setCurrentClientInfo={setCurrentClientInfo}
              pickerList={companyMadeByUsers}
            /> */}
          </>
        )}
    </Box>
  );
};

export default InteriorRoomByRoom;
