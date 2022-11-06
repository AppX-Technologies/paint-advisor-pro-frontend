import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "../../features/snackbar/snackbarSlice";

const Alert = React.forwardRef((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar() {
	const dispatch = useDispatch();
	const { open, severity, message } = useSelector((state) => state.snackbar);
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={() => dispatch(onClose())}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert onClose={() => dispatch(onClose())} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
}
