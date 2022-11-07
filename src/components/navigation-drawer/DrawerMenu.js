import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const DrawerMenu = ({ menuItems = [] }) => {
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
          href={relLink}
          key={text}
          onClick={text === 'Logout' && onLogoutClick}>
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
