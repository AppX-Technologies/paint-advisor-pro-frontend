import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgress, Stack, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
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
import {
  avgCalculator,
  filterProductionRates,
  proffiencyTableTableFields
} from '../../helpers/productionRateHelper';
import EditIndividualPainterProductionR from './EditIndividualPainterProductionR';

const tableCellStyle = {
  fontSize: '15px',
  maxWidth: `${60 / (proffiencyTableTableFields.length + 1)}%`,
  minWidth: `${60 / proffiencyTableTableFields.length + 1}%`,
  fontWeight: '550'
};

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

// Go to ../../helpers/productionRateHelper(proffiencyTableTableFields) to change table fields
function Row({ row, onEditClick }) {
  const [viewMore, setViewMore] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
          sx={{
            fontSize: '15px',
            width: '1%',
            fontWeight: '550'
          }}>
          {viewMore ? (
            <KeyboardArrowUpIcon onClick={() => setViewMore(!viewMore)} />
          ) : (
            <KeyboardArrowDownIcon onClick={() => setViewMore(!viewMore)} />
          )}
        </TableCell>
        <TableCell style={{}}>{startCase(row.section)}</TableCell>
        {proffiencyTableTableFields.map((proff) => {
          return (
            <TableCell align='left' style={{}}>
              {(row[proff.name] !== 'NaN' ? row[proff.name] : null) || 'N/A'}
              {row[proff.name] !== 'NaN' && (
                <span style={{ fontSize: '10px' }}>
                  {' '}
                  ft<sup>2</sup>/hr
                </span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ padding: 0, margin: 0 }}
          colSpan={proffiencyTableTableFields.length + 2}>
          <Collapse in={viewMore} timeout='auto' unmountOnExit>
            <Table size='small'>
              <TableBody>
                {row.appliesToTypeOfRelatedSection.map((summaryRow) => (
                  <TableRow key={summaryRow.appliesToType} selected>
                    <TableCell
                      sx={{
                        fontSize: '15px',
                        minWidth: '4%',
                        maxWidth: '4%',
                        fontWeight: '550'
                      }}
                    />
                    <TableCell align='left' sx={{ ...tableCellStyle, fontSize: '13px' }}>
                      {summaryRow.appliesToType}
                    </TableCell>
                    {proffiencyTableTableFields.map((proff, index) => {
                      return (
                        <TableCell align='left' sx={{ ...tableCellStyle, fontSize: '12px' }}>
                          {summaryRow[proff.name] === 0 ? 'N/A' : summaryRow[proff.name]}
                          {summaryRow[proff.name] !== 0 && (
                            <span style={{ fontSize: '10px' }}>
                              {' '}
                              ft<sup>2</sup>/hr
                            </span>
                          )}
                          {index === proffiencyTableTableFields.length - 1 && (
                            <EditOutlinedIcon
                              fontSize='15px'
                              sx={{ cursor: 'pointer', float: 'right' }}
                              onClick={() => onEditClick({ ...summaryRow, appliesTo: row.section })}
                            />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
              <TableCell
                sx={{
                  fontSize: '15px',
                  width: '1%',
                  fontWeight: '550'
                }}
              />
              <TableCell sx={tableCellStyle}>Section</TableCell>
              {proffiencyTableTableFields.map((proff) => {
                return (
                  <TableCell align='left' sx={tableCellStyle}>
                    {proff.label}
                  </TableCell>
                );
              })}
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
