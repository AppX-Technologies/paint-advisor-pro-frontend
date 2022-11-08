import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import AddNewClientForm from './AddNewClientForm';
import ClientInfo from './ClientInfo';
import Filter from './Filter';
import PrimaryHeader from './PrimaryHeader';
import QuickSearch from './QuickSearch';
import Steps from './Steps';

const Pipeline = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedListItem, setSelectedListItem] = useState(0);
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    console.log(itemValue);
    setSelectedListItem(itemValue);
  };

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        style={{
          position: 'absolute',
          right: 20,
          bottom: 10
        }}
        onClick={() => setOpen(true)}>
        <GroupAddIcon sx={{ mr: 1 }} /> Add new client
      </Button>

      <AddNewClientForm open={open} setOpen={setOpen} />
      <PrimaryHeader showFilter={showFilter} onFilterChange={setShowFilter} />
      <Divider light sx={{ margin: '10px 0 10px 5px', width: '103%' }} />
      <Box>
        <Grid container>
          <Grid xs={2}>
            <QuickSearch
              selectedListItem={selectedListItem}
              onSelecetedListItemChange={onSelecetedListItemChange}
            />
          </Grid>
          <Grid xs={10}>
            <Steps selectedStep={selectedStep} onSelctedStepChange={setSelectedStep} />
            <ClientInfo />
          </Grid>
        </Grid>
      </Box>
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
    </>
  );
};

export default Pipeline;
