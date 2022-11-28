import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, Button, Card, Divider, Grid } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bidStageFilter } from '../../../common/bidStageFilters';
import { booleanOption } from '../../../common/FormTextField';
import { STAGE_1 } from '../../../helpers/contants';
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
  const { clientList, isSuccess } = useSelector((state) => state.bids);
  const [primaryHeaderSearch, setPrimaryHeaderSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEstimate, setOpenEstimate] = useState(false);
  const [selectedStep, setSelectedStep] = useState('new client');
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [filteredClietsList, setFilteredClietsList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFilesToView, setShowFilesToView] = useState(null);

  const [currentClientInfo, setCurrentClientInfo] = useState(
    findCurrentClient(clientList, selectedListItem)
  );
  const [commentList, setCommentList] = useState([]);
  const [initialEstimateBidInfo, setInitialEstimateBidInfo] = useState(estimationFormInitialInfo);
  const [allRoom, setAllRoom] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [roomStats, setRoomStats] = React.useState(initialRoomState);
  // ! TODO rename
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
  const [selectOption, setSelectOption] = useState('10');
  const [sortOption, setSortOption] = useState('createdAt');
  const [comment, setComment] = useState('');

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
        { name: 'style', label: 'Style' },
        { name: 'height', label: 'Height' },
        { name: 'length', label: 'Length' },
        { name: 'coats', label: 'Coats' },
        { name: 'quantity', label: 'Quantity' },
        { name: 'wallInfo', label: 'Wall Info' }
      ]
    },
    {
      label: 'Ceiling',
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
      name: 'doorjambs',
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
  const handleClose = () => {
    setOpen(false);
    setCurrentClientInfoToEdit(null);
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
    if (!selectedListItem) {
      setSelectedListItem(
        filterClientsBySelectedStep(filteredClietsList, convertStringCase(selectedStep))[0]?._id
      );
    }
  }, [clientList, filteredClietsList, selectedStep]);

  const onClientFormChange = (formValue) => {
    setOpen(formValue);
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
        bidFilterValues
      })
    );
    setSelectedListItem(null);
    setPrimaryHeaderSearch('');
  };

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
          onClick={() => {
            setOpen(true);
            setSelectedvalue(cloneDeep(initialState));
          }}>
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
        currentClientInfoToEdit={currentClientInfoToEdit}
        setCurrentClientInfoToEdit={setCurrentClientInfoToEdit}
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
        openFileDeleteModel={openFileDeleteModel}
        setOpenFileDeleteModel={setOpenFileDeleteModel}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
        <PrimaryHeader
          showFilter={showFilter}
          onFilterChange={setShowFilter}
          primaryHeaderSearch={primaryHeaderSearch}
          setPrimaryHeaderSearch={setPrimaryHeaderSearch}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
          bidFilterValues={bidFilterValues}
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
                setFilteredClietsList={setFilteredClietsList}
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
                  currentClientInfoToEdit={currentClientInfoToEdit}
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
                      selectedListItem={selectedListItem}
                      onCommentListChange={setCommentList}
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
