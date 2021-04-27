import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      margin: '0px 20px',
      [theme.breakpoints.down('sm')]: {
        margin: '20px 0px',
      },
    },
  })
);
