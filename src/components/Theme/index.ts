import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const getTheme = (mode: ThemeMode) => {
  return mode === ThemeMode.Light ? lightTheme : darkTheme;
};

const skyBlue = '#5ACDEE';
const yaleBlue = '#104E7B';
const darkJungleGreen = '#0D1F22';
const outerSpace = '#243538';

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
      default: 'white',
      paper: 'white',
    },
    primary: {
      main: yaleBlue,
    },
    secondary: {
      main: skyBlue,
    },
    icon: {
      border: '#000',
    },
  },
  ...commonTheme,
});

const darkTheme = createMuiTheme({
  palette: {
    type: ThemeMode.Dark,
    background: {
      // paper: '#000',
      default: darkJungleGreen,
      paper: outerSpace,
    },
    primary: {
      main: skyBlue,
    },
    secondary: {
      main: yaleBlue,
    },
    icon: {
      border: 'white',
    },
  },
  ...commonTheme,
});
