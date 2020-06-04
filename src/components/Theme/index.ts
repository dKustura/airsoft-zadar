import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import colors from './colors';

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
    fontFamily: ['Arvo', 'Roboto Slab', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    body2: {
      fontFamily: ['DM Mono', 'Roboto Mono', 'monospace'].join(','),
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 15,
  },
};

const commonPalette = {
  success: {
    main: colors.success,
  },
  error: {
    main: colors.error,
  },
  warning: {
    main: colors.warning,
  },
  info: {
    main: colors.info,
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

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: ThemeMode.Light,
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
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
      ...commonPalette,
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
  })
);

const darkTheme = responsiveFontSizes(
  createMuiTheme({
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
        border: '#FFFFFF',
      },
      ...commonPalette,
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
  })
);
