import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const PrimaryHeader = () => {
  const menuItems = [
    {
      name: 'Select',
      options: ['a', 'b', 'c', 'd']
    },
    {
      name: 'Sort By',
      options: ['a', 'b', 'c', 'd']
    }
  ];
  return (
    <Box mt={2} ml={2}>
      <Grid container gap={1.5}>
        <Grid xs={6} ml={2}>
          <TextField
            id='outlined-basic'
            label='search'
            variant='outlined'
            sx={{ width: '100%' }}
            size='small'
          />
        </Grid>
        {menuItems.map((menuItem) => {
          return (
            <Grid xs={1.5}>
              <FormControl sx={{ width: '100%' }} size='small'>
                <InputLabel id='demo-select-small'>{menuItem.name}</InputLabel>
                <Select labelId='demo-select-small' id='demo-select-small' label={menuItem.name}>
                  {menuItem.options.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          );
        })}
        <Grid xs={1}>
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            startIcon={<ArrowDownwardIcon sx={{ marginLeft: '13px' }} />}
          />
        </Grid>
        <Grid xs={1}>
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            startIcon={<FilterAltOutlinedIcon sx={{ marginLeft: '13px' }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrimaryHeader;
