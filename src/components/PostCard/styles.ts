import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => {
  return createStyles({
    card: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 20,
      elevation: 2,
      transition: 'all .1s ease-in-out',
      '&:hover': {
        borderColor: theme.palette.primary.light,
      },
    },
    cardContent: {
      padding: theme.spacing(1),
    },
  });
};
