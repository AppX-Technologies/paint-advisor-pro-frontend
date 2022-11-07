import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Divider } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../components/Button';
import AddNewClientForm from './components/AddNewClientForm';
import Filter from './components/Filter';
import PrimaryHeader from './components/PrimaryHeader';
import Steps from './components/Steps';

const Index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const onFilterOptionsClose = () => {
    setShowFilter(false);
  };

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        style={{
          position: 'absolute',
          right: 20,
          bottom: 10
        }}
        onClick={() => setOpen(true)}>
        <GroupAddIcon sx={{ mr: 1 }} /> Add new client
      </Button>

      <AddNewClientForm open={open} setOpen={setOpen} />
      <PrimaryHeader showFilter={showFilter} onFilterChange={setShowFilter} />
      <Divider light sx={{ margin: '10px 0 10px 5px', width: '103%' }} />
      <Steps />
      <Filter showFilter={showFilter} onFilterOptionsClose={onFilterOptionsClose} />
    </>
  );
};

export default Index;
