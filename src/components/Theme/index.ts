import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeMode } from 'reducers/constants';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import colors from './colors';

export const getTheme = (mode: ThemeMode) => {
  return mode === ThemeMode.Light ? lightTheme : darkTheme;
};

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: ['Arvo', 'Roboto Slab', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    body2: {
      fontFamily: ['DM Mono', 'Roboto Mono', 'monospace'].join(','),
      fontSize: '1rem',
    },
    subtitle1: {
      fontFamily: ['DM Mono', 'Roboto Mono', 'monospace'].join(','),
      fontSize: '0.9rem',
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

const commonOverrides = {
  MuiSvgIcon: {
    fontSizeLarge: {
      fontSize: '3rem',
    },
    fontSizeInherit: {
      fontSize: '2rem',
    },
    fontSizeSmall: {
      fontSize: '1rem',
    },
  },
};

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    icon: {
      border: string;
    };
    postCard: PaletteColor;
    postCardBorder: PaletteColor;
    link: PaletteColor;
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    icon?: {
      border?: string;
    };
    postCard?: PaletteColorOptions;
    postCardBorder?: PaletteColorOptions;
    link?: PaletteColorOptions;
  }
}

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: ThemeMode.Light,
      background: {
        default: colors.white,
        paper: colors.white,
      },
      primary: {
        main: colors.yaleBlue,
      },
      secondary: {
        main: colors.skyBlue,
      },
      icon: {
        border: colors.black,
      },
      postCard: {
        main: colors.logoYellow,
      },
      postCardBorder: {
        main: colors.black,
      },
      link: {
        main: colors.yaleBlue,
      },
      ...commonPalette,
    },
    overrides: {
      ...commonOverrides,
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: colors.yaleBlue,
        },
      },
      MuiInputLabel: {
        shrink: {
          color: colors.yaleBlueTransparent,
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
        default: colors.darkJungleGreen,
        paper: colors.outerSpace,
      },
      primary: {
        main: colors.skyBlue,
      },
      secondary: {
        main: colors.yaleBlue,
      },
      icon: {
        border: colors.white,
      },
      postCard: {
        main: colors.yaleBlue,
      },
      postCardBorder: {
        main: colors.white,
      },
      link: {
        main: colors.logoYellow,
      },
      ...commonPalette,
    },
    overrides: {
      ...commonOverrides,
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: colors.skyBlue,
        },
      },
      MuiInputLabel: {
        outlined: {
          color: colors.skyBlueTransparent,
        },
      },
    },
    ...commonTheme,
  })
);
