import {
  AppBar,
  Backdrop,
  Box,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { BID_TYPES } from '../../../helpers/contants';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />;
});

const Filter = ({ showFilter, onFilterOptionsClose }) => {
  return (
    <>
      {showFilter && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showFilter}
          onClick={() => onFilterOptionsClose()}>
          <Dialog
            fullScreen
            open={showFilter}
            onClose={onFilterOptionsClose}
            TransitionComponent={Transition}
            style={{ width: '50%', marginLeft: 'auto' }}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                  Filter
                </Typography>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={onFilterOptionsClose}
                  aria-label='close'>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box>
              <Typography sx={{ mt: 1, mx: 1 }}>Filter By Bid Types</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                {BID_TYPES.map((bid) => {
                  return (
                    <FormGroup>
                      <FormControlLabel control={<Checkbox defaultChecked />} label={bid} />
                    </FormGroup>
                  );
                })}
              </Box>
              <Divider />
            </Box>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default Filter;
