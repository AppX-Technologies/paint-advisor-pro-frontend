import { Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';

const AddMoreDetails = ({ secondPopUp, setSecondPopUp, wallStats }) => {
  const [height, setHeight] = useState();
  const handlePopUpClose = () => {
    setSecondPopUp(false);
  };
  return (
    <Dialog open={secondPopUp} onClose={handlePopUpClose} PaperProps={{ sx: { width: '40%' } }}>
      <DialogContent>
        <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
          <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
            In progress
          </InputLabel>

          <TextField
            InputProps={{
              style: { height: '30px' }
            }}
            name='name'
            fullWidth
            variant='outlined'
            id='outlined-basic'
            autoFocus
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant='contained' onClick={() => {wallStats.push(height);handlePopUpClose();}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
