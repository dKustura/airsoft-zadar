import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => {
  return createStyles({
    card: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 20,
      elevation: 2,
      transition:
        'border-color .2s ease-in-out, background-color .2s ease-in-out, color .2s ease-in-out',
      '&:hover': {
        borderColor: theme.palette.primary.light,
      },
    },
    cardContent: {
      padding: theme.spacing(1),
    },
  });
};
