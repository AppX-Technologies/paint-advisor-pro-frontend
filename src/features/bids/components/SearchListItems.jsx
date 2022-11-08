import React from 'react';
import { Box, Divider, ListItem, Typography } from '@mui/material';

const SearchListItems = ({ selectedListItem, onSelecetedListItemChange, idx }) => {
  return (
    <>
      <Box
        mt={idx === 0 ? 1 : 0}
        onClick={() => onSelecetedListItemChange(idx)}
        bgcolor={selectedListItem === idx ? '#D50000' : '#F5F5F5'}
        color={selectedListItem === idx ? 'white' : 'dark'}
        sx={{ cursor: 'pointer' }}>
        <Divider light />
        <ListItem>
          <Typography sx={{ fontSize: '14px' }}>Search Item</Typography>
        </ListItem>
      </Box>
    </>
  );
};

export default SearchListItems;
