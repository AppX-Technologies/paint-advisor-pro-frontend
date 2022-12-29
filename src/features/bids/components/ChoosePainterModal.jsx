import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Chip, Grid, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

const painterDetailFields = [
  {
    name: 'name',
    label: 'Name',
    icon: <DriveFileRenameOutlineIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  },
  {
    name: 'role',
    label: 'Role',
    icon: <AdminPanelSettingsIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  },
  {
    name: 'email',
    label: 'Email',
    icon: <EmailIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  },
  {
    name: 'proficiency',
    label: 'Proficiency',
    icon: <StarBorderIcon fontSize='16px' sx={{ marginBottom: '-5px', mr: 1 }} />
  }
];

const PainterDetail = ({ painter, addOrRemovePainter, selected }) => {
  return (
    <Box sx={{ padding: '5px' }} onClick={() => addOrRemovePainter(painter)}>
      <Grid
        container
        sx={{
          padding: '5px',
          border: '1px solid lightgray',
          borderRadius: '10px',
          cursor: 'pointer',
          backgroundColor: selected ? '#e6e6e6' : ''
        }}>
        {painterDetailFields.map((field) => {
          return (
            <Grid xs={12} md={12} lg={6}>
              {field.icon}
              <span style={{ fontSize: '14px' }}>
                {field.label}:{' '}
                <span style={{ fontWeight: '300', fontSize: '12px' }}>
                  {painter?.[field.name]}{' '}
                  {field.name === 'proficiency' && (
                    <Chip
                      color='success'
                      sx={{ height: '16px', cursor: 'pointer', ml: 2 }}
                      label='$521'
                      size='small'
                    />
                  )}
                </span>
              </span>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default function ChoosePainterModal({
  choosePainterModalData,
  setChoosePainterModalData,
  handleClosePainterChooseModal,
  painterList,
  handleSelectPainter,
  selectedPainter
}) {
  const addOrRemovePainter = (painter) => {
    const id = painter._id;
    const isPainterChoosed = choosePainterModalData?.painter.find((x) => x._id === id);
    if (isPainterChoosed) {
      setChoosePainterModalData({
        painter: choosePainterModalData?.painter.filter((x) => x._id !== id)
      });
    } else {
      setChoosePainterModalData({ painter: [...choosePainterModalData.painter, painter] });
    }
  };

  return (
    <Dialog open={choosePainterModalData !== null} onClose={handleClosePainterChooseModal}>
      <Toolbar sx={{ backgroundColor: '#D50000', p: 0 }}>
        <Typography sx={{ p: 0, flex: 1, color: 'white' }} variant='h6' component='div'>
          Select Painter
        </Typography>
      </Toolbar>
      <DialogContent>
        <Grid container>
          {painterList?.map((painter) => {
            return (
              <Grid xs={12} md={12} lg={12}>
                <PainterDetail
                  painter={painter}
                  addOrRemovePainter={addOrRemovePainter}
                  selected={choosePainterModalData?.painter.find((x) => x._id === painter._id)}
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
