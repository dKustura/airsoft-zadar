import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
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
      margin: theme.spacing(3, 0, 2),
    },
    social: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    },
    socialSpan: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      padding: '0 20px',

      '&::before, &::after': {
        content: "''",
        display: 'block',
        width: '500px',
        position: 'absolute',
        top: '0.8em',
        borderTop: `1px solid ${theme.palette.text.primary}`,
      },

      '&::before': {
        right: '80%',
      },

      '&::after': {
        left: '80%',
      },
    },
  });
