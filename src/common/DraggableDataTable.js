import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Table from '@mui/material/Table';
import MoreVertIcon from '@mui/icons-material/DragHandleOutlined';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? '#757ce8' : 'white',
  ...draggableStyle
});

export const DraggableDataTable = ({
  isLoading,
  initialDataList,
  columns,
  title,
  setOpenEditForm,
  setOpenDeleteModal,
  onDeleteBtnClick,
  setEditFormData,
  onListSort,
  draggable = false,
  deleteByEmail = false,
  viewCompany = false
}) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let movedItems = reorder(initialDataList, result.source.index, result.destination.index);
    onListSort(movedItems);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography
          sx={{
            padding: 2
          }}
          color='inherit'
          variant='subtitle1'
          component='div'>
          <Typography color='inherit' variant='subtitle'>
            {title}
          </Typography>
          {isLoading && (
            <CircularProgress
              sx={{
                marginLeft: 2
              }}
              color='primary'
              size={16}
            />
          )}
        </Typography>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {draggable && <TableCell sx={{ fontSize: '16px', fontWeight: '550' }}></TableCell>}
              {columns.map((column) => {
                return (
                  <TableCell
                    sx={{
                      fontSize: '16px',
                      fontWeight: '550',
                      color: '#4d5057'
                    }}>
                    {column.label}
                  </TableCell>
                );
              })}
              <TableCell sx={{ fontSize: '16px', fontWeight: '550', color: '#4d5057' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable isDropDisabled={!draggable} droppableId='droppable'>
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {initialDataList && initialDataList.length > 0 ? (
                    initialDataList.map((rowItem, index) => (
                      <Draggable
                        isDragDisabled={!draggable}
                        key={rowItem._id}
                        draggableId={'q-' + rowItem._id}
                        index={index}>
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                            {draggable && (
                              <TableCell component='th' scope='row' style={{ width: '5%' }}>
                                <MoreVertIcon />
                              </TableCell>
                            )}

                            {columns.map((item) => (
                              <TableCell
                                component='th'
                                scope='row'
                                style={{
                                  width: `${item.width ? item.width : '20%'}`
                                }}>
                                {item.name === 'status' ? (
                                  <Chip
                                    label={rowItem['active'] ? 'Active' : 'Inactive'}
                                    color={rowItem['active'] ? 'success' : 'primary'}>
                                    Inactive
                                  </Chip>
                                ) : Array.isArray(rowItem[item.name]) ? (
                                  rowItem[item.name]
                                    .map(
                                      (item) => item[0].toUpperCase() + item.slice(1, item.length)
                                    )
                                    .join(', ')
                                ) : (
                                  rowItem[item.name]
                                )}
                              </TableCell>
                            ))}
                            <TableCell style={{ width: '50%' }}>
                              <Stack direction='row' spacing={2}>
                                <EditOutlinedIcon
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setEditFormData(rowItem);
                                    setOpenEditForm(true);
                                  }}
                                />
                                {viewCompany && (
                                  <Link to={`/company/${rowItem._id}`} target='_blank'>
                                    <RemoveRedEyeOutlinedIcon
                                      style={{
                                        cursor: 'pointer',
                                        color: 'black'
                                      }}
                                    />
                                  </Link>
                                )}
                                <DeleteOutlineOutlinedIcon
                                  style={{ cursor: 'pointer' }}
                                  onClick={(e) => {
                                    setOpenDeleteModal(true);
                                    onDeleteBtnClick(
                                      e,
                                      deleteByEmail ? rowItem.email : rowItem._id
                                    );
                                  }}
                                />
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length + 2}>
                        <h4 style={{ textAlign: 'center', fontSize: '18px' }}>No Data Available</h4>
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
          {/* </TableBody> */}
        </Table>
      </TableContainer>
    </>
  );
};
