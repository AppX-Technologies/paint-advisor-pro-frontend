import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Interior from "./Interior";
import Exterior from "./Exterior";
import { processesTabLists } from "../../Common/Constants";
import { TabPanel } from "../../Common/TabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {processesTabLists.map((processTab, index) => {
            return <Tab label={processTab} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Interior />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Exterior />
      </TabPanel>
    </Box>
  );
}
