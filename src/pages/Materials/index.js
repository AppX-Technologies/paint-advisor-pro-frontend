/*eslint-disable*/

import React from "react";
import BasicTabs from "../../Common/BasicTabs";
import { materialTabLists } from "../../Common/Constants";
import Companies from "../../components/DashboardTabs/Companies";
import Users from "../../components/DashboardTabs/Users";

const Materials = () => {
	return <BasicTabs tabList={materialTabLists} categoryLists={[<Companies />, <Users />]} />;
};

export default Materials;
