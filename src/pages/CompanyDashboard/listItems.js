import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import {logout,reset} from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const MainListItems = (props)=>{
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const {setClickedMenu} = props;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/', { replace: true });
  }
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

    {userDetail.role === "Org Admin" || "Admin" && <ListItemButton onClick={()=> {setClickedMenu("Users")}}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>}
    
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
      <HomeRepairServiceOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
  )
} 

export default MainListItems;