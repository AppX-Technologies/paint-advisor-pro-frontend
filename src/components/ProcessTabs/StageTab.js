import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const StageTab = ({ stage, onTabChange }) => {
	return (
		<>
			<Box
				sx={{
					width: "90%",
					bgcolor: "background.paper",
					margin: "10px 8px 0 0",
					borderRadius: "5px"
				}}
			>
				<Tabs value={stage} onChange={onTabChange} centered>
					<Tab label="Presentation" />
					<Tab label="Painting" />
					<Tab label="Cleanup" />
				</Tabs>
			</Box>
		</>
	);
};

export default StageTab;
