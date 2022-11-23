import React from 'react';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import { convertStringCase } from '../../../helpers/stringCaseConverter';

const SearchListItems = ({ selectedListItem, onSelecetedListItemChange, idx, client }) => {
  return (
    <>
      <Box
        mt={idx === 0 ? 1 : 0}
        onClick={() => onSelecetedListItemChange(client._id)}
        bgcolor={selectedListItem === client._id ? '#D50000' : 'background.paper'}
        color={selectedListItem === client._id ? 'white' : 'dark'}
        sx={{ cursor: 'pointer' }}>
        <Divider light />
        <ListItem>
          <Typography sx={{ fontSize: '14px' }}>{client ? client.name : ''}</Typography>
        </ListItem>
      </Box>
    </>
  );
};

export default SearchListItems;
