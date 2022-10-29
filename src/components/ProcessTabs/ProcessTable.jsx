import React from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/material";
import CustomButton from "../Button";

import { processColumn } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";
const ProcessTable = ({ filterValue }) => {
  const isLoading = false;

  const processList =
    filterValue === "Interior"
      ? ["Clean", "Brush", "Paint Primer", "Let is Dry", "Paint Second Coating"]
      : [
          "Clean the Wall",
          "Brush it",
          "Paint Primer",
          "Let is Dry",
          "UV Coating",
          "Paint Second Coating",
        ];
  const columns = processColumn();
  const options = tableOptions(processList, isLoading);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create
        </CustomButton>
      </Box>
      <MUIDataTable
        title={"Process List"}
        data={processList.map((item, index) => {
          return [item];
        })}
        columns={columns}
        options={options}
      />
      {/* <FormDialog />
      <EditOrgForm /> */}
    </>
  );
};

export default ProcessTable;
