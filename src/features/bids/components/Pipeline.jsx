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
  const initialRoomState = {
    roomName: '',
    wall: false,
    baseboardTrim: false,
    ceiling: false,
    window: false,
    windowTrim: false,
    doorjambs: false,
    door: false,
    crownModeling: false,
    closet: false,
    walls: [],
    ceilings: [],
    windows: [],
    doors: []
  };

  const initilWallInfo = {
    _id: '',
    prepHour: '',
    height: '',
    length: '',
    wallType: '',
    coats: '',
    paint: false
  };

  const initialDoorInfo = {
    style: '',
    quantity: '',
    length: '',
    height: '',
    coats: ''
  };

  const initialWindowInfo = {
    _id: '',
    style: '',
    height: '',
    length: '',
    coats: '',
    wall: '',
    paint: false
  };

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

  const [initialEstimateBidInfo, setInitialEstimateBidInfo] = useState(estimationFormInitialInfo);
  const [allRoom, setAllRoom] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [roomStats, setRoomStats] = React.useState(initialRoomState);
  const [selectedValue, setSelectedvalue] = React.useState(initialState);
  const [wallStats, setWallStats] = useState(initilWallInfo);
  const [windowStats, setWindowStats] = useState(initialWindowInfo);
  const [doorsStats, setDoorStats] = useState(initialDoorInfo);

  const handleSearch = (keyword) => {
    setFilteredClietsList(searchedResult(clientList, keyword));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    setSelectedListItem(itemValue);
  };

  const clearWallStats = () => {
    setWallStats(initilWallInfo);
  };

  const onRoomDetailsReset = () => {
    setRoomStats(initialRoomState);
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
        handleClose={handleClose}
        selectedValue={selectedValue}
        setSelectedvalue={setSelectedvalue}
        initialState={initialState}
      />{' '}
      <EstimateForm
        clearWallStats={clearWallStats}
        open={openEstimate}
        setOpen={setOpenEstimate}
        handleClose={handleClose}
        initialBidInfo={initialEstimateBidInfo}
        setInitialBidInfo={setInitialEstimateBidInfo}
        estimationFormInitialInfo={estimationFormInitialInfo}
        allRoom={allRoom}
        setAllRoom={setAllRoom}
        value={value}
        setValue={setValue}
        roomStats={roomStats}
        setRoomStats={setRoomStats}
        initialRoomState={initialRoomState}
        wallStats={wallStats}
        setWallStats={setWallStats}
        windowStats={windowStats}
        setWindowStats={setWindowStats}
        onRoomDetailsReset={onRoomDetailsReset}
        doorsStats={doorsStats}
        setDoorStats={setDoorStats}
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
        </Box>
      </Box>
    </>
  );
};

export default Pipeline;
