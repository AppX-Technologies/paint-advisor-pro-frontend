/*eslint-disable*/
import React from "react";
import BasicTabs from "../../Common/BasicTabs";
import { dashboardTabLists } from "../../Common/Constants";

import Companies from "./Companies";
import Users from "./Users";

export default function index() {
	return <BasicTabs tabList={dashboardTabLists} categoryLists={[<Companies />, <Users />]} />;
}
