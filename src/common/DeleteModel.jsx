import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const DeleteModel = ({ openFileDeleteModel, setOpenFileDeleteModel, deleteFile, fileToDelete }) => {
  const { isFileUploadLoading } = useSelector((state) => state.bids);

  return (
    <Dialog open={openFileDeleteModel}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Typography variant='h6'>Delete this item</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenFileDeleteModel(false)}>Cancel</Button>
        <Button onClick={() => (!isFileUploadLoading ? deleteFile(fileToDelete) : null)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModel;
