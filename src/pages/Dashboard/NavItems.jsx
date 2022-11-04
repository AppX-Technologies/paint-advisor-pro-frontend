import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const NavItems = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Dashboard Tab */}
      <ListItemButton onClick={() => navigate('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton>
      {/* Processes Tab */}
      <ListItemButton onClick={() => navigate('/processes')}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary='Default Processes' />
      </ListItemButton>
      {/* Profile Tab */}
      <ListItemButton onClick={() => navigate('/profile')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItemButton>
    </>
  );
};

export default NavItems;
