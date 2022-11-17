import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import Button from '../../../../components/Button';

export function DeleteItemModel({
  id,
  setOpenDeleteModal,
  setRoomStats,
  openDeleteModal,
  roomStats,
  roomRelatedInfo
}) {
  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    roomRelatedInfo.splice(
      roomRelatedInfo.findIndex((x) => x._id === id),
      1
    );
    setRoomStats({ ...roomStats });
    setOpenDeleteModal(false);
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
