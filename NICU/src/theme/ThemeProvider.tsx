import React from 'react';
import { 
  ThemeProvider as MuiThemeProvider, 
  createTheme,
  CssBaseline 
} from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>('theme-mode', 'light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
            ...(mode === 'dark' && {
              main: '#90caf9',
            }),
          },
          secondary: {
            main: '#9c27b0',
            ...(mode === 'dark' && {
              main: '#ce93d8',
            }),
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

interface ColorModeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => React.useContext(ColorModeContext);