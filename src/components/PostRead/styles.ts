import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(4),
    },
    titleTypography: {
      hyphens: 'auto',
    },
    readingTime: {
      padding: theme.spacing(2),
    },
  })
);
