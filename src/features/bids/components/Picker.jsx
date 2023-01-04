import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Divider, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { cloneDeep, startCase } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import AutoComplete from '../../../common/AutoComplete';
import MaterialsPickerCard from '../../../common/MaterialsPickerCard';
import { NONPAINTABLEAREAFIELD } from '../../../helpers/contants';
import { showMessage } from '../../snackbar/snackbarSlice';
import {
  checkWheatherEverySectionIsFilled,
  checkWheatherIndividualSectionIsFilled,
  findSpecificMaterial,
  groupedPaintableMaterials,
  individualItem,
  roomInfo,
  sectionInfo
} from '../helpers/generalHepers';

const Picker = ({
  currentClientInfo,
  setCurrentClientInfo,
  pickerTitle,
  secondaryTitle,
  informationToRender,
  filterOption,
  secondaryValuesToRender,
  showPrimaryAutocomplete = false,
  filteredPickerList
}) => {
  const [roomRelatedInfo, setRoomRelatedInfo] = useState(null);

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
  console.log(currentlyChoosenMaterial, 'currentlyChoosenMaterial');

  const [currentlyChoosenMaterialDescription, setCurrentyChoosenMaterialDescription] = useState({
    walls: '',
    doors: '',
    windows: '',
    ceilings: '',
    crownMoldings: '',
    closets: '',
    doorJambs: ''
  });

  const [showTheSection, setShowTheSection] = useState(true);
  const [selectionToEveryComponent, setSelectionToEveryComponent] = useState('');
  const [selectionToEveryComponentDescription, setSelectionToEveryComponentDescription] =
    useState('');

  const dispatch = useDispatch();

  const filterOptions = useMemo(() => {
    return createFilterOptions({
      matchFrom: 'start',
      stringify: (option) => option[filterOption]
    });
  }, [pickerTitle]);

  // Material Assignment To Individual Item

  const handleMaterialAssignmentForIndividualItem = (room, section, title) => {
    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: `Please Select A ${(secondaryTitle || pickerTitle).slice(
            0,
            (secondaryTitle || pickerTitle).length - 1
          )}`,
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

    itemToWhichMaterialIsToBeAssigned[pickerTitle.toLowerCase()] = {
      ...findSpecificMaterial(filteredPickerList, currentlyChoosenMaterial[section]),
      [`${pickerTitle.toLowerCase().slice(0, pickerTitle.length - 1)}Id`]:
        currentlyChoosenMaterial[section]
    };
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
    itemToWhichMaterialIsToBeAssigned[pickerTitle.toLowerCase()] = {};
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  // Material Assignment To Whole Section

  const handleMaterialAssignmentForWholeSection = (section) => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    if (!currentlyChoosenMaterial[section]) {
      return dispatch(
        showMessage({
          message: `Please Select A ${(secondaryTitle || pickerTitle).slice(
            0,
            (secondaryTitle || pickerTitle).length - 1
          )}`,
          severity: 'info'
        })
      );
    }

    const itemToWhichMaterialIsToBeAssigned = sectionInfo(currentClientInfoCopy, section);
    itemToWhichMaterialIsToBeAssigned.forEach((materialAssignment) => {
      materialAssignment.forEach((materialToBeAssigned) => {
        materialToBeAssigned[pickerTitle.toLowerCase()] = {
          ...findSpecificMaterial(filteredPickerList, currentlyChoosenMaterial[section]),
          [`${pickerTitle.toLowerCase().slice(0, pickerTitle.length - 1)}Id`]:
            currentlyChoosenMaterial[section]
        };
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
        materialToBeAssigned[pickerTitle.toLowerCase()] = {};
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
          message: `Please Select A ${(secondaryTitle || pickerTitle).slice(
            0,
            (secondaryTitle || pickerTitle).length - 1
          )}`,
          severity: 'info'
        })
      );
    }
    const itemToWhichMaterialIsToBeAssigned = roomInfo(currentClientInfoCopy, room, section);

    itemToWhichMaterialIsToBeAssigned.forEach((individualValue) => {
      individualValue[pickerTitle.toLowerCase()] = {
        ...findSpecificMaterial(filteredPickerList, currentlyChoosenMaterial[section]),
        [`${pickerTitle.toLowerCase().slice(0, pickerTitle.length - 1)}Id`]:
          currentlyChoosenMaterial[section]
      };
    });
    // completelyFilledRooms[room] = !completelyFilledRooms[room];
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  const findMaterialListSectionWise = (value) => {
    return informationToRender?.find((picker) => picker?.name === value);
  };

  const handlePickerAssignmentToAllSections = () => {
    const currentClientInfoCopy = cloneDeep(currentClientInfo);

    if (
      !selectionToEveryComponent &&
      !checkWheatherEverySectionIsFilled(currentClientInfo?.bid?.rooms, pickerTitle.toLowerCase())
    ) {
      return dispatch(
        showMessage({
          message: `Please Select A ${(secondaryTitle || pickerTitle).slice(
            0,
            (secondaryTitle || pickerTitle).length - 1
          )}`,
          severity: 'info'
        })
      );
    }
    currentClientInfoCopy?.bid?.rooms.forEach((room) => {
      Object.keys(room)
        .filter((sections) => sections !== '__v' && sections !== 'roomName' && sections !== '_id')
        .forEach((sections) => {
          room[sections].forEach((section) => {
            if (
              checkWheatherEverySectionIsFilled(
                currentClientInfo?.bid?.rooms,
                pickerTitle.toLowerCase()
              )
            ) {
              section[pickerTitle.toLowerCase()] = {};
            } else {
              section[pickerTitle.toLowerCase()] = {
                ...findSpecificMaterial(filteredPickerList, selectionToEveryComponent),
                [`${pickerTitle.toLowerCase().slice(0, pickerTitle.length - 1)}Id`]:
                  selectionToEveryComponent
              };
            }
          });
        });
    });
    setCurrentClientInfo({ ...currentClientInfoCopy });
  };

  useEffect(() => {
    setRoomRelatedInfo(cloneDeep([...groupedPaintableMaterials(currentClientInfo?.bid?.rooms)]));
  }, [currentClientInfo?.bid?.rooms]);

  console.log(currentClientInfo?.bid, 'currentClientInfo?.bid');

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ my: 2, fontSize: '17px', mr: 2 }}>
            {secondaryTitle ?? pickerTitle}
          </Typography>
          {showPrimaryAutocomplete && (
            <AutoComplete
              filterOptions={filterOptions}
              value={selectionToEveryComponentDescription}
              onChange={(event, newInput) => {
                setSelectionToEveryComponent(
                  () =>
                    newInput?.[`${pickerTitle.toLowerCase().slice(0, pickerTitle.length - 1)}Id`]
                );
                setSelectionToEveryComponentDescription(() => newInput?.[filterOption]);
              }}
              options={
                informationToRender && informationToRender[0]?.values
                  ? informationToRender[0]?.values?.map((item) => {
                      return item;
                    })
                  : []
              }
              filterOption={filterOption}
              secondaryValuesToRender={secondaryValuesToRender}
              pickerTitle={pickerTitle}
              secondaryTitle={secondaryTitle}
            />
          )}
          {showPrimaryAutocomplete && (
            <>
              {checkWheatherEverySectionIsFilled(
                currentClientInfo?.bid?.rooms,
                pickerTitle.toLowerCase()
              ) ? (
                <Tooltip title='Remove From Every Section' placement='top'>
                  <HighlightOffIcon
                    sx={{
                      ml: 1,
                      cursor: 'pointer',
                      color: (theme) => theme.deleteicon.color.main
                    }}
                    onClick={handlePickerAssignmentToAllSections}
                  />
                </Tooltip>
              ) : (
                <Tooltip title='Apply To Every Sections' placement='top'>
                  <FormatPaintOutlinedIcon
                    sx={{
                      ml: 1,
                      cursor: 'pointer',
                      color: 'gray'
                    }}
                    onClick={handlePickerAssignmentToAllSections}
                  />
                </Tooltip>
              )}
            </>
          )}
        </Box>
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
                                {pickerTitle} For {startCase(dropdownValue.name)}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                <AutoComplete
                                  filterOptions={filterOptions}
                                  value={currentlyChoosenMaterialDescription[dropdownValue?.name]}
                                  onChange={(event, newInput) => {
                                    console.log(newInput, 'newInput');
                                    currentlyChoosenMaterial[dropdownValue?.name] =
                                      newInput?.[
                                        `${
                                          pickerTitle &&
                                          pickerTitle.slice(0, pickerTitle.length - 1).toLowerCase()
                                        }Id`
                                      ];
                                    setCurrentyChoosenMaterial({ ...currentlyChoosenMaterial });
                                    currentlyChoosenMaterialDescription[dropdownValue?.name] =
                                      newInput?.[filterOption];
                                    setCurrentyChoosenMaterialDescription({
                                      ...currentlyChoosenMaterialDescription
                                    });
                                  }}
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
                                  filterOption={filterOption}
                                  secondaryValuesToRender={secondaryValuesToRender}
                                  pickerTitle={pickerTitle}
                                  secondaryTitle={secondaryTitle}
                                />

                                {/* Select For All */}
                                <Box>
                                  {/* Section Completely Filled */}
                                  {!checkWheatherIndividualSectionIsFilled(
                                    currentClientInfo,
                                    dropdownValue.name,
                                    pickerTitle.toLowerCase()
                                  ) ? (
                                    <>
                                      <Tooltip title={`Apply To All ${dropdownValue.name}`}>
                                        <FormatPaintOutlinedIcon
                                          onClick={() => {
                                            handleMaterialAssignmentForWholeSection(
                                              dropdownValue.name
                                            );
                                          }}
                                          sx={{
                                            mt: 1,
                                            ml: 1,
                                            cursor: 'pointer',
                                            color: 'gray'
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

                                        <Tooltip
                                          placement='top'
                                          title={`Apply ${pickerTitle} To All ${dropdownValue.name} Of ${mainItem.name} Room`}>
                                          <FormatPaintOutlinedIcon
                                            onClick={() => {
                                              handleMaterialAssignmentForWholeRoom(
                                                mainItem.name,
                                                dropdownValue.name
                                              );
                                            }}
                                            sx={{
                                              fontSize: '14px',
                                              ml: 1,
                                              cursor: 'pointer',
                                              color: 'gray'
                                            }}
                                          />
                                        </Tooltip>
                                      </Box>
                                      <Grid container sx={{ mb: 1 }}>
                                        {mainItem?.values?.length !== 0 &&
                                          mainItem.values.map((value, idx) => {
                                            return (
                                              <Grid md={2.9} xs={10} sx={{ mt: 1, ml: 0.2 }}>
                                                <MaterialsPickerCard
                                                  title={value.name}
                                                  index={idx}
                                                  materials={
                                                    pickerTitle === 'Paints'
                                                      ? value?.paints?.description
                                                      : value?.labours?.name
                                                  }
                                                  handleMaterialAssignment={
                                                    handleMaterialAssignmentForIndividualItem
                                                  }
                                                  roomName={mainItem.name}
                                                  section={dropdownValue.name}
                                                  handleMaterialDeletion={
                                                    handleMaterialDeletionForIndividualItem
                                                  }
                                                  pickerTitle={pickerTitle}
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
