import * as React from 'react';
import { DrawerMenu } from '../../common/DrawerMenu';
import DashboardTabPanel from '../../components/DashboardTabs/index';

export default function Dashboard() {
  return <DrawerMenu tabPanel={<DashboardTabPanel />} />;
}
