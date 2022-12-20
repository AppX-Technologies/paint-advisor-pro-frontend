import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { commonRoutes } from '../../routing/routes';

const DrawerMenu = ({ menuItems = [], open, onDrawerMenuChange }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <List
      component='nav'
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
      <div>
        {menuItems.map(({ icon: Icon, text, relLink }) => (
          <Tooltip title={!open ? text : ''} placement='right'>
            <ListItemButton
              selected={pathname.includes(relLink)}
              key={text}
              onClick={() => {
                navigate(relLink);
                onDrawerMenuChange(false);
              }}>
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText sx={{ margin: open ? '-10px' : '0px' }} primary={text} />
            </ListItemButton>
          </Tooltip>
        ))}
        <Divider light />
      </div>
      <div style={{ display: 'flex' }}>
        {commonRoutes.map(({ icon: Icon, text, relLink }, idx) => (
          <>
            <Tooltip title={!open ? text : ''}>
              <ListItemButton
                selected={pathname.includes(relLink)}
                sx={{ p: 0.5 }}
                key={text}
                onClick={
                  text === 'Logout'
                    ? onLogoutClick
                    : () => {
                        navigate(relLink);
                        onDrawerMenuChange(false);
                      }
                }>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                {open && (
                  <ListItemText
                    primary={
                      <Typography type='body2' sx={{ fontSize: '15px', marginLeft: '-30px' }}>
                        {text}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </Tooltip>
            {idx === 0 && <Divider orientation='vertical' flexItem />}
          </>
        ))}
      </div>
    </List>
  );
};

export default DrawerMenu;
