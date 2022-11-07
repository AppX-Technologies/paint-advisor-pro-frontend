import GroupAddIcon from '@mui/icons-material/GroupAdd';
import React from 'react';
import Button from '../../components/Button';
import AddNewClientForm from './components/AddNewClientForm';
import PrimaryHeader from './components/PrimaryHeader';

const Index = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <PrimaryHeader />
      <Button
        variant='outlined'
        color='primary'
        style={{
          position: 'absolute',
          right: 20,
          bottom: 10
        }}
        onClick={() => setOpen(true)}>
        <GroupAddIcon sx={{mr:1}} /> Add new client
      </Button>

      <AddNewClientForm open={open} setOpen={setOpen} />
    </>
  );
};

export default Index;
