import { createStyles, Theme, fade } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    cancelButton: {
      color: theme.palette.error.main,
      borderColor: fade(theme.palette.error.main, 0.5),
      '&:hover': {
        borderColor: theme.palette.error.main,
      },
    },
    dialog: {
      padding: theme.spacing(1),
    },
    cropContainer: {
      position: 'relative',
      width: '100%',
      height: '100vh',
    },
  });
