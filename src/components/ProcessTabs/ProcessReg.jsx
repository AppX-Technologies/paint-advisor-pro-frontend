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
  Stack,
  Typography,
} from "@mui/material";

export default function FormDialog(props) {
  const { open, setOpen } = props;
  console.log(open);
  const userDetail = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">Add New Process</Typography>
            {
              <CircularProgress
                color="primary"
                size={25}
                style={{ display: "none" }}
              />
            }
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Process"
                required
                fullWidth
                variant="standard"
                id="process"
                label="Process"
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
