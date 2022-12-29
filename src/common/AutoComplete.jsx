import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import React from 'react';

const AutoComplete = ({
  filterOptions,
  value,
  onChange,
  options,
  filterOption,
  secondaryValuesToRender,
  varient,
  pickerTitle,
  defaultValue,
  showSelectedValue
}) => {
  return (
    <>
      <Autocomplete
        filterOptions={filterOptions}
        value={value}
        size='small'
        defaultValue={defaultValue || null}
        onChange={onChange}
        disablePortal
        id='combo-box-demo'
        options={options}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          <Box {...props}>
            <Typography sx={{ fontSize: '14px' }}>{option?.[filterOption]}</Typography>
            <Box ml={2} sx={{ float: 'right' }}>
              <Typography sx={{ fontSize: '12px', mt: 0.5 }}>
                {secondaryValuesToRender.length === 2 ? (
                  <>
                    ({option?.[secondaryValuesToRender[0]]}/{option?.[secondaryValuesToRender[1]]})
                  </>
                ) : (
                  <>({option?.[secondaryValuesToRender[0]]})</>
                )}
              </Typography>
            </Box>
          </Box>
        )}
        sx={{ mt: 1, width: '200px', mb: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={varient ?? 'outlined'}
            label={pickerTitle ?? ''}
            sx={{ borderRadius: 0, ml: 1 }}
          />
        )}
      />
    </>
  );
};

export default AutoComplete;
