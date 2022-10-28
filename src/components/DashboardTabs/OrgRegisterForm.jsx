import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import formReducer from "./reducers/formReducer";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { createOrgs, fetchOrgs, reset } from "../../features/org/orgSlice";
import { useEffect } from "react";
import { showMessage } from "../../features/snackbar/snackbarSlice";

const initialFormState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  active: false,
};
export default function FormDialog(props) {
  const dispatch = useDispatch();
  const [formState, dispatchNew] = React.useReducer(
    formReducer,
    initialFormState
  );
  const { open, setOpen } = props;
  const { user } = useSelector((state) => state.auth);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const { isSuccess, isLoading } = useSelector((state) => state.org);
  const handleTextChange = (e) => {
    dispatchNew({
      type: "HANDLE_FORM_INPUT",
      field: e.target.name,
      payload: e.target.name === "active" ? e.target.checked : e.target.value,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const formStateWithToken = {
      ...formState,
      token: userDetail.token,
    };
    dispatch(createOrgs(formStateWithToken));
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(
        showMessage({
          message: "Organization created successfully",
          variant: "success",
        })
      );
      dispatch(fetchOrgs(userDetail.token));
      dispatch(reset());
    }
  }, [isSuccess]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">Add New Organization</Typography>
            {
              <CircularProgress
                color="primary"
                size={25}
                style={{ display: isLoading ? "block" : "none" }}
              />
            }
          </Stack>
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
                value={formState.name}
                onChange={(e) => handleTextChange(e)}
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
                value={formState.email}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                required
                fullWidth
                variant="standard"
                id="address"
                label="Address"
                autoFocus
                value={formState.address}
                onChange={(e) => handleTextChange(e)}
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
                value={formState.phone}
                onChange={(e) => handleTextChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="active"
                    checked={formState.active}
                    onChange={(e) => handleTextChange(e)}
                  />
                }
                label="Is organization active?"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => handleCreate(e)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
