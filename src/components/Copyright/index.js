import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" to="/">
				Paint Advisor
			</Link>
			{new Date().getFullYear()}
			.
		</Typography>
	);
}
