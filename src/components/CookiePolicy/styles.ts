import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      padding: '3rem',
    },
    contentSection: {
      paddingBottom: '3rem',
    },
    sectionTitle: {
      paddingBottom: '1rem',
    },
  })
);
