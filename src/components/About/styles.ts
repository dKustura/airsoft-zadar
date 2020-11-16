import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      padding: '0 3rem',
    },
    teamImageContainer: {
      position: 'relative',
    },
    teamImage: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    teamImageSvg: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    member1ImageName: {
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
  })
);
