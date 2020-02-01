import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    flagIcon: {
      boxShadow: `inset 0 0 0 0.125rem ${theme.palette.icon.border}`,
      borderRadius: '50%',
      backgroundSize: 'cover',
    },
  });
