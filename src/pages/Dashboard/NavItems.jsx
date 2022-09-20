import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import {useNavigate} from 'react-router-dom'

const NavItems = () => { 
  const navigate = useNavigate()
 return ( 
 <React.Fragment>
    <ListItemButton onClick={()=> navigate('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
)}

export default NavItems;