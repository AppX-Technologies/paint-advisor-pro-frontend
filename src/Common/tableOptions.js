import { CircularProgress, Typography } from "@mui/material";

export const tableOptions = (isLoading, dataList) => {
	return {
		filterType: "textField",
		print: false,
		selectableRows: false,
		responsive: "standard",
		resizableColumns: true,

		textLabels: {
			body: {
				noMatch: (
					<>
						{isLoading && (
							<CircularProgress
								color="primary"
								style={{
									display: isLoading ? "flex" : "none",
									margin: "0 auto"
								}}
							/>
						)}
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
					</>
				),
				toolTip: "Sort",
				columnHeaderTooltip: (column) => `Sort for ${column.label}`
			}
		}
	};
};
