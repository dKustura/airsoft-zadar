import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(0, 0, 2),
    },
    social: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',

      '&::before': {
        borderTop: `1px solid ${theme.palette.text.primary}`,
        content: "''",
        margin: '0 auto',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '95%',
        zIndex: -1,
      },
    },
    socialSpan: {
      backgroundColor: theme.palette.background.default,
      transition: 'all 0.2s ease-in-out',
      padding: `0 ${theme.spacing(1)}px`,
    },
    copyright: {
      margin: theme.spacing(5, 0),
    },
  })
);
