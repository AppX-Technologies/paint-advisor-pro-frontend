import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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
import React, { useEffect, useMemo } from 'react';

const PrimaryHeader = ({
  onFilterChange,
  primaryHeaderSearch,
  setPrimaryHeaderSearch,
  isAscending,
  setIsAscending,
  handlePrimaryFilter,
  selectOption,
  setSelectOption,
  sortOption,
  setSortOption
}) => {
  const menuItems = useMemo(() => {
    return [
      {
        name: 'Max-Limit',
        value: selectOption,
        changeValue: setSelectOption,
        options: [
          { name: '10', value: 10 },
          { name: '20', value: 20 },
          { name: '50', value: 50 },
          { name: '100', value: 100 },
          { name: 'All', value: 'All' }
        ]
      },
      {
        name: 'Sort By',
        value: sortOption,
        changeValue: setSortOption,
        options: [
          {
            name: 'Created At',
            value: 'createdAt'
          },
          {
            name: 'Updated At',
            value: 'updatedAt'
          },
          {
            name: 'Project Start Date',
            value: 'projectStartDate'
          },
          {
            name: 'Schedule Date',
            value: 'scheduledAt'
          }
        ]
      }
    ];
  }, [selectOption, sortOption]);

  useEffect(() => {
    handlePrimaryFilter();
  }, [isAscending, selectOption, sortOption]);

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
                      <SearchIcon onClick={handlePrimaryFilter} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onKeyDown={(event) => event.key === 'Enter' && handlePrimaryFilter()}
              value={primaryHeaderSearch}
              onChange={(e) => setPrimaryHeaderSearch(e.target.value)}
              id='outlined-basic'
              label={<Typography sx={{ marginTop: '-2.7px' }}>Search</Typography>}
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
                    onChange={(e) => {
                      menuItem.changeValue(e.target.value);
                    }}
                    sx={{ height: '35px' }}>
                    {menuItem.options.map((option) => (
                      <MenuItem value={option.value}>{option.name}</MenuItem>
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
                          ? () => {
                              onFilterChange((prevFilterValue) => !prevFilterValue);
                            }
                          : () => {
                              setIsAscending((prevValue) => !prevValue);
                            }
                      }
                      startIcon={
                        idx === 0 ? (
                          <>
                            {isAscending ? (
                              <ArrowUpwardIcon sx={{ marginLeft: '13px' }} />
                            ) : (
                              <ArrowDownwardIcon sx={{ marginLeft: '13px' }} />
                            )}
                          </>
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
