/* eslint-disable */
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
const RestrictedRoutes = () => {
	// const { user } = useSelector((state) => state.auth)
	const user = JSON.parse(localStorage.getItem("user")) || { user: null };
	// show unauthorized screen if no user is found in redux store
	if (user.token) {
		return (
			<div className="unauthorized">
				<Typography component="h1" variant="h5">
					You are already logged in!
				</Typography>
				<Typography component="h5" variant="h6">
					{user.role === "Admin" ? (
						<NavLink to="/dashboard">Go to admin dashboard</NavLink>
					) : (
						<NavLink to="/company">Go to company dashboard</NavLink>
					)}
				</Typography>
			</div>
		);
	}

	// returns child route elements
	return <Outlet />;
};
export default RestrictedRoutes;
