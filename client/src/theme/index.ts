import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        sizeSmall: {
          padding: '3px 10px'
        },
        sizeMedium: {
          padding: '8px 20px'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F3F4F6',
          '.MuiTableCell-root': {
            color: '#374151'
          },
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase'
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  palette: {
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF'
    },
    primary: {
      main: '#5048E5',
    },
    error: {
      main: '#D14343',
    },
  }
})