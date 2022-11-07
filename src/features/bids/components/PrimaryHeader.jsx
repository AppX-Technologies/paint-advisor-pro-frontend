import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

const PrimaryHeader = () => {
  const [selectOption, setSelectOption] = useState('');
  const [sortOption, setSortOption] = useState('');
  const menuItems = [
    {
      name: 'Select',
      value: selectOption,
      changeValue: setSelectOption,
      options: ['a', 'b', 'c', 'd']
    },
    {
      name: 'Sort By',
      value: sortOption,
      changeValue: setSortOption,
      options: ['a', 'b', 'c', 'd']
    }
  ];

  return (
    <Box mt={2} ml={2} sx={{ width: '100%' }}>
      <Grid container gap={1.5} sx={{ width: '100%' }}>
        <Grid xs={6} ml={2}>
          <TextField
            InputProps={{
              style: { height: '35px' },
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
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
              <FormControl sx={{ width: '100%', height: '35px' }} size='small'>
                <InputLabel id='demo-select-small' sx={{ marginTop: '-3px' }}>
                  {menuItem.name}
                </InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  label={menuItem.name}
                  value={menuItem.value}
                  onChange={(e) => menuItem.changeValue(e.target.value)}
                  sx={{ height: '35px' }}>
                  {menuItem.options.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          );
        })}
        {Array(2)
          .fill(0)
          .map((_, idx) => {
            return (
              <>
                <Grid xs={1}>
                  <Button
                    sx={{ width: '100%' }}
                    variant='contained'
                    startIcon={
                      idx === 0 ? (
                        <ArrowDownwardIcon sx={{ marginLeft: '13px' }} />
                      ) : (
                        <FilterAltOutlinedIcon sx={{ marginLeft: '13px' }} />
                      )
                    }
                  />
                </Grid>
              </>
            );
          })}
      </Grid>
    </Box>
  );
};

export default PrimaryHeader;
