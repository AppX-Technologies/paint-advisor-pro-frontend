import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import React, { useState } from 'react';
import MaterialsPickerCard from '../../../common/MaterialsPickerCard';
import { ROOM_RELATED_INFO, TEST_MATERIALS_VALUES_TO_SELECT } from '../../../helpers/contants';

const MaterialsPicker = () => {
  const [expandArea, setExpandArea] = useState({
    Walls: true,
    Doors: true,
    Windows: true
  });

  const [showMaterialToPaint, setShowMaterialToPaint] = useState(true);

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
          {ROOM_RELATED_INFO.map((dropdownValue) => {
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
                  <Typography sx={{ fontWeight: '400', m: 1 }}>{dropdownValue.name}</Typography>

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
                {/* Materials Picker */}
                {expandArea[dropdownValue.name] === true && (
                  <Grid container gap={0.5}>
                    <Grid md={2} xs={10} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                      {/* DropDown */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%'
                        }}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-simple-select-label' sx={{ fontSize: '14px' }}>
                            Materials For {dropdownValue.name}
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label={
                              <Typography
                                sx={{
                                  fontSize: '10px'
                                }}>{`Materials For ${dropdownValue.name}`}</Typography>
                            }>
                            {TEST_MATERIALS_VALUES_TO_SELECT.map((MatValue) => {
                              return <MenuItem value={MatValue}>{MatValue}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                        {/* Select For All */}
                        <Tooltip title={`Apply To All ${dropdownValue.name}`}>
                          <FormatPaintOutlinedIcon
                            sx={{ mt: 1, cursor: 'pointer', color: 'gray' }}
                          />
                        </Tooltip>
                      </Box>
                    </Grid>
                    <Grid xs={10} md={9.5} sx={{ mb: 2, mt: 1, margin: '0px auto' }}>
                      {dropdownValue.mainItems.map((mainItem, index) => {
                        return (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                              }}>
                              <Typography sx={{ fontSize: '13px' }}>{mainItem.name}</Typography>

                              <Tooltip
                                placement='top'
                                title={`Apply Material To All ${dropdownValue.name} Of ${mainItem.name}`}>
                                <FormatPaintOutlinedIcon
                                  sx={{ fontSize: '14px', ml: 1, cursor: 'pointer', color: 'gray' }}
                                />
                              </Tooltip>
                            </Box>
                            <Grid container sx={{ mb: 1 }}>
                              {mainItem.values.map((value) => {
                                return (
                                  <Grid md={2.9} xs={10} sx={{ mt: 1, ml: 0.2 }}>
                                    <MaterialsPickerCard
                                      title={value.name}
                                      assigned={value.assigned}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                            {index !== dropdownValue.mainItems.length - 1 && (
                              <Divider light sx={{ my: 1 }} />
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
