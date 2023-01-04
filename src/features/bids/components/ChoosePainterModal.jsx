import { Grid, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import { PainterDetail } from './PainterCard';

export default function ChoosePainterModal({
  choosePainterModalData,
  handleClosePainterChooseModal,
  painterList,
  handleSelectPainter,
  addOrRemovePainter
}) {
  return (
    <Dialog open={choosePainterModalData !== null} onClose={handleClosePainterChooseModal}>
      <Toolbar sx={{ backgroundColor: '#D50000', p: 0 }}>
        <Typography sx={{ p: 0, flex: 1, color: 'white' }} variant='h6' component='div'>
          Select Painter
        </Typography>
      </Toolbar>
      <DialogContent sx={{ minWidth: !painterList.length && '40vw' }}>
        {!painterList.length && (
          <Typography sx={{ textAlign: 'center' }}>No Painter Available</Typography>
        )}
        <Grid container>
          {painterList?.map((painter) => {
            return (
              <Grid xs={12} md={12} lg={12}>
                <PainterDetail
                  painter={painter}
                  addOrRemovePainter={addOrRemovePainter}
                  selected={choosePainterModalData?.painter?.find(
                    (x) => x.labourId === painter._id
                  )}
                  selectable
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePainterChooseModal}>Cancel</Button>
        <Button type='submit' variant='contained' onClick={handleSelectPainter}>
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}
