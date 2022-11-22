import React from 'react';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import { convertStringCase } from '../../../helpers/stringCaseConverter';

const SearchListItems = ({ selectedListItem, onSelecetedListItemChange, idx, client }) => {
  return (
    <>
      <Box
        mt={idx === 0 ? 1 : 0}
        onClick={() => onSelecetedListItemChange(client.customerName)}
        bgcolor={selectedListItem === client.customerName ? '#D50000' : '#F5F5F5'}
        color={selectedListItem === client.customerName ? 'white' : 'dark'}
        sx={{ cursor: 'pointer' }}>
        <Divider light />
        <ListItem>
          <Typography sx={{ fontSize: '14px' }}>
            {convertStringCase(client ? client.customerName : '')}
          </Typography>
        </ListItem>
      </Box>
    </>
  );
};

export default SearchListItems;
