import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { commonRoutes } from '../../routing/routes';

const DrawerMenu = ({ menuItems = [] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <List component='nav'>
      {menuItems.map(({ icon: Icon, text, relLink }) => (
        <ListItemButton
          selected={pathname.includes(relLink)}
          key={text}
          onClick={text === 'Logout' ? onLogoutClick : () => navigate(relLink)}>
          {Icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
      {commonRoutes.map(({ icon: Icon, text, relLink }) => (
        <ListItemButton
          selected={pathname.includes(relLink)}
          key={text}
          onClick={text === 'Logout' ? onLogoutClick : () => navigate(relLink)}>
          {Icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default DrawerMenu;
