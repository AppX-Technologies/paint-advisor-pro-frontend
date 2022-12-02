import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialsPickerCard from '../../../common/MaterialsPickerCard';
import { NONPAINTABLEAREAFIELD, TEST_MATERIALS_VALUES_TO_SELECT } from '../../../helpers/contants';
import { showMessage } from '../../snackbar/snackbarSlice';
import {
  groupedPaintableMaterials,
  individualItem,
  roomInfo,
  sectionInfo
} from '../helpers/generalHepers';

const MaterialsPicker = ({ allRooms }) => {
  const [roomRelatedInfo, setRoomRelatedInfo] = useState(null);
  const [expandArea, setExpandArea] = useState({
    walls: true,
    doors: true,
    windows: true,
    ceilings: true,
    crownMoldings: true,
    closets: true,
    doorjambs: true
  });

  const [currentlyChoosenMaterial, setCurrentyChoosenMaterial] = useState({
    walls: '',
    doors: '',
    windows: '',
    ceilings: '',
    crownMoldings: '',
    closets: '',
    doorjambs: ''
  });

  const [completelyFilledSection, setCompletelyFilledSection] = useState({
    walls: false,
    doors: false,
    windows: false,
    ceilings: false,
    crownMoldings: false,
    closets: false,
    doorjambs: false
  });

  const [completelyFilledRooms, setCompletelyFilledRooms] = useState({});

  const [showMaterialToPaint, setShowMaterialToPaint] = useState(true);
  const dispatch = useDispatch();

  // Material Assignment To Individual Item

  const handleMaterialAssignmentForIndividualItem = (room, section, title) => {
    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: 'Please Select A Material',
          severity: 'info'
        })
      );
    }
    const itemToWhichMaterialIsToBeAssigned = individualItem(roomRelatedInfo, room, section, title);
    itemToWhichMaterialIsToBeAssigned.assigned = currentlyChoosenMaterial[section];
    setRoomRelatedInfo([...roomRelatedInfo]);
  };

  // Deletion Of Material For Individual Item

  const handleMaterialDeletionForIndividualItem = (room, section, title) => {
    const itemToWhichMaterialIsToBeAssigned = individualItem(roomRelatedInfo, room, section, title);
    itemToWhichMaterialIsToBeAssigned.assigned = '';
    setRoomRelatedInfo([...roomRelatedInfo]);
  };

  // Material Assignment To Whole Section

  const handleMaterialAssignmentForWholeSection = (section) => {
    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: 'Please Select A Material',
          severity: 'info'
        })
      );
    }
    const itemToWhichMaterialIsToBeAssigned = sectionInfo(roomRelatedInfo, section);
    itemToWhichMaterialIsToBeAssigned.mainItems.forEach((mainItem) => {
      mainItem.values.forEach((individualValue) => {
        individualValue.assigned = completelyFilledSection[section]
          ? ''
          : currentlyChoosenMaterial[section];
      });
    });
    setRoomRelatedInfo([...roomRelatedInfo]);
    completelyFilledSection[section] = !completelyFilledSection[section];
    setCompletelyFilledSection({ ...completelyFilledSection });
  };

  // Material Assignment To A Whole Room

  const handleMaterialAssignmentForWholeRoom = (room, section) => {
    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: 'Please Select A Material',
          severity: 'info'
        })
      );
    }
    const itemToWhichMaterialIsToBeAssigned = roomInfo(roomRelatedInfo, room, section);

    itemToWhichMaterialIsToBeAssigned.values.forEach((individualValue) => {
      individualValue.assigned = completelyFilledRooms[room]
        ? ''
        : currentlyChoosenMaterial[section];
    });
    completelyFilledRooms[room] = !completelyFilledRooms[room];
    setRoomRelatedInfo([...roomRelatedInfo]);
  };

  useEffect(() => {
    setRoomRelatedInfo([...groupedPaintableMaterials(allRooms)]);
  }, [allRooms]);

  useEffect(() => {
    allRooms.forEach((room) => {
      completelyFilledRooms[room] = false;
    });
    setCompletelyFilledRooms({ ...completelyFilledRooms });
  }, [allRooms]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Typography sx={{ my: 2, fontSize: '17px' }}>Materials</Typography>
        {showMaterialToPaint ? (
          <Tooltip title='Show Less' placement='top'>
            <ExpandLessIcon
              onClick={() => setShowMaterialToPaint(false)}
              sx={{ cursor: 'pointer', fontSize: '30px' }}
            />
          </Tooltip>
        ) : (
          <Tooltip title='Show More' placement='top'>
            <ExpandMoreIcon
              onClick={() => setShowMaterialToPaint(true)}
              sx={{ cursor: 'pointer', fontSize: '30px' }}
            />
          </Tooltip>
        )}
      </Box>
      {showMaterialToPaint && (
        <>
          {roomRelatedInfo &&
            roomRelatedInfo
              .filter(
                (item) =>
                  item.name !== NONPAINTABLEAREAFIELD &&
                  item.name !== 'baseboardTrims' &&
                  item.name !== 'windowTrims'
              )
              .map((dropdownValue) => {
                return (
                  <Stack
                    sx={{
                      border: '1px solid lightgray',
                      px: 1,
                      borderRadius: '5px',
                      my: 1
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}>
                      <Typography sx={{ fontWeight: '400', m: 1 }}>
                        {startCase(dropdownValue.name)}
                      </Typography>

                      {expandArea[dropdownValue.name] ? (
                        <Tooltip title={`Expand Less ${dropdownValue.name}`} placement='top'>
                          <ExpandLessIcon
                            onClick={() => {
                              expandArea[dropdownValue.name] = false;
                              setExpandArea({ ...expandArea });
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title={`Expand More ${dropdownValue.name}`} placement='top'>
                          <ExpandMoreIcon
                            onClick={() => {
                              expandArea[dropdownValue.name] = true;
                              setExpandArea({ ...expandArea });
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                    {expandArea[dropdownValue.name] === true &&
                      dropdownValue.mainItems.every((mainItem) => mainItem.values.length === 0) && (
                        <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
                          No Info To Show
                        </Typography>
                      )}
                    {/* Materials Picker */}
                    {expandArea[dropdownValue.name] === true &&
                      !dropdownValue.mainItems.every(
                        (mainItem) => mainItem.values.length === 0
                      ) && (
                        <Grid container gap={0.5}>
                          <Grid md={2} xs={10} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                            {/* DropDown */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%'
                              }}>
                              <FormControl fullWidth size='small' sx={{ windth: '90%' }}>
                                <InputLabel id='demo-simple-select-label' sx={{ fontSize: '14px' }}>
                                  Materials For {startCase(dropdownValue.name)}
                                </InputLabel>
                                <Select
                                  value={currentlyChoosenMaterial[dropdownValue.name]}
                                  onChange={(e) => {
                                    currentlyChoosenMaterial[dropdownValue.name] = e.target.value;
                                    setCurrentyChoosenMaterial({ ...currentlyChoosenMaterial });
                                  }}
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  label={
                                    <Typography
                                      sx={{
                                        fontSize: '10px'
                                      }}>{`Materials For ${startCase(
                                      dropdownValue.name
                                    )}`}</Typography>
                                  }>
                                  {TEST_MATERIALS_VALUES_TO_SELECT.find(
                                    (material) => material.name === dropdownValue.name
                                  ).values.map((MatValue) => {
                                    return <MenuItem value={MatValue}>{MatValue}</MenuItem>;
                                  })}
                                </Select>
                              </FormControl>
                              {/* Select For All */}
                              <Box>
                                {/* Section Completely Filled */}
                                {!completelyFilledSection[dropdownValue.name] ? (
                                  <>
                                    <Tooltip title={`Apply To All ${dropdownValue.name}`}>
                                      <FormatPaintOutlinedIcon
                                        onClick={() =>
                                          handleMaterialAssignmentForWholeSection(
                                            dropdownValue.name
                                          )
                                        }
                                        sx={{
                                          mt: 1,
                                          ml: 1,
                                          cursor: 'pointer',
                                          color: completelyFilledSection[dropdownValue.name]
                                            ? 'green'
                                            : 'gray'
                                        }}
                                      />
                                    </Tooltip>
                                  </>
                                ) : (
                                  <Tooltip title={`Remove From All ${dropdownValue.name}`}>
                                    <HighlightOffIcon
                                      sx={{
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        mt: 1,
                                        ml: 1,
                                        color: (theme) => theme.deleteicon.color.main
                                      }}
                                      onClick={() =>
                                        handleMaterialAssignmentForWholeSection(dropdownValue.name)
                                      }
                                    />
                                  </Tooltip>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                          {/* Divider */}
                          <Divider orientation='vertical' flexItem />
                          <Grid xs={10} md={9.5} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                            {dropdownValue.mainItems.map((mainItem, index) => {
                              return (
                                <>
                                  {mainItem.values.length !== 0 && (
                                    <>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center'
                                        }}>
                                        <Typography sx={{ fontSize: '13px' }}>
                                          {mainItem.name}
                                        </Typography>

                                        {!completelyFilledRooms[mainItem.name] ? (
                                          <>
                                            <Tooltip
                                              placement='top'
                                              title={`Apply Material To All ${dropdownValue.name} Of ${mainItem.name} Room`}>
                                              <FormatPaintOutlinedIcon
                                                onClick={() =>
                                                  handleMaterialAssignmentForWholeRoom(
                                                    mainItem.name,
                                                    dropdownValue.name
                                                  )
                                                }
                                                sx={{
                                                  fontSize: '14px',
                                                  ml: 1,
                                                  cursor: 'pointer',
                                                  color: 'gray'
                                                }}
                                              />
                                            </Tooltip>
                                          </>
                                        ) : (
                                          <>
                                            <Tooltip
                                              title={`Remove From All ${mainItem.name} Room`}
                                              placement='top'>
                                              <HighlightOffIcon
                                                sx={{
                                                  fontSize: '14px',
                                                  cursor: 'pointer',
                                                  ml: 1,
                                                  color: (theme) => theme.deleteicon.color.main
                                                }}
                                                onClick={() =>
                                                  handleMaterialAssignmentForWholeRoom(
                                                    mainItem.name,
                                                    dropdownValue.name
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                          </>
                                        )}
                                      </Box>
                                      <Grid container sx={{ mb: 1 }}>
                                        {mainItem.values.length !== 0 &&
                                          mainItem.values.map((value, idx) => {
                                            return (
                                              <Grid md={2.9} xs={10} sx={{ mt: 1, ml: 0.2 }}>
                                                <MaterialsPickerCard
                                                  title={value.name}
                                                  index={idx}
                                                  assigned={value.assigned}
                                                  handleMaterialAssignment={
                                                    handleMaterialAssignmentForIndividualItem
                                                  }
                                                  roomName={mainItem.name}
                                                  section={dropdownValue.name}
                                                  handleMaterialDeletion={
                                                    handleMaterialDeletionForIndividualItem
                                                  }
                                                />
                                              </Grid>
                                            );
                                          })}
                                      </Grid>
                                      {index !== dropdownValue.mainItems.length - 1 && (
                                        <Divider light sx={{ my: 1 }} />
                                      )}
                                    </>
                                  )}
                                </>
                              );
                            })}
                          </Grid>
                        </Grid>
                      )}
                  </Stack>
                );
              })}
        </>
      )}
    </>
  );
};

export default MaterialsPicker;
