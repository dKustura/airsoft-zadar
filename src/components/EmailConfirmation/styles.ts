import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    centeredText: {
      textAlign: 'center',
    },
    email: {
      fontWeight: theme.typography.fontWeightBold,
    },
  });
});
