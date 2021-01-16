import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  const successColor = theme.palette.success.main;
  const errorColor = theme.palette.error.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;

  const successContrastColor = theme.palette.getContrastText(successColor);
  const errorContrastColor = theme.palette.getContrastText(errorColor);
  const warningContrastColor = theme.palette.getContrastText(warningColor);
  const infoContrastColor = theme.palette.getContrastText(infoColor);

  const cookieBannerColor = theme.palette.background.default;

  return createStyles({
    successSnackbar: {
      backgroundColor: successColor,
      color: successContrastColor,
    },
    errorSnackbar: {
      backgroundColor: errorColor,
      color: errorContrastColor,
    },
    warningSnackbar: {
      backgroundColor: warningColor,
      color: warningContrastColor,
    },
    infoSnackbar: {
      backgroundColor: infoColor,
      color: infoContrastColor,
    },
    cookieBanner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      position: 'fixed',
      left: 0,
      width: '100%',
      zIndex: 999,
      background: cookieBannerColor,
      color: theme.palette.getContrastText(cookieBannerColor),
      borderTopWidth: theme.spacing(),
      borderTopStyle: 'solid',
      borderColor: theme.palette.getContrastText(cookieBannerColor),
    },
    cookieBannerContent: {
      margin: theme.spacing(2),
    },
    cookieBannerAcceptButton: {
      background: successColor,
      borderRadius: 0,
      color: successContrastColor,
      margin: theme.spacing(2),
      marginLeft: 0,
      marginRight: theme.spacing(5),

      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    cookieBannerDeclineButton: {
      background: errorColor,
      borderRadius: 0,
      color: errorContrastColor,
      margin: theme.spacing(2),

      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    cookieBannerButtonContainer: {
      flex: '0 0 auto',
    },
    cookieBannerText: {
      display: 'inline-block',
      marginRight: 8,
    },
    learnMoreLink: {
      display: 'inline-block',
      verticalAlign: 'bottom',
      marginLeft: -8,
    },
  });
});
