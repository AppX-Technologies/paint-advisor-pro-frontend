import {
  Box,
  Button,
  CircularProgress,
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

const ConfirmationModel = ({
  openFileDeleteModel,
  setOpenFileDeleteModel,
  actionToPerform,
  fileToDelete,
  content,
  primaryButtonText,
  isLoading,
  title
}) => {
  const { isFileUploadLoading } = useSelector((state) => state.bids);

  return (
    <Dialog open={openFileDeleteModel}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
            <Typography variant='h6'>{title}</Typography>
            {isLoading && <CircularProgress size={20} />}
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenFileDeleteModel(false)} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() =>
            !isFileUploadLoading
              ? fileToDelete
                ? actionToPerform(fileToDelete)
                : actionToPerform()
              : null
          }>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModel;
