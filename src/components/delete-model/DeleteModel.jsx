import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import Button from '../Button';

export function DeleteModal({
  setOpenDeleteModal,
  openDeleteModal,
  isDeleting,
  payloadWithUserToken,
  modalTitle,
  deleteMethod
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteMethod(payloadWithUserToken));
    setOpenDeleteModal(false);
  };

  return (
    <Dialog open={openDeleteModal} onClose={handleClose}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Typography variant='h6'>Delete {modalTitle}</Typography>

          <CircularProgress
            color='primary'
            size={25}
            style={{ display: isDeleting ? 'block' : 'none' }}
          />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this {modalTitle}?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} disabled={isDeleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
