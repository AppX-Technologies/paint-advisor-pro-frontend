import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal , otpModal } from '../../features/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

let widthChange = true;
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '&	.MuiDialog-paper':{
  width: widthChange ? 500 : 'auto'
  }
  }
  )); 
export default function ConfirmModal({children,modalTitle,contentMessage,type}) {
  const { isOpen , isOtpModal } = useSelector((store) => store.modal);
  widthChange = isOtpModal ? false : true;
  const dispatch = useDispatch();
  return (
    <div>
      <StyledDialog open={type === "otp" ? isOtpModal : isOpen} onClose={() => {dispatch(closeModal())}}  >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentMessage}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {
              dispatch(closeModal(type));
            }}>Cancel</Button>
          <Button variant="contained" color="primary" 
              onClick={() => {
              dispatch(otpModal());
            }}>Reset</Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
