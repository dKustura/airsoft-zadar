import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';

export const getTheme = (mode: ThemeMode) => {
  return mode === ThemeMode.Light ? lightTheme : darkTheme;
};

const commonTheme = {
  typography: {
    fontFamily: ['Roboto', 'Big Shoulders Text', 'sans-serif'].join(','),
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '8px',
      },
    },
  },
};

const lightTheme = createMuiTheme({
  palette: {
    type: ThemeMode.Light,
    background: {
      default: '#f9f0dd',
    },
    primary: {
      main: '#d19a57',
    },
    secondary: {
      main: '#f9f0dd',
    },
  },
  ...commonTheme,
});

const darkTheme = createMuiTheme({
  palette: {
    type: ThemeMode.Dark,
    background: {
      default: '#0d1f22',
    },
    primary: {
      main: '#6f732f',
    },
    secondary: {
      main: '#0d1f22',
    },
  },
  ...commonTheme,
});
