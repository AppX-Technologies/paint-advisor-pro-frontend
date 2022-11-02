import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const StageTab = () => {
	const [stage, setStage] = React.useState(0);

	const handleChange = (event, newValue) => {
		setStage(newValue);
	};
	return (
		<>
			<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
				<Tabs value={stage} onChange={handleChange} centered>
					<Tab label="Stage One" />
					<Tab label="Stage Two" />
					<Tab label="Stage Three" />
				</Tabs>
			</Box>
		</>
	);
};

export default StageTab;
