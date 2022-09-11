import * as React from 'react';
import {Avatar,CssBaseline,TextField,Link,Grid,Box,Typography,Container, CircularProgress} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../components/Button';
import ConfirmModal from '../components/Modal';
import OtpInput from "react-otp-input";
import { openModal, fillOtp } from '../features/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const {otp} = useSelector((state)=> state.modal);
  const [registerForm, setRegisterForm] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
 
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    setLoading(true);
  };

  const handleToggleLoginForm = () => {
    setRegisterForm(!registerForm);
    setLoading(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {registerForm ? "Register" : "Login"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={(email && validateEmail(email) ===null) ? true : false}
                  helperText={email && validateEmail(email) ===null ? "Incorrect email":""}
                />
              </Grid>
              {!registerForm && 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={(password && password.length & password.length < 5) ? true : false}
                  helperText={password && password.length < 5 ? "Password must be more than 5 characters!" : ""}
                />
              </Grid>}
            </Grid>
            {registerForm ? <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
              {loading && <CircularProgress color="inherit" size={24} sx={{ ml: 2 }} />}
            </CustomButton>:
            <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login 
            {loading && <CircularProgress color="inherit" size={24} sx={{ ml: 2 }} />}
          </CustomButton>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => {
              dispatch(openModal('otp'));
            }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <ConfirmModal modalTitle="Forgot Password?" contentMessage="" type="">
              <TextField
                required
                fullWidth
                autoFocus
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="standard"
                margin="dense"
              />
            </ConfirmModal>
            <ConfirmModal modalTitle="Reset Password?" contentMessage="Enter the OTP sent to your mail and reset the password." type="otp">
            {/* <Typography variant="p">
                OTP <span>*</span>
              </Typography> */}
            <OtpInput
              containerStyle={{marginTop:"1rem"}}
                numInputs={6}
                value={otp}
                onChange={(value) => {
                  dispatch(fillOtp(value))
                }}
                separator={
                  <span>
                    <strong>-</strong>
                  </span>
                }
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              />
              <TextField
                required
                fullWidth
                autoFocus
                variant="standard"
                margin="dense"
                id="email"
                label="New Password"
                name="newPassword"
              />
              <TextField
                required
                fullWidth
                autoFocus
                variant="standard"
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
              />
            </ConfirmModal>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleToggleLoginForm}>
                {registerForm ? 
                "Already have an account? Click here to login" : "Don't have an account? Click here to register"
                }
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

