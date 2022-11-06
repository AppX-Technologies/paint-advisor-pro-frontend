import Typography from '@mui/material/Typography';
import * as React from 'react';

function Title({ children }) {
  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {children}
    </Typography>
  );
}

export default Title;
