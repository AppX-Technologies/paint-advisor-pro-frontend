import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Backdrop,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import Button from '../../../../../components/Button';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />;
});

const EstimationDetails = ({
  estimationDetailsMeta,
  setEstimationDetailsMeta,
  onEstimationDetailsChange
}) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={estimationDetailsMeta}>
        <Dialog
          fullScreen
          open={estimationDetailsMeta}
          TransitionComponent={Transition}
          style={{ width: '50%', marginLeft: 'auto' }}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Estimation Details
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={onEstimationDetailsChange}
                aria-label='close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Dialog>
      </Backdrop>
    </>
  );
};

export default EstimationDetails;
