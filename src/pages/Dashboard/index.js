import * as React from "react";
import { DrawerMenu } from "../../Common/DrawerMenu";
import DashboardTabPanel from "../../components/DashboardTabs/index";

export default function Dashboard() {
  return <DrawerMenu tabPanel={<DashboardTabPanel />} />;
}
