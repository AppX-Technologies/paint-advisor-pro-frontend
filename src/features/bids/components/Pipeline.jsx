import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import AddNewClientForm from './AddNewClientForm';
import Comment from './Comment';
import ClientInfo from './ClientInfo';
import Filter from './Filter';
import PrimaryHeader from './PrimaryHeader';
import QuickSearch from './QuickSearch';
import Steps from './Steps';
import UploadFiles from './UploadFiles';
import EstimateForm from './EstimateForm';

const Pipeline = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEstimate, setOpenEstimate] = useState(false);
  const [selectedStep, setSelectedStep] = useState('new client');
  const [initialEstimateBidInfo,setInitialEstimateBidInfo]=useState({
    bidType:'',
    subType:''
  });
  const [selectedListItem, setSelectedListItem] = useState(0);
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };
  const [date, setDate] = React.useState();
  const initialState = {
    customerName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactMethod: '',
    email: '',
    contactNumber: '',
    propertyType: '',
   
  };
    const initialEstimateState = {
      startEndDate: '',
      customerProvidingPaintMaterial: '',
      city: '',
      state: '',
      zipCode: '',
      contactMethod: '',
      email: '',
      contactNumber: '',
      propertyType: ''
    };
  const [selectedValue, setSelectedvalue] = React.useState(initialState);
  const [estimateValue, setEstimateValue] = React.useState(initialEstimateState);

  const handleChange = (newDate) => {
    setDate(newDate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    setSelectedListItem(itemValue);
  };

  return (
    <>
      {selectedStep === 'new client' && (
        <Button
          variant='contained'
          color='primary'
          style={{
            position: 'absolute',
            right: 20,
            bottom: 10,
            height: '25px'
          }}
          onClick={() => setOpen(true)}>
          <GroupAddIcon sx={{ mr: 1 }} /> Add new client
        </Button>
      )}
      <AddNewClientForm
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        handleChange={handleChange}
        handleClose={handleClose}
        selectedValue={selectedValue}
        setSelectedvalue={setSelectedvalue}
      />{' '}
      <EstimateForm
        open={openEstimate}
        setOpen={setOpenEstimate}
        date={date}
        setDate={setDate}
        handleChange={handleChange}
        handleClose={handleClose}
        initialBidInfo={initialEstimateBidInfo}
        setInitialBidInfo={setInitialEstimateBidInfo}
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

          <Grid xs={10} sx={{ height: '74vh', overflowY: 'scroll' }}>
            <Steps selectedStep={selectedStep} onSelectedStepChange={setSelectedStep} />
            <ClientInfo
              onSelectedStepChange={setSelectedStep}
              selectedValue={selectedValue}
              selectedStep={selectedStep}
              open={openEstimate}
              setOpen={setOpenEstimate}
            />

            <UploadFiles />
            <Comment />
          </Grid>
        </Grid>
      </Box>
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
    </>
  );
};

export default Pipeline;
