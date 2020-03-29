import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    link: {
      position: 'relative',

      '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '3px',
        bottom: 0,
        left: '50%',
        right: 0,
        background: theme.palette.text.primary,
        transition: 'all 0.2s ease-in-out 0s',
      },

      '&:hover::before': {
        width: '100%',
        left: 0,
      },
    },
  });
