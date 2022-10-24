import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const Exterior = () => {
  const processList = [
    "Clean the Wall",
    "Brush it",
    "Paint Primer",
    "Let is Dry",
    "UV Coating",
    "Paint Second Coating",
  ];
  console.log(processList);
  const columns = [
    {
      name: "Description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      label: "Action",
      name: "",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const getId = tableMeta.rowData[0];
          return (
            <>
              <Stack direction="row" spacing={2}>
                <EditOutlinedIcon style={{ cursor: "pointer" }} />

                <DeleteOutlineOutlinedIcon style={{ cursor: "pointer" }} />
              </Stack>
            </>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "textField",
    print: false,
    selectableRows: false,
    resizableColumns: true,
    textLabels: {
      body: {
        noMatch: (
          <>
            <CircularProgress
              color="primary"
              style={{
                display: "flex",
                margin: "0 auto",
              }}
            />
            <div
              className="flex flex-col justify-center items-center"
              style={{ padding: "26px 0", marginTop: "32px" }}
            >
              <Typography
                variant="h6"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "17px 0",
                }}
              >
                Sorry, no matching records found.
              </Typography>
            </div>
          </>
        ),
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
    },
  };

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

export default Exterior;
