import React from "react";
import { DrawerMenu } from "../../Common/DrawerMenu";
import ProcessTabPanel from "../../components/ProcessTabs/index";

export const Processes = () => {
  return (
    <>
      <DrawerMenu tabPanel={<ProcessTabPanel />} />
    </>
  );
};
