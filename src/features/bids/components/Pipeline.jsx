import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Card, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { booleanOption } from '../../../common/FormTextField';
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

  const initialNonPaintableStats = {
    _id: '',
    description: '',
    area: ''
  };

  const initialRoomState = {
    roomName: '',
    wall: true,
    baseboardTrim: true,
    ceiling: true,
    window: true,
    windowTrim: true,
    doorjambs: true,
    door: true,
    crownModeling: true,
    closet: true,
    walls: [],
    ceilings: [],
    windows: [],
    doors: [],
    nonPaintableAreas: [{ description: 'Current Total', area: 0, isTotal: true }],
    nonPaintableArea: false
  };

  const initilWallInfo = {
    _id: '',
    name: '',
    prepHour: 0,
    height: 0,
    length: 0,
    wallType: '',
    coats: 0
  };

  const initialDoorInfo = {
    _id: '',
    name: '',

    style: '',
    quantity: 0,
    length: 0,
    height: 0,
    coats: 0,
    paint: false
  };

  const initialWindowInfo = {
    _id: '',
    name: '',
    style: '',
    height: 0,
    length: 0,
    coats: 0,
    wallInfo: '',
    paint: false
  };

  const initialCeilingInfo = {
    length: '',
    width: '',
    type: '',
    coats: '',
    product: []
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
  const [nonPaintableAreaStats, setNonPaintableAreaStats] = useState(initialNonPaintableStats);
  const [ceilingStats, setCeilingStats] = useState(initialCeilingInfo);
  const [openEditForm, setOpenEditForm] = useState(false);

  const roomRelatedInfo = [
    {
      label: 'Room Name',
      name: 'roomName',
      dataType: 'text'
    },
    {
      label: 'Walls',
      name: 'walls',
      option: booleanOption,
      currentStats: wallStats,
      onCurrentStatsChange: setWallStats,
      initialStats: initilWallInfo,
      fields: ['prepHour', 'height', 'length', 'wallType', 'coats']
    },
    {
      label: 'Windows ',
      name: 'windows',
      option: booleanOption,
      currentStats: windowStats,
      onCurrentStatsChange: setWindowStats,
      initialStats: initialWindowInfo,
      fields: ['style', 'height', 'length', 'coats', 'wallInfo']
    },
    {
      label: 'Doors',
      name: 'doors',
      option: booleanOption,
      currentStats: doorsStats,
      onCurrentStatsChange: setDoorStats,
      initialStats: initialDoorInfo,
      fields: ['style', 'height', 'length', 'coats', 'quantity']
    },
    {
      label: 'Ceiling',
      name: 'ceilings',
      option: booleanOption,
      currentStats: ceilingStats,
      onCurrentStatsChange: setCeilingStats,
      initialStats: initialCeilingInfo,
      fields: ['type', 'width', 'length', 'coats']
    },
    {
      label: 'Baseboard trim',
      name: 'baseboardTrims',
      option: booleanOption
    },
    {
      label: 'Window trim',
      name: 'windowTrims',
      option: booleanOption
    },
    {
      label: 'Door Jambs',
      name: 'doorjambss',
      option: booleanOption
    },
    {
      label: 'Crown Molding',
      name: 'crownModelings',
      option: booleanOption
    },
    {
      label: 'Closet',
      name: 'closets',
      option: booleanOption
    },
    {
      label: 'Non-Paintable Area',
      name: 'nonPaintableAreas',
      option: booleanOption,
      currentStats: nonPaintableAreaStats,
      onCurrentStatsChange: setNonPaintableAreaStats,
      initialStats: initialNonPaintableStats,
      fields: ['description', 'area']
    }
  ];

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
        nonPaintableAreaStats={nonPaintableAreaStats}
        setNonPaintableAreaStats={setNonPaintableAreaStats}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        roomRelatedInfo={roomRelatedInfo}
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
