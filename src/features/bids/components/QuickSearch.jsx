import { Box, Card, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { filterClientsBySelectedStep } from '../helpers/generalHepers';
import SearchListItems from './SearchListItems';

const QuickSearch = ({
  onSelecetedListItemChange,
  selectedListItem,
  handleSearch,
  filteredClietsList,
  selectedStep,
  scheduleTheJob
}) => {
  const { clientList, isLoading } = useSelector((state) => state.bids);

  useEffect(() => {
    handleSearch('');
  }, [clientList]);


  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <Box>
        {/* Searchbox and Pins */}

        <Box sx={{ display: 'flex', mt: 1, p: 0.5 }}>
          <TextField
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              style: {
                padding: '0px',
                fontSize: '13px',
                backgroundColor: 'white'
              }
            }}
            id='outlined-basic'
            label={<Typography sx={{ fontSize: '11px' }}>Quick Search...</Typography>}
            variant='outlined'
            sx={{ width: '100%' }}
            size='small'
          />
        </Box>
        {isLoading && !scheduleTheJob && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={20} sx={{ margin: '5px auto' }} />
          </Box>
        )}
        {/* ListItems */}
        <Box sx={{ overflowY: 'auto', height: '66vh' }}>
          {!isLoading &&
            filterClientsBySelectedStep(filteredClietsList, convertStringCase(selectedStep))
              .length === 0 && (
              <Typography sx={{ textAlign: 'center', fontWeight: '500', mt: 1 }}>
                No Clients
              </Typography>
            )}
          {filteredClietsList &&
            filterClientsBySelectedStep(filteredClietsList, convertStringCase(selectedStep)).map(
              (client, idx) => (
                <SearchListItems
                  selectedListItem={selectedListItem}
                  client={client}
                  key={client._id}
                  idx={idx}
                  onSelecetedListItemChange={onSelecetedListItemChange}
                />
              )
            )}
        </Box>
      </Box>
    </Card>
  );
};

export default QuickSearch;
