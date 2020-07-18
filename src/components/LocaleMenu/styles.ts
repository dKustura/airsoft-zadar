import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flagIcon: {
      boxShadow: `inset 0 0 0 0.125rem ${theme.palette.icon.border}`,
      borderRadius: '50%',
      backgroundSize: 'cover',
    },
  })
);
