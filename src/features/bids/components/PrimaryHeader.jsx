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
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const PrimaryHeader = ({ onFilterChange, primaryHeaderSearch, setPrimaryHeaderSearch }) => {
  const [selectOption, setSelectOption] = useState('');
  const [sortOption, setSortOption] = useState('');
  const menuItems = [
    {
      name: 'Max-Limit',
      value: selectOption,
      changeValue: setSelectOption,
      options: ['10', '20', '50', '100', 'All']
    },
    {
      name: 'Sort By',
      value: sortOption,
      changeValue: setSortOption,
      options: ['Created At', 'Updated At', 'Project Start Date', 'Schedule Date']
    }
  ];

  const handlePrimaryFilter = () => {};

  return (
    <>
      <Box mt={2} sx={{ width: '100%' }}>
        <Grid container gap={1.5} sx={{ width: '100%' }}>
          {/* Search Input */}
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
              value={primaryHeaderSearch}
              onChange={(e) => setPrimaryHeaderSearch(e.target.value)}
              id='outlined-basic'
              label={
                <Typography sx={{ marginTop: '-2.7px' }} onClick={handlePrimaryFilter}>
                  Search
                </Typography>
              }
              variant='outlined'
              sx={{ width: '100%' }}
              size='small'
            />
          </Grid>
          {/* Select */}
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
                    defaultValue={menuItem.name === 'Max-Limit' ? 100 : 'Created At'}
                    onChange={(e) => {
                      menuItem.changeValue(e.target.value);
                      handlePrimaryFilter();
                    }}
                    sx={{ height: '35px' }}>
                    {menuItem.options.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          })}
          {/* Sort and Filter Icons */}
          {Array(2)
            .fill(0)
            .map((_, idx) => {
              return (
                <>
                  <Grid xs={1}>
                    <Button
                      sx={{ width: '100%' }}
                      variant='contained'
                      onClick={
                        idx === 1
                          ? () => onFilterChange((prevFilterValue) => !prevFilterValue)
                          : undefined
                      }
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
    </>
  );
};

export default PrimaryHeader;
