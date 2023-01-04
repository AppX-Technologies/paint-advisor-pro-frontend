import CloseIcon from '@mui/icons-material/Close';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import {
  AppBar,
  Backdrop,
  Box,
  Dialog,
  IconButton,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import { calculateEstimate } from '../helpers/paintEngine';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />;
});

const tableHead = ['Description', 'Detail and Costing'];

const totalingFields = [
  {
    name: 'paintableArea',
    label: 'Total Paintable Area'
  },
  {
    name: 'labourCost',
    label: 'Labour Cost'
  },
  {
    name: 'materialCost',
    label: 'Material Cost'
  },
  {
    name: 'subTotal',
    label: 'Sub Total'
  },

  {
    name: 'discount',
    label: 'Discount'
  },
  {
    name: 'invoiceTotal',
    label: 'Invoice Total'
  }
];

const roomFields = ['paintableArea', 'labourCost', 'materialCost'];
console.log(calculateEstimate(), 'calculateEstimate');
const EstimationDetails = ({ estimationDetailData, onEstimationDetailModalClose }) => {
  const [viewDetails, setViewDetails] = useState(false);
  function isRoomField(fieldName) {
    return roomFields.includes(fieldName);
  }
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={estimationDetailData}>
      <Dialog
        fullScreen
        open={estimationDetailData}
        TransitionComponent={Transition}
        style={{ width: '50%', marginLeft: 'auto' }}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 0, flex: 1 }} variant='h6' component='div'>
              Estimation Detail
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={onEstimationDetailModalClose}
              aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: '100%', p: 2 }}>
          <TableContainer sx={{ p: 1, m: 1 }} component={Paper}>
            <Table size='small' sx={{ minWidth: 'auto' }}>
              <TableHead>
                <TableRow>
                  {tableHead.map((title) => {
                    return (
                      <TableCell align={title === 'Description' ? 'left' : 'right'}>
                        {title}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {totalingFields.map((fields) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell
                        sx={{
                          fontWeight: !isRoomField(fields.name) ? '400' : '300'
                        }}>
                        {fields.label}
                      </TableCell>
                      <TableCell
                        align='right'
                        sx={{ fontWeight: !isRoomField(fields.name) ? '400' : '300' }}>
                        {fields.name !== 'paintableArea' && fields.name !== 'discount' && '$'}
                        {estimationDetailData?.[fields.name] ?? 0}{' '}
                        {fields.name === 'paintableArea' && 'sq ft'}
                        {fields.name === 'discount' && '%'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse', cursor: 'pointer' }}>
            {viewDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            <Typography
              sx={{
                fontSize: '13px',
                ml: 1,
                mt: 0.3
              }}
              onClick={() => setViewDetails(!viewDetails)}>
              {viewDetails ? 'View Less' : 'View Detail'}
            </Typography>
          </Box>
          {viewDetails &&
            estimationDetailData?.rooms?.map((roomInfo) => {
              return (
                <Box>
                  <Box sx={{ display: 'flex', ml: 2 }}>
                    <MapsHomeWorkIcon sx={{ color: (theme) => theme.palette.primary.main }} />
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: '700',
                        ml: 1,
                        mt: 0.5
                      }}>
                      {roomInfo.roomName}
                    </Typography>
                  </Box>
                  <TableContainer sx={{ p: 1, m: 1 }} component={Paper}>
                    <Table size='small' sx={{ minWidth: 'auto' }}>
                      <TableBody>
                        {totalingFields
                          .filter((x) => isRoomField(x.name) || x.name === 'invoiceTotal')
                          .map((fields) => {
                            return (
                              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                  sx={{
                                    fontWeight: !isRoomField(fields.name) ? '400' : '300'
                                  }}>
                                  {fields.label}
                                </TableCell>
                                <TableCell
                                  align='right'
                                  sx={{
                                    fontWeight: !isRoomField(fields.name) ? '400' : '300'
                                  }}>
                                  {fields.name !== 'paintableArea' && '$'}
                                  {roomInfo?.[fields.name] ?? 100}{' '}
                                  {fields.name === 'paintableArea' && 'sq ft'}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              );
            })}
        </Box>
      </Dialog>
    </Backdrop>
  );
};

export default EstimationDetails;
