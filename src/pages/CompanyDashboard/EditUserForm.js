import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import formReducer from '../reducers/registerReducer'
import { Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {updateUserFromCompany,fetchUserMadeByCompany,reset} from '../../features/usersFromCompany/usersFromCompanySlice';


export default function Edit(props) {
  const dispatch = useDispatch();
  const {openEditForm,setOpenEditForm,editFormData,getId} = props;
  const initialFormState = {
    name: editFormData[1] ? editFormData[1] : '',
    email: editFormData[2] ?  editFormData[2] : '',
    phone: editFormData[3]  ? editFormData[3] : '',
    role:editFormData[4] ? editFormData[4] : '',
    };
  const [formState,dispatchNew] = React.useReducer(formReducer,initialFormState)
  
  const {user} = useSelector((state)=> state.auth);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const {isUpdated,isUpdating} = useSelector((state)=> state.usersFromCompany);

  useEffect(()=>{
    formState.name = editFormData[1] ? editFormData[1] : '';
    formState.email = editFormData[2] ?  editFormData[2] : '';
    formState.phone = editFormData[3]  ? editFormData[3] : '';
    formState.role = editFormData[4] ? editFormData[4] : '';
  },[editFormData])

  const handleTextChange = (e) =>{
    dispatchNew({
      type:"HANDLE_INPUT",
      field:e.target.name,
      payload:e.target.value
    });
  }
  const handleClose = () => {
    setOpenEditForm(false);
    Object.keys(formState).forEach((key) => {
      formState[key] = '';
    }
    );
  };
  const formStateWithToken = {
    ...formState,
    token: userDetail.token
  }

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateUserFromCompany(formStateWithToken));
    dispatch(reset());
  }

  useEffect(()=>{
    if(isUpdated){
      setOpenEditForm(false);
      dispatch(showMessage({message:"User updated successfully",variant:"success"}));
      dispatch(fetchUserMadeByCompany({
        filter: {
          role: ["Painter","Estimator","Org Admin"],
          organization:getId
        }
      }));
      dispatch(reset());
    }
  },[isUpdated])
  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit User
          <CircularProgress style={{display:isUpdating ? "block" : "none"}} size={25} />
          </DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  variant="standard"
                  id="name"
                  label="Name"
                  autoFocus
                  value={formState.name ? formState.name : editFormData[1]}
                  onChange={(e)=>handleTextChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="email"
                  required
                  fullWidth
                  variant="standard"
                  id="email"
                  label="Email"
                  autoFocus
                  value={formState.email ? formState.email : editFormData[2]}
                  onChange={(e)=>handleTextChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="phone"
                  required
                  fullWidth
                  variant="standard"
                  id="phone"
                  label="Phone Number"
                  autoFocus
                  value={formState.phone ? formState.phone : editFormData[3]}
                  onChange={(e)=>handleTextChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                <Select 
                  fullWidth
                  name="role"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={formState.role ? formState.role : editFormData[4]}
                  onChange={(e)=>handleTextChange(e)}
                  label="Role"
                >
                  <MenuItem value='Org Admin'>Org Admin</MenuItem>
                  <MenuItem value='Estimator'>Estimator</MenuItem>
                  <MenuItem value='Painter'>Painter</MenuItem>
                </Select>
              </FormControl>
              </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isUpdating} type="submit" variant="contained" onClick={(e)=>handleEdit(e)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}