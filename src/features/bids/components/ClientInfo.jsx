import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { Box, Chip, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AddNewClientTextField } from '../../../common/FormTextField';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { findCurrentStageButtonInfo } from '../helpers/findCurrentStageButtonInfo';

const ClientInfo = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box m={1} sx={{ border: '1px solid lightgray', borderRadius: '15px', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
          <Typography p={1} sx={{ width: '100%' }}>
            Client&apos;s Info
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <ExpandCircleDownOutlinedIcon
              onClick={handleClick}
              sx={{ cursor: 'pointer', width: '30px', height: '30px' }}
            />
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}>
              {findCurrentStageButtonInfo('crate-client').actions.map((info) => {
                return <MenuItem onClick={handleClose}>{info.text}</MenuItem>;
              })}
            </Menu>
          </Box>
        </Box>
        <Divider light />
        {/* Client's Info Card */}
        <Grid container>
          {AddNewClientTextField.map((field) => {
            return (
              <>
                <Grid md={2} xs={10}>
                  <Box
                    p={0.5}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      margin: '5px 4px'
                    }}>
                    <Typography sx={{ fontSize: '12px', textAlign: 'left' }}>
                      {convertStringCase(field.name)} :{' '}
                    </Typography>
                    <Chip label='abcdefghijklm' size='small' />
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default ClientInfo;
