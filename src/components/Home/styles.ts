import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useBackgroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    wall: {
      fill: theme.palette.background.default,
      transition: 'all 0.2s ease-in-out',
    },
    horse: {
      transition: 'all 0.2s ease-in-out',
    },
  })
);

export const useStyles = makeStyles({
  root: {},
});
