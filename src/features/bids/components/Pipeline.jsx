import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Card, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STAGE_1 } from '../../../helpers/contants';
import { findCurrentClient, searchedResult } from '../helpers/generalHepers';
import AddNewClientForm from './AddNewClientForm';
import ClientInfo from './ClientInfo';
import Comment from './Comment';
import EstimateForm from './EstimateForm';
import Filter from './Filter';
import PrimaryHeader from './PrimaryHeader';
import QuickSearch from './QuickSearch';
import Steps from './Steps';
import UploadFiles from './UploadFiles';
import CardBox from '../../../common/Card';

const Pipeline = () => {
  const { clientList } = useSelector((state) => state.bids);
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEstimate, setOpenEstimate] = useState(false);
  const [selectedStep, setSelectedStep] = useState('new client');
  const [selectedListItem, setSelectedListItem] = useState('');
  const [filteredClietsList, setFilteredClietsList] = useState([]);
  const [currentClientInfo, setCurrentClientInfo] = useState(
    findCurrentClient(clientList, selectedListItem)
  );
  const [commentList, setCommentList] = useState([]);

  const estimationFormInitialInfo = {
    startDate: '',
    endDate: '',
    bidType: '',
    subType: ''
  };
  const [initialEstimateBidInfo, setInitialEstimateBidInfo] = useState(estimationFormInitialInfo);
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };
  const handleSearch = (keyword) => {
    setFilteredClietsList(searchedResult(clientList, keyword));
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
    propertyType: ''
  };

  const [selectedValue, setSelectedvalue] = React.useState(initialState);
  const handleChange = (newDate) => {
    setDate(newDate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    setSelectedListItem(itemValue);
  };

  useEffect(() => {
    if (clientList.length === 1) {
      setSelectedListItem(clientList[0] ? clientList[0].customerName : '');
    }
  }, [clientList]);

  return (
    <>
      {selectedStep === STAGE_1 && (
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
        initialState={initialState}
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
        estimationFormInitialInfo={estimationFormInitialInfo}
      />
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
        <PrimaryHeader showFilter={showFilter} onFilterChange={setShowFilter} />
        <Divider light sx={{ margin: '10px 0 10px 5px' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid xs={2}>
              <QuickSearch
                selectedListItem={selectedListItem}
                onSelecetedListItemChange={onSelecetedListItemChange}
                filteredClietsList={filteredClietsList}
                setFilteredClietsList={setFilteredClietsList}
                handleSearch={handleSearch}
              />
            </Grid>
            <Grid xs={10} sx={{ height: '74vh', overflowY: 'auto', paddingLeft: 1 }}>
              <Steps selectedStep={selectedStep} onSelectedStepChange={setSelectedStep} />
              <Card sx={{ padding: 1, marginTop: 1 }}>
                <ClientInfo
                  onSelectedStepChange={setSelectedStep}
                  selectedValue={selectedValue}
                  selectedStep={selectedStep}
                  open={openEstimate}
                  setOpen={setOpenEstimate}
                  selectedListItem={selectedListItem}
                  currentClientInfo={currentClientInfo}
                  setCurrentClientInfo={setCurrentClientInfo}
                />
                {selectedListItem && (
                  <>
                    <UploadFiles />
                    <Comment
                      currentClientInfo={currentClientInfo}
                      selectedListItem={selectedListItem}
                      commentList={commentList}
                      onCommentListChange={setCommentList}
                    />
                  </>
                )}
              </Card>
            </Grid>
          </Grid>
          {/* <CardBox /> */}
        </Box>
      </Box>
    </>
  );
};

export default Pipeline;
