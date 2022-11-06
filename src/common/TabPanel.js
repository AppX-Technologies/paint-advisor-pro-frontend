import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function TabPanel({ children, value, index, tabLabels, Category, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{Category}</Typography>
        </Box>
      )}
    </div>
  );
}
