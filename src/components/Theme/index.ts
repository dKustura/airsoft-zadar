import { createMuiTheme } from '@material-ui/core/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  return createMuiTheme({
    palette: {
      type: mode,
      background: {
        default: mode === 'light' ? '#fff' : '#0d1f22',
      },
      primary: {
        main: '#6f732f',
      },
      secondary: {
        main: '#b38a58',
      },
    },
    typography: {
      fontFamily: ['Roboto', 'Big Shoulders Text', 'sans-serif'].join(','),
    },
  });
};
