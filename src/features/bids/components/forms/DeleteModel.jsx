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
import { CURRENT_TOTAL_DESCRIPTION } from '../../../../helpers/contants';
import { showMessage } from '../../../snackbar/snackbarSlice';
import { initialRoomState } from '../../common/roomsInitialStats';

export function DeleteItemModel({
  itemToBeDeleted,
  setOpenDeleteModal,
  setRoomFormValue,
  openDeleteModal,
  roomFormValue,
  selectedRoomInfo,
  onSelectedRoomInfoChange,
  currentClientInfo,
  setCurrentClientInfo
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    if (!itemToBeDeleted) {
      setCurrentClientInfo({
        ...currentClientInfo,
        bid: {
          ...currentClientInfo.bid,
          rooms: [
            ...currentClientInfo.bid.rooms.filter(
              (room) => room.roomName !== roomFormValue?.roomName
            )
          ]
        }
      });

      onSelectedRoomInfoChange(null);
      setRoomFormValue(cloneDeep(initialRoomState));
    } else {
      roomFormValue[itemToBeDeleted?.field]?.splice(
        roomFormValue[itemToBeDeleted?.field]?.findIndex((item) =>
          itemToBeDeleted?.field !== 'nonPaintableAreas'
            ? item.name === itemToBeDeleted.title
            : item.description === itemToBeDeleted.title &&
              item.description !== CURRENT_TOTAL_DESCRIPTION
        ),
        1
      );
      if (roomFormValue.edit) {
        setRoomFormValue({ ...selectedRoomInfo, edit: true });
      }
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
