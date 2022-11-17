import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px white inset',
            height: '0px'
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
    color: { main: '#CD2C63' }
  },
  editicon: {
    color: { main: '#9B29AB' }
  },
  palette: {
    primary: { main: '#d50000' },
    background: { default: '#f9f6f6' }
  }
});

export default theme;
