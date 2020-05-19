import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(4),
    },
    titleTypography: {
      hyphens: 'auto',
    },
  });
