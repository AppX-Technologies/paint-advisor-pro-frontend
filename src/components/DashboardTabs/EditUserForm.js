import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import formReducer from "./reducers/formReducer";
import { CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import { updateUser, fetchUsers, reset } from "../../features/users/userSlice";

export default function Edit(props) {
  const dispatch = useDispatch();
  const { openEditForm, setOpenEditForm, editFormData } = props;
  const initialFormState = {
    name: editFormData[1] ? editFormData[1] : "",
    email: editFormData[2] ? editFormData[2] : "",
    phone: editFormData[3] ? editFormData[3] : "",
    role: "Admin",
  };
  const [formState, dispatchNew] = React.useReducer(
    formReducer,
    initialFormState
  );

  const { user } = useSelector((state) => state.auth);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const { isUpdated, isUpdating } = useSelector((state) => state.user);

  useEffect(() => {
    formState.name = editFormData[1] ? editFormData[1] : "";
    formState.email = editFormData[2] ? editFormData[2] : "";
    formState.phone = editFormData[3] ? editFormData[3] : "";
    formState.role = "Admin";
  }, [editFormData]);

  const handleTextChange = (e) => {
    dispatchNew({
      type: "HANDLE_FORM_INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleClose = () => {
    setOpenEditForm(false);
    Object.keys(formState).forEach((key) => {
      formState[key] = "";
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formStateWithToken = {
      ...formState,
      token: userDetail.token,
    };
    dispatch(updateUser(formStateWithToken));
    dispatch(reset());
  };

  useEffect(() => {
    if (isUpdated) {
      setOpenEditForm(false);
      dispatch(
        showMessage({
          message: "User updated successfully",
          variant: "success",
        })
      );
      dispatch(fetchUsers(userDetail.token));
      dispatch(reset());
    }
  }, [isUpdated]);
  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit User
          <CircularProgress
            style={{ display: isUpdating ? "block" : "none" }}
            size={25}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Name</label>
              <TextField
                name="name"
                required
                fullWidth
                placeholder={editFormData[1]}
                id="name"
                autoFocus
                value={formState.name}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Email</label>
              <TextField
                name="email"
                required
                fullWidth
                placeholder={editFormData[2]}
                id="email"
                autoFocus
                value={formState.email}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Phone</label>
              <TextField
                name="phone"
                required
                fullWidth
                placeholder={editFormData[3]}
                id="phone"
                autoFocus
                value={formState.phone}
                onChange={(e) => handleTextChange(e)}
                InputLabelProps={{
                  style: { color: "#988817" },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={isUpdating}
            type="submit"
            variant="contained"
            onClick={(e) => handleEdit(e)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
