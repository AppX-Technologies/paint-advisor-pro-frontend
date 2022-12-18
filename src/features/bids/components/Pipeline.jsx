import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Card, Divider, Grid } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bidStageFilter } from '../../../common/bidStageFilters';
import { booleanOption } from '../../../common/FormTextField';
import { STATUS_NEW_CLIENT } from '../../../helpers/contants';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { authSelector } from '../../auth/authSlice';
import { fetchAllClients } from '../bidsSlice';
import {
  estimationFormInitialInfo,
  initialBaseBoardTrimInfo,
  initialCeilingInfo,
  initialClosetInfo,
  initialCrownMoldingInfo,
  initialDoorInfo,
  initialDoorjambsInfo,
  initialNonPaintableStats,
  initialRoomState,
  initialState,
  initialWindowInfo,
  initialWindowTrimInfo,
  initilWallInfo
} from '../common/roomsInitialStats';
import {
  filterClientsBySelectedStep,
  findCurrentClient,
  searchedResult
} from '../helpers/generalHepers';
import AddNewClientForm from './AddNewClientForm';
import ClientInfo from './ClientInfo';
import Comment from './Comment';
import EstimateForm from './EstimateForm';
import Filter from './Filter';
import PrimaryHeader from './PrimaryHeader';
import QuickSearch from './QuickSearch';
import Steps from './Steps';
import UploadFiles from './UploadFiles';
import ViewFiles from './ViewFiles';

