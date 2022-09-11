import * as React from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{display:"flex",justifyContent:"space-between"}}>
          <AdbIcon sx={{ display: {  xs: "flex", md: "flex" }, mr: 1 }} />
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
