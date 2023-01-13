import { Box, Tooltip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { cloneDeep } from 'lodash';
import { CURRENT_TOTAL_DESCRIPTION, NONPAINTABLEAREAFIELD } from '../helpers/contants';

const Card = ({
  items,
  title,
  field,
  totalArea = 0,
  setRoomInfoToEdit,
  onopenAddMoreDetailsChange,
  setOpenDeleteModal,
  setCurentAddMore,
  setitemToBeDeleted,
  roomFormValue
}) => {
  const dimension = useMemo(() => {
    return `${items.length ?? items.linearFeet}x${items.height ?? items.width}`;
  }, [items]);

  return (
    <Box
      className='card-box'
      bgcolor={items.description === CURRENT_TOTAL_DESCRIPTION ? '#faf2ff' : '#faf2f0'}
      p={1}
      sx={{
        height: field === 'nonPaintableAreas' ? '30px' : 'auto',
        width: field === 'nonPaintableAreas' ? '97%' : 'auto'
      }}>
      {/* Header-section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '700' }}>
          {title}
        </Typography>

        {/* Action */}
        {field !== 'nonPaintableAreas' && (
          <Box sx={{ display: 'flex' }}>
            {items.paint && (
              <FormatPaintIcon
                sx={{
                  color: 'green',
                  fontSize: '18px',
                  mr: 0.5,
                  cursor: 'pointer'
                }}
                size='small'
              />
            )}
            <Tooltip title='Clone' placement='top'>
              <ContentCopyIcon
                sx={{
                  color: '#458c2b',
                  fontSize: '18px',
                  mr: 0.5,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setRoomInfoToEdit({ ...cloneDeep(items), edit: false });
                  onopenAddMoreDetailsChange(true);
                  setCurentAddMore(field);
                }}
                size='small'
              />
            </Tooltip>
            <Tooltip title='Edit' placement='top'>
              <EditIcon
                sx={{
                  color: (theme) => theme.editicon.color.main,
                  fontSize: '18px',
                  mr: 0.5,
                  cursor: 'pointer'
                }}
                size='small'
                onClick={() => {
                  setRoomInfoToEdit({ ...cloneDeep(items), edit: true });
                  onopenAddMoreDetailsChange(true);
                  setCurentAddMore(field);
                }}
              />
            </Tooltip>
            <Tooltip title='Delete' placement='top'>
              <DeleteIcon
                sx={{
                  color: (theme) => theme.deleteicon.color.main,
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
                size='small'
                onClick={() => {
                  setCurentAddMore(field);
                  setOpenDeleteModal(true);
                  setitemToBeDeleted({ title, field, roomFormValue });
                }}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
      {/* Body-section */}

      {field !== NONPAINTABLEAREAFIELD ? (
        <>
          {Object.keys(items)
            .filter((x) => x === 'coats')
            .map((item) => {
              return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>Coat</Typography>

                  <Typography sx={{ fontSize: '13px', color: '#736f6f', fontWeight: '600' }}>
                    {items[item]}
                  </Typography>
                </Box>
              );
            })}

          {Object.keys(items)
            ?.filter((x) => x === 'wallInfo')
            ?.map((item) => {
              return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>Wall</Typography>

                  <Typography sx={{ fontSize: '13px', color: '#736f6f', fontWeight: '600' }}>
                    {items[item]}
                  </Typography>
                </Box>
              );
            })}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>Dimensions</Typography>
            <Typography sx={{ fontSize: '13px', color: '#736f6f', fontWeight: '600' }}>
              {dimension}
            </Typography>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title={items.description} placement='top'>
            <Typography sx={{ fontSize: '14px', mb: 2, color: '#736f6f', fontWeight: '600' }}>
              {items.description.length >= 15
                ? `${items.description.slice(0, 15)}...`
                : items.description}{' '}
              :
            </Typography>
          </Tooltip>
          <Typography sx={{ fontSize: '14px', mb: 2, color: '#736f6f', fontWeight: '600' }}>
            {items.description === CURRENT_TOTAL_DESCRIPTION ? totalArea : items.area}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {items.paint && (
              <FormatPaintIcon
                sx={{
                  color: 'green',
                  fontSize: '18px',
                  mr: 0.5,
                  cursor: 'pointer'
                }}
                size='small'
              />
            )}
            {items.description !== CURRENT_TOTAL_DESCRIPTION && (
              <>
                <Tooltip title='Clone' placement='top'>
                  <ContentCopyIcon
                    sx={{
                      color: '#458c2b',
                      fontSize: '18px',
                      mr: 0.5,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setRoomInfoToEdit({ ...cloneDeep(items), edit: false });
                      onopenAddMoreDetailsChange(true);
                      setCurentAddMore(field);
                    }}
                    size='small'
                  />
                </Tooltip>
                <Tooltip title='Edit' placement='top'>
                  <EditIcon
                    sx={{
                      color: (theme) => theme.editicon.color.main,
                      fontSize: '18px',
                      mr: 0.5,
                      cursor: 'pointer'
                    }}
                    size='small'
                    onClick={() => {
                      setRoomInfoToEdit({ ...cloneDeep(items), edit: true });
                      onopenAddMoreDetailsChange(true);
                      setCurentAddMore(field);
                    }}
                  />
                </Tooltip>
                <Tooltip title='Delete' placement='top'>
                  <DeleteIcon
                    sx={{
                      color: (theme) => theme.deleteicon.color.main,
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                    size='small'
                    onClick={() => {
                      setCurentAddMore(field);
                      setOpenDeleteModal(true);
                      setitemToBeDeleted({ title: items.description, field, roomFormValue });
                    }}
                  />
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Card;