const Pipeline = () => {
  const { clientList } = useSelector((state) => state.bids);
  const [primaryHeaderSearch, setPrimaryHeaderSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openNewClientForm, setOpenNewClientForm] = useState(false);
  const [openEstimate, setOpenEstimate] = useState(false);
  const [selectedStep, setSelectedStep] = useState(STATUS_NEW_CLIENT);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [filteredClietsList, setFilteredClietsList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFilesToView, setShowFilesToView] = useState(null);
  const [currentClientInfo, setCurrentClientInfo] = useState(
    findCurrentClient(clientList, selectedListItem)
  );
  const [initialEstimateBidInfo, setInitialEstimateBidInfo] = useState(estimationFormInitialInfo);
  const [allRoom, setAllRoom] = React.useState([]);
  const [roomFormValue, setRoomFormValue] = React.useState(initialRoomState);
  const { user } = useSelector(authSelector);
  const [selectedValue, setSelectedvalue] = React.useState(initialState);
  const [wallStats, setWallStats] = useState(initilWallInfo);
  const [windowStats, setWindowStats] = useState(initialWindowInfo);
  const [doorsStats, setDoorStats] = useState(initialDoorInfo);
  const [nonPaintableAreaStats, setNonPaintableAreaStats] = useState(initialNonPaintableStats);
  const [ceilingStats, setCeilingStats] = useState(initialCeilingInfo);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [baseboardTrimStats, setBaseboardTrimStats] = useState(initialBaseBoardTrimInfo);
  const [windowTrimStats, setWindowTrimStats] = useState(initialWindowTrimInfo);
  const [doorJambsStats, setDoorJambsStats] = useState(initialDoorjambsInfo);
  const [crownMoldingStats, setCrownMoldingStats] = useState(initialCrownMoldingInfo);
  const [closetStats, setClosetStats] = useState(initialClosetInfo);
  const [currentClientInfoToEdit, setCurrentClientInfoToEdit] = useState(null);
  const [openFileDeleteModel, setOpenFileDeleteModel] = useState(false);
  const [scheduleTheJob, setScheduleTheJob] = useState(false);
  const [schedueJobDate, setScheduleJobDate] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [bidFilterValues, setBidFilterValues] = useState(cloneDeep(bidStageFilter));
  const [isAscending, setIsAscending] = useState(true);
  const [selectOption, setSelectOption] = useState('All');
  const [sortOption, setSortOption] = useState('createdAt');
  const [comment, setComment] = useState('');

  const { org } = useSelector((state) => state.org);

  const allSectionsInfoOfARoom = [
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
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'height', label: 'Height' },
        { name: 'length', label: 'Length' },
        { name: 'wallType', label: 'Wall Type' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Windows ',
      name: 'windows',
      option: booleanOption,
      currentStats: windowStats,
      onCurrentStatsChange: setWindowStats,
      initialStats: initialWindowInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'style', label: 'Style' },
        { name: 'height', label: 'Height' },
        { name: 'length', label: 'Length' },
        { name: 'coats', label: 'Coats' },
        { name: 'wallInfo', label: 'Wall Info' }
      ]
    },
    {
      label: 'Doors',
      name: 'doors',
      option: booleanOption,
      currentStats: doorsStats,
      onCurrentStatsChange: setDoorStats,
      initialStats: initialDoorInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'style', label: 'Style' },
        { name: 'height', label: 'Height' },
        { name: 'length', label: 'Length' },
        { name: 'coats', label: 'Coats' },
        { name: 'quantity', label: 'Quantity' },
        { name: 'wallInfo', label: 'Wall Info' }
      ]
    },
    {
      label: 'Ceilings',
      name: 'ceilings',
      option: booleanOption,
      currentStats: ceilingStats,
      onCurrentStatsChange: setCeilingStats,
      initialStats: initialCeilingInfo,
      fields: [
        { name: 'type', label: 'Type' },
        { name: 'width', label: 'Width' },
        { name: 'length', label: 'Length' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Baseboard Trim',
      name: 'baseboardTrims',
      option: booleanOption,
      currentStats: baseboardTrimStats,
      onCurrentStatsChange: setBaseboardTrimStats,
      initialStats: initialBaseBoardTrimInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'linearFeet', label: 'Linear Feet' },
        { name: 'length', label: 'Length' },
        { name: 'height', label: 'Height' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Window Trim',
      name: 'windowTrims',
      option: booleanOption,
      currentStats: windowTrimStats,
      onCurrentStatsChange: setWindowTrimStats,
      initialStats: initialWindowTrimInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'quantity', label: 'Quantity' },
        { name: 'length', label: 'Length' },
        { name: 'height', label: 'Height' },
        { name: 'coats', label: 'Coats' },
        { name: 'style', label: 'Style' }
      ]
    },
    {
      label: 'Door Jambs',
      name: 'doorJambs',
      option: booleanOption,
      currentStats: doorJambsStats,
      onCurrentStatsChange: setDoorJambsStats,
      initialStats: initialDoorjambsInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'linearFeet', label: 'Linear Feet' },
        { name: 'width', label: 'Width' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Crown Molding',
      name: 'crownMoldings',
      option: booleanOption,
      currentStats: crownMoldingStats,
      onCurrentStatsChange: setCrownMoldingStats,
      initialStats: initialCrownMoldingInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'linearFeet', label: 'Linear Feet' },
        { name: 'width', label: 'Width' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Closet',
      name: 'closets',
      option: booleanOption,
      currentStats: closetStats,
      onCurrentStatsChange: setClosetStats,
      initialStats: initialClosetInfo,
      fields: [
        { name: 'prepHour', label: 'Prep Hour' },
        { name: 'length', label: 'Length' },
        { name: 'width', label: 'Width' },
        { name: 'avgerageHeight', label: 'AverageHeight' },
        { name: 'coats', label: 'Coats' }
      ]
    },
    {
      label: 'Non-Paintable Area',
      name: 'nonPaintableAreas',
      option: booleanOption,
      currentStats: nonPaintableAreaStats,
      onCurrentStatsChange: setNonPaintableAreaStats,
      initialStats: initialNonPaintableStats,
      fields: [
        { name: 'description', label: 'Description' },
        { name: 'area', label: 'Area' }
      ]
    }
  ];

  const handleSearch = (keyword) => {
    setFilteredClietsList(searchedResult(clientList, keyword));
  };
  const handleNewClientFormClose = () => {
    setOpenNewClientForm(false);
    setCurrentClientInfoToEdit(null);
  };
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };

  const onSelecetedListItemChange = (itemValue) => {
    setSelectedListItem(itemValue);
  };

  const onRoomDetailsReset = () => {
    setRoomFormValue(initialRoomState);
  };

  const onClientFormChange = (formValue) => {
    setOpenNewClientForm(formValue);
  };
  const dispatch = useDispatch();

  const handlePrimaryFilter = () => {
    setSelectedListItem(null);
    dispatch(
      fetchAllClients({
        query: primaryHeaderSearch,
        limit: selectOption,
        sort: sortOption,
        isAscending: isAscending ? 1 : -1,
        token: user.token,
        bidFilterValues,
        organization: org._id
      })
    );
    setSelectedListItem(null);
  };

  useEffect(() => {
    setSelectedListItem(
      filterClientsBySelectedStep(filteredClietsList, convertStringCase(selectedStep))[0]?._id
    );
  }, [selectedStep, filteredClietsList]);

  console.log(currentClientInfo, 'currentClientInfo');

  return (
    <>
      {selectedStep === STATUS_NEW_CLIENT && (
        <Button
          variant='contained'
          color='primary'
          style={{
            position: 'absolute',
            right: 20,
            bottom: 10,
            height: '25px'
          }}
          onClick={() => {
            setOpenNewClientForm(true);
            setSelectedvalue(cloneDeep(initialState));
          }}>
          <GroupAddIcon sx={{ mr: 1 }} /> Add new client
        </Button>
      )}
      <AddNewClientForm
        openNewClientForm={openNewClientForm}
        setOpenNewClientForm={setOpenNewClientForm}
        handleNewClientFormClose={handleNewClientFormClose}
        selectedValue={selectedValue}
        setSelectedvalue={setSelectedvalue}
        initialState={initialState}
        currentClientInfoToEdit={currentClientInfoToEdit}
        setCurrentClientInfoToEdit={setCurrentClientInfoToEdit}
      />{' '}
      <EstimateForm
        open={openEstimate}
        setOpen={setOpenEstimate}
        initialBidInfo={initialEstimateBidInfo}
        setInitialBidInfo={setInitialEstimateBidInfo}
        estimationFormInitialInfo={estimationFormInitialInfo}
        allRoom={allRoom}
        setAllRoom={setAllRoom}
        roomFormValue={roomFormValue}
        setRoomFormValue={setRoomFormValue}
        onRoomDetailsReset={onRoomDetailsReset}
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        allSectionsInfoOfARoom={allSectionsInfoOfARoom}
        currentClientInfo={currentClientInfo}
        setCurrentClientInfo={setCurrentClientInfo}
        selectedStep={selectedStep}
      />
      <Filter
        showFilter={showFilter}
        onFilterOptionsClose={onFilterOptionsClose}
        bidFilterValues={bidFilterValues}
        onBidFilterValueChange={setBidFilterValues}
        handlePrimaryFilter={handlePrimaryFilter}
      />
      <ViewFiles
        showFilesToView={showFilesToView}
        setShowFilesToView={setShowFilesToView}
        currentClientInfo={currentClientInfo}
        setCurrentClientInfo={setCurrentClientInfo}
        fileToDelete={fileToDelete}
        setFileToDelete={setFileToDelete}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
        <PrimaryHeader
          onFilterChange={setShowFilter}
          primaryHeaderSearch={primaryHeaderSearch}
          setPrimaryHeaderSearch={setPrimaryHeaderSearch}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
          handlePrimaryFilter={handlePrimaryFilter}
          selectOption={selectOption}
          setSelectOption={setSelectOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <Divider light sx={{ margin: '10px 0 10px 5px' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid xs={2}>
              <QuickSearch
                selectedListItem={selectedListItem}
                onSelecetedListItemChange={onSelecetedListItemChange}
                filteredClietsList={filteredClietsList}
                handleSearch={handleSearch}
                selectedStep={selectedStep}
                scheduleTheJob={scheduleTheJob}
              />
            </Grid>
            <Grid xs={10} sx={{ height: '74vh', overflowY: 'auto', paddingLeft: 1 }}>
              <Steps selectedStep={selectedStep} onSelectedStepChange={setSelectedStep} />
              <Card sx={{ padding: 1, marginTop: 1 }}>
                <ClientInfo
                  schedueJobDate={schedueJobDate}
                  setScheduleJobDate={setScheduleJobDate}
                  scheduleTheJob={scheduleTheJob}
                  setScheduleTheJob={setScheduleTheJob}
                  setShowFilesToView={setShowFilesToView}
                  onSelectedStepChange={setSelectedStep}
                  selectedValue={selectedValue}
                  selectedStep={selectedStep}
                  open={openEstimate}
                  setOpen={setOpenEstimate}
                  selectedListItem={selectedListItem}
                  currentClientInfo={currentClientInfo}
                  setCurrentClientInfo={setCurrentClientInfo}
                  onClientFormChange={onClientFormChange}
                  setCurrentClientInfoToEdit={setCurrentClientInfoToEdit}
                  openFileDeleteModel={openFileDeleteModel}
                  setOpenFileDeleteModel={setOpenFileDeleteModel}
                  setSelectedListItem={setSelectedListItem}
                  filteredClietsList={filteredClietsList}
                />
                {selectedListItem && currentClientInfo && (
                  <>
                    <UploadFiles
                      uploadedFiles={uploadedFiles}
                      onUploadedFilesChange={setUploadedFiles}
                      currentClientInfo={currentClientInfo}
                      fileToDelete={fileToDelete}
                      setFileToDelete={setFileToDelete}
                      selectedListItem={selectedListItem}
                    />
                    <Comment
                      currentClientInfo={currentClientInfo}
                      comment={comment}
                      onCommentsChange={setComment}
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
