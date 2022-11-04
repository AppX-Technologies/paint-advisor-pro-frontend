import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			defaultProps: {
				enableColorScheme: true
			}
		},
		MuiButtonBase: {
			defaultProps: {
				disableTouchRipple: true
			}
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {}
		},
		MuiTab: {
			defaultProps: {
				disableTouchRipple: true
			}
		}
	},
	shape: {
		borderRadius: 10
	},
	typography: {
		fontFamily: ["Signika Negative"]
	},
	palette: {
		primary: { main: "#d50000" }
	}
});

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
