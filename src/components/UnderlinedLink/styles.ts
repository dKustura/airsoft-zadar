import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'inline',
      transition: 'background-size 0.2s ease-in-out 0s',
      backgroundImage:
        'linear-gradient(transparent 90%, currentColor 90%, currentColor 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: 'bottom',
      backgroundPositionX: '50%',
      backgroundSize: '0% 100%',

      '&:hover': {
        backgroundSize: '100% 100%',
      },
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);
