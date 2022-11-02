/*eslint-disable*/

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./listItems";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrgs, fetchSingleOrg } from "../../features/org/orgSlice";
import Bids from "../Bids";
import Materials from "../Materials";
import { Processes } from "../Processes";
import UsersFromCompany from "./UsersFromCompany";
import { fetchUserMadeByCompany } from "../../features/usersFromCompany/usersFromCompanySlice";
import { useParams } from "react-router-dom";

const drawerWidth = 240;
console.log(JSON.parse(localStorage.getItem("user")));
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9)
			}
		})
	}
}));

const mdTheme = createTheme();

function DashboardContent({ isSystemAdmin }) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(true);
	const [clickedMenu, setClickedMenu] = React.useState("Bids");
	const { org, isLoading } = useSelector((state) => state.org);
	const userDetail = JSON.parse(localStorage.getItem("user"));
	const { companyId } = useParams();

	const toggleDrawer = () => {
		setOpen(!open);
	};

	React.useEffect(() => {
		dispatch(
			fetchSingleOrg({
				filter: isSystemAdmin
					? {
							_id: companyId
					  }
					: undefined,
				token: userDetail.token
			})
		);
	}, []);
	console.log(org);

	React.useEffect(() => {
		if (userDetail.role === "Org Admin" || userDetail.role === "Admin") {
			dispatch(
				fetchUserMadeByCompany({
					token: userDetail.token,
					orgId: companyId
				})
			);
		}
	}, []);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: "24px" // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "36px",
								...(open && { display: "none" })
							}}
						>
							<MenuIcon />
						</IconButton>

						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							{(org ? org.name : userDetail.name) || "Painting App"}
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1]
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<MainListItems setClickedMenu={setClickedMenu} />
					</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto"
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" style={{ marginLeft: "-22px" }} sx={{ mt: 0, mb: 4 }}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={12} lg={12}>
								{clickedMenu === "Bids" && <Bids />}
								{clickedMenu === "Materials" && <Materials />}
								{clickedMenu === "Processes" && (
									<Processes showDrawerMenu={false} />
								)}
								{clickedMenu === "Users" && <UsersFromCompany getId={org._id} />}
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function CompanyDashboard({ isSystemAdmin }) {
	return <DashboardContent isSystemAdmin={isSystemAdmin} />;
}
