import {
  AppBar,
  Backdrop,
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 2 }}>
              {Array(20)
                .fill(0)
                .map(() => {
                  return (
                    <>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label='Filter' />
                      </FormGroup>
                    </>
                  );
                })}
            </Box>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default Filter;
