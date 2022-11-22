import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/Button';
import { showMessage } from '../../../snackbar/snackbarSlice';

export function DeleteItemModel({
  id,
  setOpenDeleteModal,
  setRoomStats,
  openDeleteModal,
  roomStats,
  roomRelatedInfo,
  onCardDelete,
  selectedRoomInfo,
  setSelectedRoomInfo
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    if (selectedRoomInfo) {
      onCardDelete(selectedRoomInfo._id);
      setSelectedRoomInfo(null);
    } else {
      roomRelatedInfo.splice(
        roomRelatedInfo.findIndex((x) => x._id === id),
        1
      );
      setRoomStats({ ...roomStats });
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
