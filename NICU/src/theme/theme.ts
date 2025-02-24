import { createTheme } from '@mui/material/styles';

// Light theme colors
const lightTheme = {
  primary: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
  secondary: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
};

// Dark theme colors
const darkTheme = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
  },
  secondary: {
    main: '#ffb74d',
    light: '#ffe0b2',
    dark: '#f57c00',
  },
  error: {
    main: '#ef5350',
    light: '#e57373',
    dark: '#d32f2f',
  },
  warning: {
    main: '#ffb74d',
    light: '#ffe0b2',
    dark: '#f57c00',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
  },
  background: {
    default: '#303030',
    paper: '#424242',
  },
};

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightTheme : darkTheme),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: mode === 'dark' ? '#6b6b6b' : '#959595',
              border: '2px solid transparent',
            },
            '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
              backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
              borderRadius: 8,
            },
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
    },
  });

export { getTheme };