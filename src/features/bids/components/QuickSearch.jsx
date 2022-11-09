import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Box, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import SearchListItems from './SearchListItems';

const QuickSearch = ({ onSelecetedListItemChange, selectedListItem }) => {
  return (
    <>
      <Box
        ml={1}
        sx={{
          border: '1px solid lightgray',
          borderRadius: '15px',
          height: '74vh'
        }}>
        {/* Searchbox and Pins */}

        <Box sx={{ display: 'flex', mt: 1, p: 0.5 }}>
          <TextField
            InputProps={{
              style: {
                height: '30px',
                marginRight: '2px',
                fontSize: '13px',
                backgroundColor: 'white'
              }
            }}
            id='outlined-basic'
            label={
              <Typography sx={{ marginTop: '-3.1px', fontSize: '11px', marginLeft: '-1px' }}>
                Quick Search...
              </Typography>
            }
            variant='outlined'
            sx={{ width: '100%' }}
            size='small'
          />
          {/* Select */}
          <FormControl sx={{ width: '45%', height: '20px' }} size='small'>
            <Select
              IconComponent={(props) => (
                <PushPinOutlinedIcon {...props} sx={{ width: '14px', height: '14px', mt: 0.5 }} />
              )}
              labelId='demo-select-small'
              id='demo-select-small'
              // onChange={(e) => menuItem.changeValue(e.target.value)}
              sx={{ height: '30px' }}>
              <MenuItem value='abc'>abc</MenuItem>
              <MenuItem value='abc'>def</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* ListItems */}
        <Box sx={{ overflowY: 'scroll', height: '66vh' }}>
          {Array(60)
            .fill(1)
            .map((_, idx) => (
              <SearchListItems
                selectedListItem={selectedListItem}
                idx={idx}
                onSelecetedListItemChange={onSelecetedListItemChange}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default QuickSearch;
