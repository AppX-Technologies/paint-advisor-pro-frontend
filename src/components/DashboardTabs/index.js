import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { dashboardTabLists } from '../../common/Constants';
import Companies from './Companies';
import Users from './Users';

export default function index() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          {dashboardTabLists.map((processTab) => {
            return <Tab label={processTab} key={processTab} />;
          })}
        </Tabs>
      </Box>
      <div role='tabpanel' id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`}>
        <Box sx={{ p: 3 }}>
          <Typography>{value === 0 ? <Companies /> : <Users />}</Typography>
        </Box>
      </div>
    </Box>
  );
}
