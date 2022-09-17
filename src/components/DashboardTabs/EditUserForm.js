import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import formReducer from './reducers/formReducer'
import { Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material';
import { useEffect } from 'react';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import {updateUser,fetchUsers,reset} from '../../features/users/userSlice';


export default function Edit(props) {
  const dispatch = useDispatch();
  const {openEditForm,setOpenEditForm,editFormData} = props;
  const initialFormState = {
    name: editFormData[0] ? editFormData[0] : '',
    email: editFormData[1] ?  editFormData[1] : '',
    phone: editFormData[2]  ? editFormData[2] : '',
    role:"Admin", 
    };
  const [formState,dispatchNew] = React.useReducer(formReducer,initialFormState)
  
  const {user} = useSelector((state)=> state.auth);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const {isSuccess,isLoading} = useSelector((state)=> state.user);

  useEffect(()=>{
    formState.name = editFormData[0] ? editFormData[0] : '';
    formState.email = editFormData[1] ?  editFormData[1] : '';
    formState.phone = editFormData[2]  ? editFormData[2] : '';
    formState.role = "Admin"
  },[editFormData])

  const handleTextChange = (e) =>{
    dispatchNew({
      type:"HANDLE_FORM_INPUT",
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
    token:userDetail.token
  }

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formStateWithToken));
    dispatch(fetchUsers(userDetail.token));
  }

  useEffect(()=>{
    if(isSuccess){
      setOpenEditForm(false);
      dispatch(showMessage({message:"User updated successfully",variant:"success"}));
      dispatch(reset());
    }
  },[isSuccess])
  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit User
          <CircularProgress style={{display:isLoading ? "block" : "none"}} size={25} />
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
                  value={formState.name ? formState.name : editFormData[0]}
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
                  value={formState.email ? formState.email : editFormData[1]}
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
                  value={formState.phone ? formState.phone : editFormData[2]}
                  onChange={(e)=>handleTextChange(e)}
                />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={(e)=>handleEdit(e)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}