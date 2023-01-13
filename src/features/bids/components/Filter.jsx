import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Backdrop,
  Box,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { bidStageFilter } from '../../../common/bidStageFilters';
import Button from '../../../components/Button';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />;
});

const Filter = ({
  showFilter,
  onFilterOptionsClose,
  bidFilterValues,
  onBidFilterValueChange,
  handlePrimaryFilter
}) => {
  const handleBidFilter = (filterValues) => {
    const { label, value } = filterValues;
    const findFilterLabel = bidFilterValues.find((bidValue) => bidValue.label === label);
    if (!findFilterLabel) {
      bidFilterValues.push({ label, values: [value] });
    } else {
      if (findFilterLabel.values.includes(value)) {
        findFilterLabel.values.splice(findFilterLabel.values.indexOf(value), 1);
      } else {
        findFilterLabel.values.push(value);
      }
    }

    onBidFilterValueChange([...bidFilterValues]);
  };

  const handleBidGroupFilter = (groupFilterValue) => {
    const { label, values } = groupFilterValue;
    const findFilterLabel = bidFilterValues.find((bidValue) => bidValue.label === label);
    if (!findFilterLabel) {
      bidFilterValues.push({ label, values: [...values] });
    } else {
      if (findFilterLabel.values.length !== values.length) {
        const arrayValues = [...values];
        findFilterLabel.values = arrayValues;
      } else {
        findFilterLabel.values = [];
      }
    }
    onBidFilterValueChange([...bidFilterValues]);
  };

  return (
    <>
      {showFilter && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showFilter}>
          <Dialog
            fullScreen
            open={showFilter}
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
            {bidStageFilter.map((filter) => {
              return (
                <Box>
                  <FormGroup sx={{ ml: 1 }}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      onChange={() =>
                        handleBidGroupFilter({ label: filter.label, values: filter.values })
                      }
                      label={
                        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                          {filter.label}
                        </Typography>
                      }
                      checked={
                        bidFilterValues.find((value) => value.label === filter.label)?.values
                          ?.length === filter.values.length
                      }
                    />
                  </FormGroup>
                  <Grid container sx={{ pl: 2 }}>
                    {filter.values.map((value) => {
                      return (
                        <Grid xs={6} md={4} lg={3}>
                          <FormGroup sx={{ ml: 1 }} size='small'>
                            <FormControlLabel
                              checked={bidFilterValues.some(
                                (bidValue) =>
                                  bidValue.label === filter.label && bidValue.values.includes(value)
                              )}
                              onChange={() => handleBidFilter({ label: filter.label, value })}
                              control={<Checkbox defaultChecked size='small' />}
                              label={<Typography sx={{ fontSize: '13px' }}>{value}</Typography>}
                            />
                          </FormGroup>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Divider light />
                </Box>
              );
            })}
            <Tooltip title='Filter' placement='top'>
              <Box sx={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                <Button
                  color='error'
                  varient='outlined'
                  sx={{ width: '20%', my: 2 }}
                  onClick={() => {
                    handlePrimaryFilter();
                    onFilterOptionsClose(false);
                  }}>
                  Filter
                </Button>
              </Box>
            </Tooltip>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default Filter;
