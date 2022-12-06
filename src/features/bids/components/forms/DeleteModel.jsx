import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/Button';
import { showMessage } from '../../../snackbar/snackbarSlice';

export function DeleteItemModel({
  itemToBeDeleted,
  setOpenDeleteModal,
  setRoomStats,
  openDeleteModal,
  setitemToBeDeleted,
  roomStats,
  onCardDelete,
  selectedRoomInfo,
  setSelectedRoomInfo,
  setCurrentClientInfo,
  currentClientInfo
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenDeleteModal(false);
    setSelectedRoomInfo(null);
  };

  const handleDelete = () => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);
    if (!itemToBeDeleted) {
      onCardDelete(selectedRoomInfo.roomName);
      setSelectedRoomInfo(null);
    } else {
      const roomWhoseItemIsToBeUpdated = currentClientInfoCopy?.bid?.rooms.find(
        (room) => room.roomName === itemToBeDeleted?.roomName
      );

      roomWhoseItemIsToBeUpdated[itemToBeDeleted?.field].splice(
        roomWhoseItemIsToBeUpdated[itemToBeDeleted?.field].findIndex(
          (item) => item.name === itemToBeDeleted.title
        ),
        1
      );

      setCurrentClientInfo({
        ...currentClientInfo,
        bid: { ...currentClientInfo?.bid, rooms: [...currentClientInfoCopy.bid.rooms] }
      });
      if (roomStats.edit) {
        setRoomStats({ ...roomWhoseItemIsToBeUpdated, edit: true });
      }
      setitemToBeDeleted(null);
    }

    setOpenDeleteModal(false);
    dispatch(
      showMessage({
        message: `Successfully Deleted`,
        severity: 'success'
      })
    );
  };

  return (
    <Dialog open={openDeleteModal} onClose={handleClose}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Typography variant='h6'>Delete this item</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
