import React from "react";
import { DrawerMenu } from "../../Common/DrawerMenu";
import ProcessTabPanel from "../../components/ProcessTabs/index";

export const Processes = ({ showDrawerMenu, showTitle }) => {
  return (
    <>
      <DrawerMenu
        tabPanel={<ProcessTabPanel />}
        showDrawerMenu={showDrawerMenu}
        showTitle={showTitle}
      />
    </>
  );
};
