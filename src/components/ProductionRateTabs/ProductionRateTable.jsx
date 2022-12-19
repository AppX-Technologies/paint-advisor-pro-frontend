import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgress, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/productionRate/productionRateSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { avgCalculator, filterProductionRates } from '../../helpers/productionRateHelper';
import EditIndividualPainterProductionR from './EditIndividualPainterProductionR';

const rowDataCalculatorWithAvg = (productionRateList) => {
  const result = [];

  Object.keys(productionRateList).forEach((item) => {
    result.push({
      section: item,
      ...avgCalculator(item, productionRateList),
      appliesToTypeOfRelatedSection: productionRateList[item]
    });
  });
  return result;
};

function Row({ row, onEditClick }) {
  const [viewMore, setViewMore] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ maxWidth: '10px' }}>
          <IconButton size='small' onClick={() => setViewMore(!viewMore)}>
            {viewMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{startCase(row.section)}</TableCell>
        <TableCell align='left'>
          {row.beginnerAvg}{' '}
          <span style={{ fontSize: '10px' }}>
            ft<sup>2</sup>/hr
          </span>
        </TableCell>
        <TableCell align='left'>
          {row.intermediateAvg}{' '}
          <span style={{ fontSize: '10px' }}>
            ft<sup>2</sup>/hr
          </span>
        </TableCell>
        <TableCell align='left'>
          {row.proficientAvg}{' '}
          <span style={{ fontSize: '10px' }}>
            ft<sup>2</sup>/hr
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: '30px' }} colSpan={6}>
          <Collapse in={viewMore} timeout='auto' unmountOnExit>
            <Box sx={{ backgroundColor: '', width: 'auto', margin: '0 0 0 5.5%' }}>
              <Table size='small'>
                <TableBody>
                  {row.appliesToTypeOfRelatedSection.map((summaryRow) => (
                    <TableRow key={summaryRow.appliesToType} selected>
                      <TableCell align='left' sx={{ width: '21.3%', fontSize: '12px' }}>
                        {summaryRow.appliesToType}
                      </TableCell>
                      <TableCell align='left' sx={{ width: '24.6%', fontSize: '12px' }}>
                        {summaryRow.beginner}{' '}
                        <span style={{ fontSize: '9px' }}>
                          ft<sup>2</sup>/hr
                        </span>
                      </TableCell>
                      <TableCell align='left' sx={{ width: '30.4%', fontSize: '12px' }}>
                        {summaryRow.intermediate}{' '}
                        <span style={{ fontSize: '9px' }}>
                          ft<sup>2</sup>/hr
                        </span>
                      </TableCell>
                      <TableCell align='left' sx={{ fontSize: '12px' }}>
                        {summaryRow.proficient}{' '}
                        <span style={{ fontSize: '9px' }}>
                          ft<sup>2</sup>/hr
                        </span>
                      </TableCell>
                      <TableCell align='center'>
                        <EditOutlinedIcon
                          fontSize='15px'
                          sx={{ cursor: 'pointer' }}
                          onClick={() => onEditClick({ ...summaryRow, appliesTo: row.section })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ProductionRateTable({ filterValue }) {
  const [editState, setEditState] = React.useState(null);
  const [filteredListByBidType, setFilteredListByBidType] = useState([]);
  const { productionRateList, isLoading, isSuccess } = useSelector((state) => state.productionRate);
  const dispatch = useDispatch();

  const onEditClick = (rowData) => {
    setEditState({ ...rowData });
  };
  const onEditClose = () => {
    setEditState(null);
  };

  useEffect(() => {
    if (isSuccess) {
      setEditState(null);
      dispatch(
        showMessage({
          message: 'Production rate list updated successfully',
          variant: 'success'
        })
      );
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    setFilteredListByBidType(filterProductionRates(productionRateList[0]?.productionRates));
  }, [filterValue, productionRateList]);
  const rows = rowDataCalculatorWithAvg(filteredListByBidType);

  return (
    <>
      <TableContainer component={Paper}>
        <Stack direction='row' spacing={2} m={2}>
          <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
            Production Rate Table
          </Typography>
          <CircularProgress
            color='primary'
            size={25}
            style={{ display: isLoading ? 'block' : 'none' }}
          />
        </Stack>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                sx={{ fontSize: '15px', width: '19.5%', fontWeight: '550', color: '#4d5057' }}>
                Section
              </TableCell>
              <TableCell
                align='left'
                sx={{ fontSize: '15px', fontWeight: '550', color: '#4d5057' }}>
                Beginner
              </TableCell>
              <TableCell
                align='left'
                sx={{ fontSize: '15px', fontWeight: '550', color: '#4d5057' }}>
                Intermediate
              </TableCell>
              <TableCell
                align='left'
                sx={{ fontSize: '15px', fontWeight: '550', color: '#4d5057' }}>
                Proficient
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} onEditClick={onEditClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editState && (
        <EditIndividualPainterProductionR
          editState={editState}
          setEditState={setEditState}
          onEditClose={onEditClose}
          bidType={filterValue}
        />
      )}
    </>
  );
}
