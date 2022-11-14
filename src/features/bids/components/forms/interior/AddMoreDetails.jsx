import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Slide,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import Button from '../../../../../components/Button';

const AddMoreDetails = ({
  setAddWall,
  addWall,
  currentStats,
  setCurrentStats,
  clearWallStats,
  addIn,
  titleField
}) => {
  const currentFields = Object.keys(currentStats).filter(
    (item) => item !== '_id' && item !== titleField && item !== 'paint'
  );

  const handleCreate = () => {
    addIn.push({ ...currentStats, _id: new Date().getTime().toString() });
    clearWallStats();
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Dialog
      open={addWall}
      onClose={() => setAddWall(false)}
      PaperProps={{ sx: { minWidth: '60%' } }}>
      <DialogTitle sx={{ backgroundColor: '#D50000', p: 0.5 }}>
        <Stack direction='row' spacing={2}>
          <Typography sx={{ flex: 1, color: 'white', ml: 1 }} variant='h6' component='div'>
            Add New Wall
          </Typography>
          <CircularProgress color='primary' size={25} style={{ display: 'none' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} md={12} sx={{ marginTop: '-10px' }}>
            <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
              {`${titleField.toUpperCase()} NAME`}
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
              value={currentStats[titleField]}
              onChange={(event) => {
                currentStats[titleField] = event.target.value;
                setCurrentStats({ ...currentStats });
              }}
            />
          </Grid>
        </Grid>
        <Typography sx={{ color: 'gray', fontWeight: '500', fontSize: '14px', mt: 1 }}>
          General Info:
        </Typography>
        <Grid container spacing={2} mt={0.5}>
          {currentFields.map((currentField) => {
            console.log(currentField, 'currentStats');
            return (
              <Grid item xs={6} md={6} sx={{ marginTop: '-10px' }}>
                <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                  {currentField.toUpperCase()}
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
                  value={currentStats[currentField]}
                  onChange={(event) => {
                    currentStats[currentField] = event.target.value;
                    setCurrentStats({ ...currentStats });
                  }}
                />
              </Grid>
            );
          })}
          <Grid xs={6} md={6} mt={2}>
            <FormGroup>
              <FormControlLabel
                sx={{ position: 'relative', ml: 0.8 }}
                control={<Checkbox defaultChecked />}
                checked={currentStats.paint}
                onChange={(event) => {
                  currentStats.paint = event.target.checked;
                  setCurrentStats({ ...currentStats });
                }}
                label={
                  <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                    PAINT
                  </InputLabel>
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddWall(false)}>Cancel</Button>{' '}
        <Button
          onClick={() => {
            setAddWall(false);
            handleCreate();
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoreDetails;
