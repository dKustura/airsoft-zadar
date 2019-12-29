import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      backgroundColor: theme.palette.secondary.light,
    },
    userButtonLabel: {
      textTransform: 'none',
    },
  });
