import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Box, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchListItems from './SearchListItems';

const QuickSearch = ({
  onSelecetedListItemChange,
  selectedListItem,
  handleSearch,
  filteredClietsList
}) => {
  const { clientList } = useSelector((state) => state.bids);

  useEffect(() => {
    handleSearch('');
  }, [clientList]);

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
            onChange={(e) => handleSearch(e.target.value)}
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
        </Box>

        {/* ListItems */}
        <Box sx={{ overflowY: 'scroll', height: '66vh' }}>
          {filteredClietsList.length === 0 && (
            <Typography sx={{ textAlign: 'center', fontWeight: '500', mt: 1 }}>
              No Clients
            </Typography>
          )}
          {filteredClietsList &&
            filteredClietsList.map((client, idx) => (
              <SearchListItems
                selectedListItem={selectedListItem}
                client={client}
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
