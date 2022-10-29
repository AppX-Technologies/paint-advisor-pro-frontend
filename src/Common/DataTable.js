import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";

const DataTable = ({ datalist, title, columns, options }) => {
  return (
    <>
      <MUIDataTable
        title={title}
        data={datalist}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default DataTable;
