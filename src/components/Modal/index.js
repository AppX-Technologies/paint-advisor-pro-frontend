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
import {sendForgotPasswordLink,reset,resetPassword} from '../../features/auth/authSlice';
import { CircularProgress } from '@mui/material';
import { showMessage } from '../../features/snackbar/snackbarSlice';
let widthChange = true;
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '&	.MuiDialog-paper':{
  width: widthChange ? 500 : 'auto'
  }
  }
  )); 
export default function ConfirmModal({children,modalTitle,contentMessage,type}) {
  const { isOpen , isOtpModal, resetEmail,otp,newPassword,confirmPassword } = useSelector((store) => store.modal);
  widthChange = isOtpModal ? false : true;
  const dispatch = useDispatch();
  const {isLoading,isSuccessOtp,isResetSuccess} = useSelector((store)=> store.auth)

  const handleResetEmail = () => {
    if(type==="otp"){
      if(newPassword === confirmPassword){
        dispatch(showMessage({message:"Password doesn't match",type:"error"}));
        return;
      }
      dispatch(resetPassword({email:resetEmail,temporaryKey:otp,password:newPassword}))
      if(isResetSuccess){
        dispatch(showMessage({message:"Password reset successfully",variant:"success"}))
        dispatch(closeModal())
      }
    }else{
      dispatch(sendForgotPasswordLink({email:resetEmail}));
      if(isSuccessOtp === true){
        dispatch(showMessage({message:"OTP sent to your email",variant:"success"}))
        dispatch(otpModal());
      }
    }
  }
  return (
    <div>
      <StyledDialog open={type === "otp" ? isOtpModal : isOpen} onClose={() => {dispatch(closeModal())}}  >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentMessage}
            <CircularProgress style={{display:isLoading ? "block" : "none"}} size={25}/>
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {
              dispatch(closeModal(type));
            }}>Cancel</Button>
          <Button variant="contained" color="primary" 
              onClick={handleResetEmail}>{type=== "otp" ? "Reset Password" :"Get reset email"}</Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
