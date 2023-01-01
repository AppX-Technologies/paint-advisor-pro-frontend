import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  Typography,
  tableCellClasses
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { startCase } from 'lodash';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
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
  setListOfItems,
  expandGlobalPickers,
  setExpandGlobalPickers
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

  const { bidsIsLoading } = useSelector((state) => state.bids);

  const handleRowAddition = () => {
    setListOfItems([
      ...listOfItems,
      {
        id: uuid(),
        description: informationToRender.filter(
          (info) =>
            !listOfItems
              .map((item) => item[pickerTitle.slice(0, pickerTitle.length - 1).toLowerCase()])
              .includes(info._id)
        )[0]?.description,
        [pickerTitle?.slice(0, pickerTitle.length - 1)?.toLowerCase()]: informationToRender.filter(
          (info) =>
            !listOfItems
              .map((item) => item[pickerTitle.slice(0, pickerTitle.length - 1).toLowerCase()])
              .includes(info._id)
        )[0]?._id,
        unitPrice: informationToRender.filter(
          (info) =>
            !listOfItems
              .map((item) => item[pickerTitle.slice(0, pickerTitle.length - 1).toLowerCase()])
              .includes(info._id)
        )[0]?.unitPrice,
        quantity: 1
      }
    ]);
  };

  const handleDeletion = (id) => {
    setListOfItems([...listOfItems.filter((item) => item.id !== id)]);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ my: 2, fontSize: '17px', mr: 2 }}>{pickerTitle}</Typography>
        {!expandGlobalPickers[pickerTitle.toLowerCase()] ? (
          <Tooltip title={`Expand More ${pickerTitle}`} placement='top'>
            <ExpandMoreIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                expandGlobalPickers[pickerTitle.toLowerCase()] = true;
                setExpandGlobalPickers({ ...expandGlobalPickers });
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title={`Expand Less ${pickerTitle}`} placement='top'>
            <ExpandLessIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                expandGlobalPickers[pickerTitle.toLowerCase()] = false;
                setExpandGlobalPickers({ ...expandGlobalPickers });
              }}
            />
          </Tooltip>
        )}
      </Box>
      {expandGlobalPickers[pickerTitle.toLowerCase()] && (
        <>
          <TableContainer component={Paper} sx={{ display: !bidsIsLoading ? 'auto' : 'none' }}>
            <Table
              size='small'
              aria-label='a dense table'
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none'
                }
              }}>
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid lightgray' }}>
                  {columns &&
                    columns.map((column) => {
                      return <TableCell align='center'>{startCase(column)}</TableCell>;
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
                          <TableCell align='center' sx={{ padding: 0, borderBottom: 'none' }}>
                            {column === 'material' || column === 'equipment' ? (
                              <AutoComplete
                                varient='standard'
                                InputProps={{
                                  style: { borderRadius: 0 },
                                  disableUnderline: true
                                }}
                                filterOptions={filterOptions}
                                defaultValue={row.description}
                                value={
                                  row.description
                                    ? row.description
                                    : globalPickerStatsToView[pickerTitle.toLowerCase()]?.find(
                                        (picker) => picker.id === row.id
                                      )?.description ?? ''
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
                                  listOfItems.find((item) => item.id === row.id)[column] =
                                    newInput._id;
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
                                    ? informationToRender
                                        ?.filter(
                                          (info) =>
                                            !listOfItems
                                              .map(
                                                (item) =>
                                                  item?.[
                                                    pickerTitle
                                                      .toLowerCase()
                                                      .slice(0, pickerTitle.length - 1)
                                                  ]
                                              )
                                              .includes(info._id)
                                        )
                                        ?.map((item) => {
                                          return item;
                                        })
                                    : []
                                }
                                filterOption={filterOption}
                                secondaryValuesToRender={secondaryValuesToRender}
                              />
                            ) : (
                              <TextField
                                sx={{ height: '100%', ml: 1 }}
                                type='number'
                                variant='standard'
                                InputProps={{
                                  inputProps: {
                                    min: 1,
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                // InputProps={{
                                //   style: { borderRadius: 0 },
                                //   disableUnderline: true
                                // }}
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
                            sx={{
                              color: (theme) => theme.deleteicon.color.main,
                              fontSize: '15px',
                              cursor: 'pointer',
                              mt: 1
                            }}
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
      )}
    </>
  );
};

export default GlobalPickers;
