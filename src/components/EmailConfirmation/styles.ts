import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => {
  return createStyles({
    centeredText: {
      textAlign: 'center',
    },
    email: {
      fontWeight: theme.typography.fontWeightBold,
    },
  });
};
