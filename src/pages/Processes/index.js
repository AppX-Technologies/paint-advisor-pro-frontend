import React from 'react';
import { DrawerMenu } from '../../common/DrawerMenu';
import ProcessTabPanel from '../../components/ProcessTabs/index';

export const Processes = ({ showDrawerMenu }) => {
  return <DrawerMenu tabPanel={<ProcessTabPanel />} showDrawerMenu={showDrawerMenu} />;
};
