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
    headerContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  });

export const thumbnailStyles = (theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      width: '24rem',
      height: '13.5rem',
    },
    image: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 15,

      // '&:hover ~ button': {
      //   opacity: 1,
      // },
    },
    button: {
      position: 'absolute',
      left: '1rem',
      bottom: '1rem',
      // opacity: 0,
      // transition: 'opacity 0.2s ease-in-out',
      // '&:hover': {
      //   opacity: 1,
      // },
    },
    dropzoneDialogContent: {
      '&:first-child': {
        padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
      },
    },
    dropzoneDialogPaper: {
      backgroundColor: theme.palette.background.default,
    },
  });
