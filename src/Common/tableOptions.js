import { Typography } from "@mui/material";
import React from "react";

export const tableOptions = (isLoading) => {
	return {
		filterType: "textField",
		resizableColumns: true,

		print: false,
		selectableRows: false,
		textLabels: {
			body: {
				noMatch: (
					<>
						{!isLoading && (
							<div
								className="flex flex-col justify-center items-center"
								style={{ padding: "26px 0", marginTop: "32px" }}
							>
								<Typography
									variant="h6"
									style={{
										fontSize: "14px",
										fontWeight: 600,
										padding: "17px 0"
									}}
								>
									Sorry, no matching records found.
								</Typography>
							</div>
						)}
					</>
				),
				toolTip: "Sort",
				columnHeaderTooltip: (column) => `Sort for ${column.label}`
			}
		}
	};
};
