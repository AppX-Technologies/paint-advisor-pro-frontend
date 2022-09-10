import React from "react";
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

const styles = () => ({
  root: {
    // common styles for button here
  }
});

function CustomButton(props) {
  return <Button variant="contained" color="primary" {...props} />;
}

export default withStyles(styles)(CustomButton);
