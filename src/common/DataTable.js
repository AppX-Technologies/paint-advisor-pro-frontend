import React from "react";
import MUIDataTable from "mui-datatables";
import { Button, CircularProgress } from "@mui/material";

const DataTable = ({ datalist, title, columns, options, isLoading }) => {
	return (
		<>
			<MUIDataTable
				title={
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center"
						}}
					>
						<h4 style={{ fontSize: "18px" }}>{title}</h4>
						<div style={{ marginLeft: "10px" }}>
							{isLoading && (
								<CircularProgress
									color="primary"
									style={{
										display: isLoading ? "flex" : "none",
										margin: "0 auto",
										width: "30px",
										height: "30px"
									}}
								/>
							)}
						</div>
					</div>
				}
				data={datalist}
				columns={columns}
				options={options}
			/>
		</>
	);
};

export default DataTable;
