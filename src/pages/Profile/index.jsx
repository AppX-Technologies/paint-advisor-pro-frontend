import React from 'react';
import { DrawerMenu } from '../../common/DrawerMenu';
import Profile from '../../components/ProfileTab/index';

const index = () => {
  return (
    <DrawerMenu tabPanel={<Profile />} showDrawerMenu />
  );
};

export default index;
