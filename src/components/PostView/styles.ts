import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallScreenEditButton: {
      position: 'fixed',
      right: 20,
      bottom: 20,
    },
    bigScreenEditButtonContainer: {
      position: 'absolute',
      top: 150,
      right: 50,
      height: '100vh',
    },
    bigScreenEditButton: {
      position: 'sticky',
      top: 76,
    },
  })
);
