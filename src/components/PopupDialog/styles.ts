import { createStyles, Theme, fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
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
  })
);
