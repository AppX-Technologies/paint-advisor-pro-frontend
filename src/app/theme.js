import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '& input:-internal-autofill-selected': {
            '-webkit-box-shadow': 0
          }
        }
      }
    },
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
    fontFamily: ['Signika Negative']
  },
  chip: {
    background: { main: '#FAF2F0' }
  },
  deleteicon: {
    color: { main: '#D50000' }
  },
  editicon: {
    color: { main: '#9B29AB' }
  },
  cloneIcon: {
    color: { main: '#008100' }
  },
  palette: {
    primary: { main: '#d50000' },
    background: { default: '#f9f6f6' }
  }
});

export default theme;
