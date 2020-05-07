import { createStyles, Theme } from '@material-ui/core';

export const background = (theme: Theme) =>
  createStyles({
    wall: {
      fill: theme.palette.background.default,
      transition: 'all 0.2s ease-in-out',
    },
    horse: {
      transition: 'all 0.2s ease-in-out',
    },
  });

export default createStyles({
  root: {},
});
