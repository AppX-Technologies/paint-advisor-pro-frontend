import React from "react";
import BasicTabs from "../../Common/BasicTabs";
import { processesTabLists } from "../../Common/Constants";
import Exterior from "./Exterior";
import Interior from "./Interior";

const index = () => {
  return (
    <BasicTabs
      tabList={processesTabLists}
      categoryLists={[<Interior />, <Exterior />]}
    />
  );
};

export default index;
