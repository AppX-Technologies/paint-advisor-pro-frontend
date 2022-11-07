import { Tab, Tabs } from '@mui/material';
import React from 'react';

const TabsNavigation = ({ value, handleTabChange, tabList }) => {
  return (
    <Tabs value={value} onChange={handleTabChange} aria-label='basic tabs example'>
      {tabList.map((processTab) => {
        return <Tab label={processTab} key={processTab} />;
      })}
    </Tabs>
  );
};

export default TabsNavigation;
