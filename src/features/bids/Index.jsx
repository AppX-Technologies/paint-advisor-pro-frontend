import { Divider } from '@mui/material';
import React from 'react';
import PrimaryHeader from './components/PrimaryHeader';
import Steps from './components/Steps';

const Index = () => {
  return (
    <>
      <PrimaryHeader />
      <Divider light sx={{ margin: '10px 0 10px 5px', width: '103%' }} />
      <Steps />
    </>
  );
};

export default Index;
