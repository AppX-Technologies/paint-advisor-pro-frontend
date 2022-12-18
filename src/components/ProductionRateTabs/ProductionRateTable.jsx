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
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/productionRate/productionRateSlice';
import { showMessage } from '../../features/snackbar/snackbarSlice';
import { filterProductionRates } from '../../helpers/productionRateHelper';
import EditIndividualPainterProductionR from './EditIndividualPainterProductionR';

const rowDataGenerator = (companyData) => {
  const result = [];
  function avgCalculator(section) {
    const types = companyData[section];
    const totalTypes = companyData[section].length;
    const beginnerAvg = types.map((type) => type.beginner).reduce((a, b) => a + b) / totalTypes;
    const intermediateAvg =
      types.map((type) => type.intermediate).reduce((a, b) => a + b) / totalTypes;
    const proficientAvg = types.map((type) => type.proficient).reduce((a, b) => a + b) / totalTypes;
    return {
      beginnerAvg: beginnerAvg.toFixed(1),
      intermediateAvg: intermediateAvg.toFixed(1),
      proficientAvg: proficientAvg.toFixed(1)
    };
  }
  Object.keys(companyData).forEach((item) => {
    result.push({
      section: item,
      ...avgCalculator(item),
      summary: companyData[item]
    });
  });
  return result;
};

function Row({ row, onEditClick }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} selected={open}>
        <TableCell sx={{ maxWidth: '10px' }}>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.section}</TableCell>
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
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ backgroundColor: '', width: 'auto', margin: '0 0 0 5.5%' }}>
              <Table size='small'>
                <TableBody>
                  {row.summary.map((summaryRow) => (
                    <TableRow key={summaryRow.appliesToType}>
                      <TableCell align='left' sx={{ width: '21%', fontSize: '12px' }}>
                        {summaryRow.appliesToType}
                      </TableCell>
                      <TableCell align='left' sx={{ width: '24.4%', fontSize: '12px' }}>
                        {summaryRow.beginner}{' '}
                        <span style={{ fontSize: '9px' }}>
                          ft<sup>2</sup>/hr
                        </span>
                      </TableCell>
                      <TableCell align='left' sx={{ width: '30.2%', fontSize: '12px' }}>
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
  React.useEffect(() => {
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
  const rows = rowDataGenerator(filteredListByBidType);

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
      <EditIndividualPainterProductionR
        editState={editState}
        setEditState={setEditState}
        onEditClose={onEditClose}
        bidType={filterValue}
      />
    </>
  );
}
