import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import Button from '../../../components/Button';

const BidsConfirmationModal = ({ modalIsOpen, handleModalClose }) => {
  return (
    <Dialog open={modalIsOpen !== null}>
      <DialogTitle>
        <Stack direction='row' spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
            <Typography variant='h6'>{modalIsOpen?.title}</Typography>
            {/* {isLoading && <CircularProgress size={20} />} */}
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{modalIsOpen?.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModalClose()}>Cancel</Button>
        <Button
          //   disabled={isLoading}
          onClick={() => modalIsOpen?.actionToPerform()}>
          Sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BidsConfirmationModal;
