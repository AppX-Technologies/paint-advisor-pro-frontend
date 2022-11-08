import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { commonRoutes } from '../../routing/routes';

const DrawerMenu = ({ menuItems = [], open }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <List component='nav' sx={{ height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
        <div>
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
          <Divider light />
        </div>
        <div style={{ display: open ? 'flex' : 'static' }}>
          {commonRoutes.map(({ icon: Icon, text, relLink }, idx) => (
            <>
              <ListItemButton
                selected={pathname.includes(relLink)}
                key={text}
                onClick={text === 'Logout' ? onLogoutClick : () => navigate(relLink)}>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                {open && (
                  <ListItemText
                    primary={
                      <Typography type='body2' sx={{ fontSize: '15px', marginLeft: '-15px' }}>
                        {text}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
              {idx === 0 && <Divider orientation='vertical' flexItem />}
            </>
          ))}
        </div>
      </div>
    </List>
  );
};

export default DrawerMenu;
