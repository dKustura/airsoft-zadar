import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const getTheme = (mode: ThemeMode) => {
  return mode === ThemeMode.Light ? lightTheme : darkTheme;
};

const skyBlue = '#5ACDEE';
const skyBlueTransparent = 'rgb(90, 205, 238, 0.75)';
const yaleBlue = '#104E7B';
const yaleBlueTransparent = 'rgb(16, 78, 123, 0.75)';
const darkJungleGreen = '#0D1F22';
const outerSpace = '#243538';

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: ['Arvo', 'Roboto', 'monospace'].join(','),
    h1: {
      fontWeight: 700,
    },
    body1: {
      fontFamily: ['Overpass Mono', 'monospace'].join(','),
    },
  },
  shape: {
    borderRadius: 15,
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontFamily: ['Arvo', 'Roboto', 'monospace'].join(','),
      },
    },
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
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: yaleBlue,
      },
    },
    MuiInputLabel: {
      shrink: {
        color: yaleBlueTransparent,
      },
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
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: skyBlue,
      },
    },
    MuiInputLabel: {
      outlined: {
        color: skyBlueTransparent,
      },
    },
  },
  ...commonTheme,
});
