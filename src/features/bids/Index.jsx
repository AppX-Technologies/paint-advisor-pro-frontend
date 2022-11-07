import { Divider } from '@mui/material';
import React, { useState } from 'react';
import Filter from './components/Filter';
import PrimaryHeader from './components/PrimaryHeader';
import Steps from './components/Steps';

const Index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };

  return (
    <>
      <PrimaryHeader showFilter={showFilter} onFilterChange={setShowFilter} />
      <Divider light sx={{ margin: '10px 0 10px 5px', width: '103%' }} />
      <Steps />
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
    </>
  );
};

export default Index;
