import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
} from "@mui/material";

export default function Edit(props) {
  const dispatch = useDispatch();
  const { openEditForm, setOpenEditForm, editFormData } = props;

  const handleClose = () => {
    setOpenEditForm(false);
  };

  return (
    <div>
      <Dialog open={openEditForm} onClose={handleClose}>
        <DialogTitle>
          Edit Process
          <CircularProgress style={{ display: "none" }} size={25} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Process</label>
              <TextField
                name="process"
                required
                fullWidth
                placeholder={editFormData[1]}
                id="process"
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
