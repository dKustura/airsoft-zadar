import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    headerContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: theme.palette.primary.dark,
    },
  });
