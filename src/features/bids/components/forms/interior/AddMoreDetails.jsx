import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../components/Button';

const AddMoreDetails = ({ wallStat, setAddWall, addWall, title }) => {
  const [wallData, setWallData] = useState({
    Length: 0,
    Height: 0,
    WallType: '',
    Coat: 1
  });
  const head = ['Length', 'Height', 'WallType', 'Coat'];
  return (
    <Dialog open={addWall} onClose={() => setAddWall(false)} PaperProps={{ sx: { width: '40%' } }}>
      <Toolbar sx={{ backgroundColor: '#D50000', height: '10px' }}>
        <Typography sx={{ ml: 0, flex: 1, color: 'white' }} variant='h6' component='div'>
          Add {title}
        </Typography>

        <Button
          variant='contained'
          color='warning'
          style={{
            height: '30px',
            padding: '3px'
          }}
          onClick={() => setAddWall(false)}>
          Close
        </Button>
      </Toolbar>
      <DialogContent>
        <Grid container spacing={2}>
          {head.map((inp) => {
            const fieldType = inp;

            return (
              <Grid item xs={6} md={6} sx={{ margin: '-10px auto 0 auto', width: '90%' }}>
                <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                  {inp}
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
                  value={wallData[fieldType]}
                  onChange={(event) => {
                    wallData[fieldType] = event.target.value;
                    setWallData({ ...wallData });
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          type='submit'
          variant='contained'
          onClick={() => {
            setAddWall(false);
            wallStat.push(wallData);
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
