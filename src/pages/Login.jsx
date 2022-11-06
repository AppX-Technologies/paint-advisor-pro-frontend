import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ConfirmModal from '../components/Modal';
import { login, reset } from '../features/auth/authSlice';
import {
  confirmNewPassword,
  fillEmail,
  fillOtp,
  openModal,
  setNewPassword
} from '../features/modal/modalSlice';
import { showMessage } from '../features/snackbar/snackbarSlice';
import { validateEmail } from '../helpers/utlis';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otp, resetEmail, newPassword, confirmPassword } = useSelector((state) => state.modal);

  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const userDetail = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (isSuccess) {
      if (
        userDetail.role === 'Org Admin' ||
        userDetail.role === 'Estimator' ||
        userDetail.role === 'Painter'
      ) {
        navigate(`/company`, { replace: true });
        dispatch(reset());
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
    if (isError) {
      dispatch(showMessage({ message, severity: 'error' }));
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    if (!email && !password) {
      dispatch(showMessage({ message: 'Please enter email and password', severity: 'error' }));
    }
    dispatch(login({ email, password }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
                error={!!(email && validateEmail(email) === null)}
                helperText={email && validateEmail(email) === null ? 'Incorrect email' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={(e) => setPassword(e.target.value)}
                error={password && password.length && password.length < 5}
                helperText={
                  password && password.length < 5 ? 'Password must be more than 5 characters!' : ''
                }
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Login
            {isLoading && <CircularProgress color='inherit' size={24} sx={{ ml: 2 }} />}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                variant='body2'
                onClick={() => {
                  dispatch(openModal('otp'));
                }}>
                Forgot password?
              </Button>
            </Grid>
          </Grid>

          <ConfirmModal modalTitle='Forgot Password?' contentMessage='' type=''>
            <TextField
              required
              fullWidth
              autoFocus
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              variant='standard'
              margin='dense'
              value={resetEmail}
              onChange={(e) => dispatch(fillEmail(e.target.value))}
            />
          </ConfirmModal>
          <ConfirmModal
            modalTitle='Reset Password?'
            contentMessage='Enter the OTP sent to your mail and reset the password.'
            type='otp'>
            {/* <Typography variant="p">
                OTP <span>*</span>
              </Typography> */}
            <OtpInput
              containerStyle={{ marginTop: '1rem' }}
              numInputs={6}
              value={otp}
              onChange={(value) => {
                dispatch(fillOtp(value));
              }}
              separator={
                <span>
                  <strong>-</strong>
                </span>
              }
              inputStyle={{
                width: '3rem',
                height: '3rem',
                margin: '0 1rem',
                fontSize: '2rem',
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.3)'
              }}
            />
            <TextField
              required
              fullWidth
              autoFocus
              variant='standard'
              margin='dense'
              id='email'
              label='New Password'
              name='newPassword'
              value={newPassword}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(e) => dispatch(setNewPassword(e.target.value))}
            />
            <TextField
              required
              fullWidth
              autoFocus
              variant='standard'
              margin='dense'
              id='confirmPassword'
              label='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(e) => dispatch(confirmNewPassword(e.target.value))}
            />
          </ConfirmModal>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                variant='body2'
                onClick={() => {
                  navigate('/register');
                }}>
                {`Don't have an account? Click here to register`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
