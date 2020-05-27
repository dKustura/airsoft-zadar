import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
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
    previewCloseIconButton: {
      width: '4rem',
      height: '4rem',
    },
    previewCloseIcon: {
      width: '3rem',
      height: '3rem',
    },
  });

export const thumbnailStyles = (theme: Theme) =>
  createStyles({
    card: {
      width: '24rem',
      height: '13.5rem',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
  });
