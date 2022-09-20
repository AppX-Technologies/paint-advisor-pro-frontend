import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';

const MainListItems = (props)=>{
  const {setClickedMenu} = props;
  return(
    <React.Fragment>
    <ListItemButton onClick={()=> {setClickedMenu("Bids")}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Bids" />
    </ListItemButton>
    
    <ListItemButton onClick={()=> {setClickedMenu("Processes")}}>
      <ListItemIcon>
      <AccountTreeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Processes" />
    </ListItemButton>

    <ListItemButton onClick={()=> {setClickedMenu("Materials")}}>
      <ListItemIcon>
      <HomeRepairServiceOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Materials" />
    </ListItemButton>

    <ListItemButton onClick={()=> {setClickedMenu("Users")}}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
  )
} 

export default MainListItems;