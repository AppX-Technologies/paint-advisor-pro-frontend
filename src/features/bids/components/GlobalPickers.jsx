/* eslint-disable */

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  createFilterOptions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import uuid from 'react-uuid';

import { startCase } from 'lodash';
import React, { useMemo } from 'react';
import AutoComplete from '../../../common/AutoComplete';
import { GLOBAL_PICKER_FIELDS } from '../../../helpers/contants';

const GlobalPickers = ({
  pickerTitle,
  filterOption,
  informationToRender,
  secondaryValuesToRender,
  globalPickerStatsToView,
  setGlobalPickerStatsToView,
  listOfItems,
  setListOfItems
}) => {
  const filterOptions = useMemo(() => {
    return createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option[filterOption]
    });
  }, [pickerTitle]);

  const columns = useMemo(() => {
    return GLOBAL_PICKER_FIELDS.find((field) => field.label === pickerTitle.toLowerCase()).fields;
  }, []);

  const handleRowAddition = () => {
    setListOfItems([...listOfItems, { id: uuid() }]);
  };

  const handleDeletion = (id) => {
    setListOfItems([...listOfItems.filter((item) => item.id !== id)]);
  };

  return (
    <>
      <Typography sx={{ my: 2, fontSize: '17px', mr: 2 }}>{pickerTitle}</Typography>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column) => {
                  return <TableCell align='left'>{startCase(column)}</TableCell>;
                })}
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfItems && listOfItems.length === 0 && (
              <TableCell colSpan={columns && columns.length + 1} align='center'>
                No Items To Show
              </TableCell>
            )}
            {listOfItems &&
              listOfItems.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    return (
                      <TableCell align='center' sx={{ padding: 0 }}>
                        {column === 'material' ? (
                          <AutoComplete
                            filterOptions={filterOptions}
                            value={
                              row.description ??
                              globalPickerStatsToView[pickerTitle.toLowerCase()][0]?.description
                            }
                            onChange={(event, newInput) => {
                              listOfItems.find((item) => item.id === row.id)['unitPrice'] =
                                informationToRender.find(
                                  (info) => info._id === newInput._id
                                )?.unitPrice;

                              listOfItems.find((item) => item.id === row.id)['quantity'] = 1;
                              listOfItems.find((item) => item.id === row.id)['description'] =
                                informationToRender.find(
                                  (info) => info._id === newInput._id
                                )?.description;
                              listOfItems.find((item) => item.id === row.id)[column] = newInput._id;
                              setListOfItems([...listOfItems]);
                              if (
                                globalPickerStatsToView[pickerTitle.toLowerCase()].find(
                                  (item) => item.id === row.id
                                )
                              ) {
                                globalPickerStatsToView[pickerTitle.toLowerCase()].find(
                                  (item) => item.id === row.id
                                ).description = newInput[filterOption];
                              } else {
                                globalPickerStatsToView[pickerTitle.toLowerCase()].push({
                                  id: row.id,
                                  description: newInput[filterOption]
                                });
                              }

                              setGlobalPickerStatsToView({ ...globalPickerStatsToView });
                            }}
                            options={
                              informationToRender
                                ? informationToRender?.map((item) => {
                                    return item;
                                  })
                                : []
                            }
                            filterOption={filterOption}
                            secondaryValuesToRender={secondaryValuesToRender}
                            pickerTitle={pickerTitle}
                          />
                        ) : (
                          <TextField
                            type='number'
                            variant='standard'
                            InputProps={{
                              style: { borderRadius: 0 },
                              disableUnderline: true
                            }}
                            hiddenLabel
                            size='small'
                            value={listOfItems.find((item) => item.id === row.id)[column]}
                            onChange={(e) => {
                              listOfItems.find((item) => item.id === row.id)[column] =
                                e.target.value;
                              setListOfItems([...listOfItems]);
                            }}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align='center'>
                    <Tooltip title='Remove' placement='top'>
                      <DeleteIcon
                        sx={{ color: (theme) => theme.deleteicon.color.main, fontSize: '15px' }}
                        onClick={() => handleDeletion(row.id)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        mt={1}
        sx={{ width: '100%', ml: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography>
            Total Price: $
            {listOfItems.reduce((total, indiItem) => {
              return total + Number(indiItem.quantity) * Number(indiItem.unitPrice);
            }, 0) || 0}
          </Typography>
        </Box>
        <Button
          size='small'
          onClick={handleRowAddition}
          variant='outlined'
          endIcon={<AddIcon sx={{ mb: 0.2, fontWeight: '500' }} />}
          color='error'>
          Add
        </Button>
      </Box>
    </>
  );
};

export default GlobalPickers;
