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
      margin: theme.spacing(0, 0, 2),
    },
    titleInput: {
      fontSize: '1.5rem',
    },
    contentInput: {
      minHeight: '20vh',
    },
    titleInputLabel: {
      fontSize: '1.5rem',
    },
    titleInputLabelShrinked: {
      backgroundColor: theme.palette.background.default,
    },
  });
