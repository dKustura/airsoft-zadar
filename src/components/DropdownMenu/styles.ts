import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrow: {
      position: 'absolute',
      fontSize: theme.spacing(1),
      width: '3em',
      height: '3em',
      top: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
      margin: '0 auto',
      marginTop: '-0.9em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'inline-block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    popper: {
      zIndex: 300,
    },
  })
);
