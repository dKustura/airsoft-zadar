import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      marginTop: theme.spacing(5),
    },
    centeredText: {
      textAlign: 'center',
    },
    email: {
      fontWeight: theme.typography.fontWeightBold,
    },
    loadingIndicator: {
      marginTop: theme.spacing(10),
    },
    loadingIndicatorContainer: {
      height: '80vh',
    },
  });
});
