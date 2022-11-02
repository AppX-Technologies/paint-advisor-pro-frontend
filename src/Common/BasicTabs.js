import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "./TabPanel";

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	};
}

export default function BasicTabs({ tabList, categoryLists }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{tabList.map((processTab, index) => {
						return <Tab label={processTab} {...a11yProps(index)} key={processTab} />;
					})}
				</Tabs>
			</Box>
			{categoryLists.map((category, index) => {
				return (
					<TabPanel
						value={value}
						index={index}
						Category={category}
						key={index}
					></TabPanel>
				);
			})}
		</Box>
	);
}
