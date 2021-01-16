import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contactsContainer: {
      padding: '3rem',
    },
    iconContainer: {
      padding: '1rem',
    },
    phoneImage: {
      position: 'fixed',
      width: '40rem',
      top: '10rem',
      right: '5rem',

      [theme.breakpoints.down('md')]: {
        top: '20rem',
        width: '35rem',
        right: '-5rem',
      },
      [theme.breakpoints.down('sm')]: {
        top: '20rem',
        width: '30rem',
        right: '-5rem',
      },
      [theme.breakpoints.down('xs')]: {
        top: '26rem',
        width: '28rem',
        right: '-10rem',
      },
    },
  })
);
