import React from "react";
import { DrawerMenu } from "../../Common/DrawerMenu";
import Profile from "../../components/ProfileTab/index";

const index = () => {
	return (
		<>
			<DrawerMenu tabPanel={<Profile />} showDrawerMenu={true} />
		</>
	);
};

export default index;
