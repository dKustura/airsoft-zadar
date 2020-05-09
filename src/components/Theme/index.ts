import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const getTheme = (mode: ThemeMode) => {
  return mode === ThemeMode.Light ? lightTheme : darkTheme;
};

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: ['Arvo', 'Roboto', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 15,
  },
};

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    icon: {
      border: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    icon?: {
      border?: string;
    };
  }
}

const lightTheme = createMuiTheme({
  palette: {
    type: ThemeMode.Light,
    background: {
      default: '#fff',
      paper: '#fff',
    },
    primary: {
      main: '#29abe2',
    },
    secondary: {
      main: '#f9f0dd',
    },
    icon: {
      border: '#000000',
    },
  },
  ...commonTheme,
});

const darkTheme = createMuiTheme({
  palette: {
    type: ThemeMode.Dark,
    background: {
      // paper: '#000',
      default: '#0d1f22',
      paper: '#243538',
    },
    primary: {
      main: '#104e7b',
    },
    secondary: {
      main: '#0d1f22',
    },
    icon: {
      border: '#ffffff',
    },
  },
  ...commonTheme,
});
