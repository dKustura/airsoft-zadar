import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    arrow: {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      top: 0,
      left: 0,
      right: 0,
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
  });
