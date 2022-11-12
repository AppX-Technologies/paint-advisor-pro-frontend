import { Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';

const AddMoreDetails = ({ roomStats, setWallStats, wallStats, onAddWallsChange, addWalls }) => {
  return (
    <Dialog
      open={addWalls}
      onClose={() => onAddWallsChange(false)}
      PaperProps={{ sx: { width: '40%' } }}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sx={{ margin: '-10px auto 0 auto', width: '90%' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              Height
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
              value={wallStats.height}
              onChange={(e) =>
                setWallStats((prevStat) => ({
                  ...prevStat,
                  height: e.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={6} md={6} sx={{ margin: '-10px auto 0 auto', width: '90%' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              Length
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
              value={wallStats.length}
              onChange={(e) =>
                setWallStats((prevStat) => ({
                  ...prevStat,
                  length: e.target.value
                }))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          type='submit'
          variant='contained'
          onClick={() => {
            roomStats.push(wallStats);
            onAddWallsChange(false);
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
