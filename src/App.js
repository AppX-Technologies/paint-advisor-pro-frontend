import React, { useEffect, useState } from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import PageNotFound from "./components/404";
import Layout from "./routing/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CustomSnackBar from "./components/Snackbar";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./routing/ProtectedRoute";
import CompanyDashboard from "./pages/CompanyDashboard";
import RestrictedRoutes from "./routing/RestrictedRoute";
import { Processes } from "./pages/Processes";
import Dashboard from "./pages/Dashboard";

function App() {
	const [userDetails, setUserDetails] = useState();
	const { pathname } = useLocation();
	useEffect(() => {
		setUserDetails(
			JSON.parse(localStorage.getItem("user")) || {
				token: null
			}
		);
	}, [pathname]);

	return (
		<>
			<CustomSnackBar />
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Counter />} />
					<Route element={<RestrictedRoutes />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<RegisterPage />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="dashboard"
							element={
								userDetails &&
								userDetails.token &&
								userDetails.role === "Admin" && <Dashboard />
							}
						/>
						<Route
							path="processes"
							element={
								userDetails &&
								userDetails.token &&
								userDetails.role === "Admin" && <Processes />
							}
						/>{" "}
						<Route
							path="profile"
							element={
								userDetails &&
								userDetails.token &&
								userDetails.role === "Admin" && <Profile />
							}
						/>
					</Route>
				</Route>
				<Route path="*" element={<PageNotFound />} />
				<Route element={<ProtectedRoute />}>
					<Route path="company">
						<Route path="/company" element={<CompanyDashboard />} />
						<Route
							path="/company/:companyId"
							element={<CompanyDashboard isSystemAdmin />}
						/>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
