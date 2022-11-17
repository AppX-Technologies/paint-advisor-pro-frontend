import { Box, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { useDispatch } from 'react-redux';

const Card = ({
  items,
  title,
  onCardDelete,
  field,
  totalArea = 0,
  setRoomInfoToEdit,
  onopenAddMoreDetailsChange,
  setOpenDeleteModal,
  setCurentAddMore
}) => {
  const dimension = `${items.length}x${items.height ? items.height : items.width}`;
  const dispatch = useDispatch();

  // dispatch(
  //   showMessage({
  //     message: `${titleField.toUpperCase()} Is Updated Successfully.`,
  //     severity: 'success'
  //   })
  // );
  return (
    <Box
      className='card-box'
      bgcolor={items.isTotal ? '#f0f0f0' : '#faf2f0'}
      p={1}
      sx={{ height: field === 'nonPaintableAreas' ? '30px' : 'auto' }}>
      {/* Header-section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '700' }}>
          {title}
        </Typography>

        {/* Action */}
        {field !== 'nonPaintableAreas' && (
          <>
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

              <EditIcon
                sx={{
                  color: (theme) => theme.editicon.color.main,
                  fontSize: '18px',
                  mr: 0.5,
                  cursor: 'pointer'
                }}
                size='small'
                onClick={() => {
                  setRoomInfoToEdit(items);
                  onopenAddMoreDetailsChange(true);
                  setCurentAddMore(field);
                }}
              />
              <DeleteIcon
                sx={{
                  color: (theme) => theme.deleteicon.color.main,
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
                size='small'
                onClick={() => {
                  setCurentAddMore(field);
                  onCardDelete(items._id, field);
                  setOpenDeleteModal(true);
                }}
              />
            </Box>
          </>
        )}
      </Box>
      {/* Body-section */}

      {field !== 'nonPaintableAreas' ? (
        <>
          {Object.keys(items)
            .filter((x) => x === 'coats')
            .map((item) => {
              return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>{item}</Typography>

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
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '14px', mb: 2, color: '#736f6f', fontWeight: '600' }}>
              {items.description} :
            </Typography>
            <Typography sx={{ fontSize: '14px', mb: 2, color: '#736f6f', fontWeight: '600' }}>
              {items.isTotal ? totalArea : items.area}
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
              {!items.isTotal && (
                <>
                  <EditIcon
                    sx={{
                      color: (theme) => theme.editicon.color.main,
                      fontSize: '18px',
                      mr: 0.5,
                      cursor: 'pointer'
                    }}
                    size='small'
                    onClick={() => {
                      setRoomInfoToEdit(items);
                      onopenAddMoreDetailsChange(true);
                    }}
                  />
                  <DeleteIcon
                    sx={{
                      color: (theme) => theme.deleteicon.color.main,
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                    size='small'
                    onClick={() => {
                      onCardDelete(items._id, field);
                      setOpenDeleteModal(true);
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Card;
