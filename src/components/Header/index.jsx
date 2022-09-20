import * as React from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLoginRoute = () => {
    if(userDetail){
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{display:"flex",justifyContent:"space-between"}}>
          <AdbIcon sx={{ display: {  xs: "flex", md: "flex" }, mr: 1 }} />
            <Button variant="contained" color="primary" onClick={handleLoginRoute}>
              Login
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
