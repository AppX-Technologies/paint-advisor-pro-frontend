import React from "react";
import BasicTabs from "../../Common/BasicTabs";
import { processesTabLists } from "../../Common/Constants";

import ProcessTable from "./ProcessTable";

const index = () => {
	return (
		<BasicTabs
			tabList={processesTabLists}
			categoryLists={processesTabLists.map((processTab) => {
				return <ProcessTable filterValue={processTab} key={processTab} />;
			})}
		/>
	);
};

export default index;
