import React from "react";
import { useDispatch } from "react-redux";
import BasicTabs from "../../Common/BasicTabs";
import { dashboardTabLists } from "../../Common/Constants";

import Companies from "./Companies";
import Users from "./Users";
import { fetchOrgs } from "../../features/org/orgSlice";
import { fetchUsers } from "../../features/users/userSlice";

export default function index() {
	const dispatch = useDispatch();
	const userDetail = JSON.parse(localStorage.getItem("user"));

	React.useEffect(() => {
		if (userDetail.role === "Admin") {
			dispatch(fetchOrgs(userDetail.token));
			dispatch(fetchUsers(userDetail.token));
		}
	}, []);

	return <BasicTabs tabList={dashboardTabLists} categoryLists={[<Companies />, <Users />]} />;
}
