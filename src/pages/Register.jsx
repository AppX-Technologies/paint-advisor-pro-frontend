import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OtpInput from 'react-otp-input';
import { Link} from "react-router-dom";
import {generateRegistrationOtp} from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

export default function RegisterPage() {
  const dispatch = useDispatch();
  const {isSuccess} = useSelector((state)=> state.auth);
  const [email , setEmail] = React.useState('');

  const handleSubmitOtp = (event) => {
    event.preventDefault();
    dispatch(generateRegistrationOtp({email:email}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isSuccess ? 
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h6" variant="h6">
          Creating an account for {email}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="Phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="confirmPassword"
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="p">
                OTP <span>*</span>
              </Typography>
              <OtpInput
              containerStyle={{marginTop:"1rem"}}
                numInputs={6}
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box> : 
         <Box
         sx={{
           marginTop: 8,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
         }}
       >
         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           <LockOutlinedIcon />
         </Avatar>
         <Box component="form" noValidate onSubmit={handleSubmitOtp} sx={{ mt: 3 }}>
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
                 />
             </Grid>
           </Grid>
           <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
           >
             Register
           </Button>
           <Grid container justifyContent="flex-end">
               <Grid item>
                 <Link variant="body2" to="/login">
                 Already have an account? Click here to login 
                 </Link>
               </Grid>
             </Grid>
         </Box>
         </Box>
        }
      </Container>
    </ThemeProvider>
  );
}
