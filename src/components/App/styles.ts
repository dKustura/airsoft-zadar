import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  const successColor = theme.palette.success.main;
  const errorColor = theme.palette.error.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;

  return createStyles({
    successSnackbar: {
      backgroundColor: successColor,
      color: theme.palette.getContrastText(successColor),
    },
    errorSnackbar: {
      backgroundColor: errorColor,
      color: theme.palette.getContrastText(errorColor),
    },
    warningSnackbar: {
      backgroundColor: warningColor,
      color: theme.palette.getContrastText(warningColor),
    },
    infoSnackbar: {
      backgroundColor: infoColor,
      color: theme.palette.getContrastText(infoColor),
    },
  });
});
