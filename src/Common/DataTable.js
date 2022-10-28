import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";

const DataTable = ({ datalist, title, columns, options }) => {
  return (
    <>
      <MUIDataTable
        title={title}
        data={datalist.map((item, index) => {
          const columnData = [];
          for (let itemIndex in item) {
            columnData.push(item[itemIndex] ? item[itemIndex] : null);
          }
          return columnData;
        })}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default DataTable;
