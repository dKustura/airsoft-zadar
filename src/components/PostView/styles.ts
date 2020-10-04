import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallScreenEditButton: {
      position: 'fixed',
      right: 20,
      bottom: 20,
    },
    bigScreenEditButtonRelativeContainer: {
      position: 'relative',
      top: theme.spacing(20),
      left: '100%',
    },
    bigScreenEditButtonAbsoluteContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
    },
    bigScreenEditButton: {
      position: 'sticky',
      top: theme.spacing(10),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);
