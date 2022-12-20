import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { cloneDeep, startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MaterialsPickerCard from '../../../common/MaterialsPickerCard';
import { NONPAINTABLEAREAFIELD, ROLE_PAINTER } from '../../../helpers/contants';
import { authSelector } from '../../auth/authSlice';
import { fetchMaterial } from '../../materials/materialSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import {
  findSpecificMaterial,
  findWheatherTheSectionIsCompletelyFilledOrNot,
  groupedPaintableMaterials,
  individualItem,
  roomInfo,
  sectionInfo,
  setMaterialsAccordingToSection
} from '../helpers/generalHepers';
import { fetchProductionRate } from '../../productionRate/productionRateSlice';
import { isCompanyAdmin, isSystemUser } from '../../../helpers/roles';
import { fetchUserMadeByCompany } from '../../usersFromCompany/usersFromCompanySlice';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.description
});

const Picker = ({ currentClientInfo, setCurrentClientInfo, pickerTitle, pickerList }) => {
  const [roomRelatedInfo, setRoomRelatedInfo] = useState(null);
  const [currentlyActiveRoomInfo, setCurrentlyActiveRoomInfo] = useState({});

  const [expandArea, setExpandArea] = useState({
    walls: true,
    doors: true,
    windows: true,
    ceilings: true,
    crownMoldings: true,
    closets: true,
    doorJambs: true
  });

  const [currentlyChoosenMaterial, setCurrentyChoosenMaterial] = useState({
    walls: '',
    doors: '',
    windows: '',
    ceilings: '',
    crownMoldings: '',
    closets: '',
    doorJambs: ''
  });

  const [currentlyChoosenMaterialDescription, setCurrentyChoosenMaterialDescription] = useState({
    walls: '',
    doors: '',
    windows: '',
    ceilings: '',
    crownMoldings: '',
    closets: '',
    doorJambs: ''
  });

  const [completelyFilledSection, setCompletelyFilledSection] = useState({
    walls: false,
    doors: false,
    windows: false,
    ceilings: false,
    crownMoldings: false,
    closets: false,
    doorJambs: false
  });

  const [completelyFilledRooms, setCompletelyFilledRooms] = useState({});
  const [materialListSectionwise, setMaterialListSectionwise] = useState(null);
  const [showTheSection, setShowTheSection] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { companyId } = useParams();
  const { org } = useSelector((state) => state.org);
  const [orgId] = useState(isSystemUser(user) ? companyId : user.organization._id);

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
    const currentClientInfoCopy = cloneDeep(currentClientInfo);
    const itemToWhichMaterialIsToBeAssigned = individualItem(
      currentClientInfoCopy,
      room,
      section,
      title
    );
    itemToWhichMaterialIsToBeAssigned.materials = findSpecificMaterial(
      pickerList && pickerList[0] && pickerList[0]?.materials,
      currentlyChoosenMaterial[section]
    );
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  // Deletion Of Material For Individual Item

  const handleMaterialDeletionForIndividualItem = (room, section, title) => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    const itemToWhichMaterialIsToBeAssigned = individualItem(
      currentClientInfoCopy,
      room,
      section,
      title
    );
    itemToWhichMaterialIsToBeAssigned.materials = {};
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  // Material Assignment To Whole Section

  const handleMaterialAssignmentForWholeSection = (section) => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: 'Please Select A Material',
          severity: 'info'
        })
      );
    }

    const itemToWhichMaterialIsToBeAssigned = sectionInfo(currentClientInfoCopy, section);
    itemToWhichMaterialIsToBeAssigned.forEach((materialAssignment) => {
      materialAssignment.forEach((materialToBeAssigned) => {
        materialToBeAssigned.materials = findSpecificMaterial(
          pickerList && pickerList[0] && pickerList[0]?.materials,
          currentlyChoosenMaterial[section]
        );
      });
    });

    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  // Material Deletion For Whole Section

  const handleMaterialDeletionForWholeSection = (section) => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    const itemToWhichMaterialIsToBeAssigned = sectionInfo(currentClientInfoCopy, section);
    itemToWhichMaterialIsToBeAssigned.forEach((materialAssignment) => {
      materialAssignment.forEach((materialToBeAssigned) => {
        materialToBeAssigned.materials = {};
      });
    });

    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  // Material Assignment To A Whole Room

  const handleMaterialAssignmentForWholeRoom = (room, section) => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: 'Please Select A Material',
          severity: 'info'
        })
      );
    }
    const itemToWhichMaterialIsToBeAssigned = roomInfo(currentClientInfoCopy, room, section);

    itemToWhichMaterialIsToBeAssigned.forEach((individualValue) => {
      individualValue.materials = findSpecificMaterial(
        pickerList && pickerList[0] && pickerList[0]?.materials,
        currentlyChoosenMaterial[section]
      );
    });
    // completelyFilledRooms[room] = !completelyFilledRooms[room];
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  useEffect(() => {
    setRoomRelatedInfo(cloneDeep([...groupedPaintableMaterials(currentClientInfo?.bid?.rooms)]));
  }, [currentClientInfo?.bid?.rooms]);

  useEffect(() => {
    currentClientInfo?.bid?.rooms.forEach((room) => {
      completelyFilledRooms[room.roomName] = false;
    });
    setCompletelyFilledRooms({ ...completelyFilledRooms });
  }, [currentClientInfo?.bid?.rooms]);

  // Fetch Material According To Organization

  useEffect(() => {
    dispatch(
      fetchMaterial({
        token: user.token,
        id: companyId ? org.materials : undefined
      })
    );
  }, []);

  useEffect(() => {
    if (isSystemUser(user) || isCompanyAdmin(user)) {
      dispatch(
        fetchUserMadeByCompany({
          token: user.token,
          orgId,
          filterValue: { role: ROLE_PAINTER }
        })
      );
    }
  }, []);

  useEffect(() => {
    setMaterialListSectionwise(setMaterialsAccordingToSection(pickerList));
  }, [pickerList]);

  console.log(materialListSectionwise, 'materialListSectionwise');

  const findMaterialListSectionWise = (value) => {
    return materialListSectionwise?.find((material) => material?.name === value);
  };

  useEffect(() => {
    if (!currentlyActiveRoomInfo.roomName) {
      const itemToWhichMaterialIsToBeAssigned = sectionInfo(
        currentClientInfo,
        currentlyActiveRoomInfo.section
      );

      if (
        itemToWhichMaterialIsToBeAssigned?.every((roomDetails) =>
          roomDetails?.every((room) => room.materials !== '')
        )
      ) {
        completelyFilledSection[currentlyActiveRoomInfo.section] = true;
      } else {
        completelyFilledSection[currentlyActiveRoomInfo.section] = false;
      }

      setCompletelyFilledSection({ ...completelyFilledSection });
    }
  }, [currentClientInfo]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Typography sx={{ my: 2, fontSize: '17px' }}>{pickerTitle}</Typography>
        {showTheSection ? (
          <Tooltip title='Show Less' placement='top'>
            <ExpandLessIcon
              onClick={() => setShowTheSection(false)}
              sx={{ cursor: 'pointer', fontSize: '30px' }}
            />
          </Tooltip>
        ) : (
          <Tooltip title='Show More' placement='top'>
            <ExpandMoreIcon
              onClick={() => setShowTheSection(true)}
              sx={{ cursor: 'pointer', fontSize: '30px' }}
            />
          </Tooltip>
        )}
      </Box>
      {showTheSection && (
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
                      dropdownValue.mainItems.every(
                        (mainItem) => mainItem?.values?.length === 0
                      ) && (
                        <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
                          No Info To Show
                        </Typography>
                      )}
                    {/* Materials Picker */}
                    {expandArea[dropdownValue.name] === true &&
                      !dropdownValue.mainItems.every(
                        (mainItem) => mainItem?.values?.length === 0
                      ) && (
                        <Grid container gap={0.5}>
                          <Grid md={2} xs={10} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                            {/* DropDown */}
                            <Box
                              sx={{
                                height: '100%'
                              }}>
                              <Typography sx={{ fontSize: '14px' }}>
                                Materials For {startCase(dropdownValue.name)}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                <Autocomplete
                                  filterOptions={filterOptions}
                                  value={currentlyChoosenMaterialDescription[dropdownValue?.name]}
                                  size='small'
                                  onChange={(event, newInput) => {
                                    currentlyChoosenMaterial[dropdownValue?.name] = newInput?._id;
                                    setCurrentyChoosenMaterial({ ...currentlyChoosenMaterial });
                                    currentlyChoosenMaterialDescription[dropdownValue?.name] =
                                      newInput?.description;
                                    setCurrentyChoosenMaterialDescription({
                                      ...currentlyChoosenMaterialDescription
                                    });
                                  }}
                                  disablePortal
                                  id='combo-box-demo'
                                  options={
                                    findMaterialListSectionWise(dropdownValue?.name) &&
                                    findMaterialListSectionWise(dropdownValue?.name)?.values
                                      ? findMaterialListSectionWise(
                                          dropdownValue?.name
                                        )?.values?.map((item) => {
                                          return item;
                                        })
                                      : []
                                  }
                                  getOptionLabel={(option) => option}
                                  renderOption={(props, option) => (
                                    <Box
                                      {...props}
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}>
                                      <Box>
                                        <Typography>{option?.description}</Typography>
                                      </Box>
                                      <Box ml={2}>
                                        <Typography sx={{ fontSize: '13px', mt: 0.5 }}>
                                          ({option?.unitPrice}/{option?.unit})
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )}
                                  sx={{ mt: 1, width: '100%', mb: 1 }}
                                  renderInput={(params) => (
                                    <TextField {...params} label='Materials' />
                                  )}
                                />
                                {/* Select For All */}
                                <Box>
                                  {/* Section Completely Filled */}
                                  {!completelyFilledSection[dropdownValue.name] ||
                                  !findWheatherTheSectionIsCompletelyFilledOrNot(
                                    currentClientInfo?.bid?.rooms,
                                    dropdownValue.name
                                  ) ? (
                                    <>
                                      <Tooltip title={`Apply To All ${dropdownValue.name}`}>
                                        <FormatPaintOutlinedIcon
                                          onClick={() => {
                                            handleMaterialAssignmentForWholeSection(
                                              dropdownValue.name
                                            );
                                            setCurrentlyActiveRoomInfo({
                                              roomName: '',
                                              section: dropdownValue.name
                                            });
                                          }}
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
                                          handleMaterialDeletionForWholeSection(dropdownValue.name)
                                        }
                                      />
                                    </Tooltip>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                          {/* Divider */}
                          <Divider orientation='vertical' flexItem />
                          <Grid xs={10} md={9.5} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                            {dropdownValue.mainItems.map((mainItem, index) => {
                              return (
                                <>
                                  {mainItem?.values && mainItem?.values?.length !== 0 && (
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
                                                onClick={() => {
                                                  handleMaterialAssignmentForWholeRoom(
                                                    mainItem.name,
                                                    dropdownValue.name
                                                  );
                                                  setCurrentlyActiveRoomInfo({
                                                    roomName: mainItem.name,
                                                    section: dropdownValue.name
                                                  });
                                                }}
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
                                                onClick={() => {
                                                  handleMaterialAssignmentForWholeRoom(
                                                    mainItem.name,
                                                    dropdownValue.name
                                                  );
                                                  setCurrentlyActiveRoomInfo({
                                                    roomName: mainItem.name,
                                                    section: dropdownValue.name
                                                  });
                                                }}
                                              />
                                            </Tooltip>
                                          </>
                                        )}
                                      </Box>
                                      <Grid container sx={{ mb: 1 }}>
                                        {mainItem?.values?.length !== 0 &&
                                          mainItem.values.map((value, idx) => {
                                            return (
                                              <Grid md={2.9} xs={10} sx={{ mt: 1, ml: 0.2 }}>
                                                <MaterialsPickerCard
                                                  title={value.name}
                                                  index={idx}
                                                  materials={value?.materials?.description}
                                                  handleMaterialAssignment={
                                                    handleMaterialAssignmentForIndividualItem
                                                  }
                                                  roomName={mainItem.name}
                                                  setCurrentlyActiveRoomInfo={
                                                    setCurrentlyActiveRoomInfo
                                                  }
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

export default Picker;
