import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      flex: '1 1 auto',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: '.2s',
      cursor: 'pointer',
      zIndex: 700,
      color: theme.palette.text.primary,
      margin: `0px ${theme.spacing(1)}px`,
      borderBottom: `3px solid ${theme.palette.link.main}`,

      '&::after': {
        position: 'absolute',
        transition: '.3s',
        content: '""',
        width: 0,
        bottom: 0,
        background: theme.palette.link.main,
        height: '100%',
        left: '-10%',
        transform: 'skewX(20deg)',
        zIndex: -1,
      },
      '&:hover': {
        color: theme.palette.getContrastText(theme.palette.text.primary),
      },
      '&:hover::after': {
        left: '-10%',
        width: '120%',
      },
    },

    link: {
      textDecoration: 'none',
    },
  })
);
