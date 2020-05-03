import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    headerContainer: {
      position: 'sticky',
      top: 0,
      backgroundColor: theme.palette.background.default,
      zIndex: 200,
      transition: 'background-color 0.2s ease-in-out 0s',
    },
  });
