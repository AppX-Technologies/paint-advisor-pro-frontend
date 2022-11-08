import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import AddNewClientForm from './AddNewClientForm';
import Comment from './Comment';
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
  const [date, setDate] = React.useState();

  const handleChange = (newDate) => {
    setDate(newDate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    console.log(itemValue);
    setSelectedListItem(itemValue);
  };

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        style={{
          position: 'absolute',
          right: 20,
          bottom: 10
        }}
        onClick={() => setOpen(true)}>
        <GroupAddIcon sx={{ mr: 1 }} /> Add new client
      </Button>

      <AddNewClientForm
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        handleChange={handleChange}
        handleClose={handleClose}
      />
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
            <Comment />
          </Grid>
        </Grid>
      </Box>
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
    </>
  );
};

export default Pipeline;
